
import { utils, BigNumber, ethers } from "ethers"
import { useEffect, useRef } from "react"
import { CONTRACT_OPTIONS } from "../../reducer/contract/index"
import myContract from "../../utility/contract"
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI } from "../../constants/contract/index"

export default function Connected({ walletState, walletDispatch, contractState, contractDispatch }) {

    const bigZero = BigNumber.from(0);


    const getTotalSupply = async () => {
        const provider = walletState.provider;
        const providerContract = await myContract(provider, false);
        // const totalSupply = await contract.
        const totalSupply = await providerContract.totalSupply();
        contractDispatch({ type: CONTRACT_OPTIONS.SET_TOKENS_MINTED, payload: totalSupply })
    }

    const getTokensToBeClaimed = async () => {
        const provider = walletState.provider;
        const nftContract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, provider)
        const address = await provider.getSigner().getAddress();
        const tokenProviderContract = await myContract(provider, false);

        const balance = await nftContract.balanceOf(address);

        if (balance == bigZero) {
            contractDispatch({ type: CONTRACT_OPTIONS.SET_TOKENS_TO_BE_CLAIMED, payload: bigZero })
        }
        else {
            var amount = 0;
            // loop over 
            for (var i = 0; i < balance; i++) {
                const tokenId = await nftContract.tokenOfOwnerByIndex(address, i);
                const claimed = await tokenProviderContract.tokenIdsClaimed(tokenId);
                if (!claimed) {
                    amount += 1;
                }
            }
            contractDispatch({ type: CONTRACT_OPTIONS.SET_TOKENS_TO_BE_CLAIMED, payload: BigNumber.from(amount.toString()) })

        }
        await onLoadCallMe();

    }

    const getCurrentUserBalance = async () => {
        const provider = walletState.provider;
        const signerContract = await myContract(provider, true);
        const address = await provider.getSigner().getAddress();
        const txn = await signerContract.balanceOf(address);
        // contractState.balanceOf

        contractDispatch({ type: CONTRACT_OPTIONS.SET_BALANCE_OF_USER, payload: txn })

    }

    async function onLoadCallMe() {

        await getTotalSupply();
        await getCurrentUserBalance();
        await getTokensToBeClaimed();

    }


    useEffect(() => {
        if (walletState.walletConnected) {
            onLoadCallMe();
        }

    }, [walletState.walletConnected])




    const setTokenAmount = (e) => {

        if (e.target.value > 0) {
            contractDispatch({ type: CONTRACT_OPTIONS.SET_TOKEN_AMOUNT, payload: e.target.value })
        }
        else {
            contractDispatch({ type: CONTRACT_OPTIONS.SET_TOKEN_AMOUNT, payload: bigZero })

        }
    }

    const publicMint = async () => {

        const provider = walletState.provider;
        const contract = await myContract(provider, true)
        const _value = contractState.tokenAmount * 0.001;                // 0.001 ethers is the value we need to send per token      //The price of one CD at the time of ICO should be 0.001 ether.
        // javascript recognizing _value as a number so we need to convert into string and convert it to bigNumber using praseEther
        const txn = await contract.mint(contractState.tokenAmount, { value: utils.parseEther(_value.toString()) });
        await txn.wait();
        window.alert('Sucessfully Minted Crypto Dev Tokens')
        await onLoadCallMe()
    }

    const claimTokens = async () => {
        const provider = walletState.provider;
        const signerContract = await myContract(provider, true);
        await signerContract.claim();
        window.alert('Sucessfully Claimed Crypto Dev Tokens')
        await onLoadCallMe()

    }



    return (
        <div>
            <div>
                You Can Claim or Mint Crypto Dev Tokens Here
                <br />

                Over all: {utils.formatEther(contractState.tokensMinted)}  / 10000
                <br />
                You have minted: {utils.formatEther(contractState.balanceOf)}
            </div>


            {contractState.tokensToBeClaimed > 0 ?
                (
                    <div>
                        {contractState.tokensToBeClaimed * 10} Tokens can be claimed!!
                        <br />
                        <button onClick={claimTokens}>Claim Tokens</button>
                    </div>
                ) :
                (
                    <div>
                        <input type="number" placeholder="No of tokens you want to mint" onChange={setTokenAmount} autoFocus />
                        <button disabled={!(contractState.tokenAmount > 0)} onClick={publicMint}>Mint</button>
                    </div>
                )}

        </div >
    )

}