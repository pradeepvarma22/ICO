
import { utils, BigNumber, ethers } from "ethers"
import { useEffect, useRef } from "react"
import { CONTRACT_OPTIONS } from "../../reducer/contract/index"
import myContract from "../../utility/contract"
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI } from "../../constants/contract/index"

export default function Connected({ walletState, walletDispatch, contractState, contractDispatch }) {

    const bigZero = BigNumber.from(0);
    const inputEl = useRef(null);

    useEffect(() => {

        inputEl.current.focus();

    }, []);


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


            <section className="py-20 bg-gray-50">
                <div className="container items-center max-w-6xl px-4 px-10 mx-auto sm:px-20 md:px-32 lg:px-16">
                    <div className="flex flex-wrap items-center -mx-3">
                        <div className="order-1 w-full px-3 lg:w-1/2 lg:order-0">
                            <div className="w-full lg:max-w-md">
                                <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl font-heading"> Hello!</h2>
                                <p className="mb-4 font-medium tracking-tight text-gray-400 xl:mb-6">You Can Claim or Mint Crypto Dev Tokens 🏛️</p>
                                <ul>
                                    <li className="flex items-center py-2 space-x-4 xl:py-3">
                                        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                        <span className="font-medium text-gray-500">{walletState.walletAddress}</span>
                                    </li>
                                    <li className="flex items-center py-2 space-x-4 xl:py-3">
                                        <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
                                        <span className="font-medium text-gray-500">Total Supply:  {utils.formatEther(contractState.tokensMinted)}  / 10000</span>
                                    </li>
                                    <li className="flex items-center py-2 space-x-4 xl:py-3">
                                        <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                                        <span className="font-medium text-gray-500">You have minted: {utils.formatEther(contractState.balanceOf)}      Tokens! </span>
                                    </li>

                                    <li className="flex items-center py-2 space-x-4 xl:py-3">
                                        <div>
                                            {contractState.tokensToBeClaimed > 0 ?
                                                (
                                                    <div>
                                                        {contractState.tokensToBeClaimed * 10} Tokens can be claimed!!
                                                        <div className="pt-5"></div>
                                                        <button className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={claimTokens}>Claim Tokens</button>
                                                    </div>
                                                ) :
                                                (
                                                    <div >
                                                        <input type="number" ref={inputEl} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder="No of Tokens" onChange={setTokenAmount} />
                                                        <div className="pt-5"></div>
                                                        <button disabled={!(contractState.tokenAmount > 0)} className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={publicMint}>Mint</button>
                                                    </div>
                                                )}
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div className="w-full px-3 mb-12 lg:w-1/2 order-0 lg:order-1 lg:mb-0"><img className="mx-auto sm:max-w-sm lg:max-w-full" src="https://cdn.devdojo.com/images/november2020/feature-graphic.png" alt="feature image" /></div>
                    </div>
                </div>
            </section>


















        </div >
    )

}