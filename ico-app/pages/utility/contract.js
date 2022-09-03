
import { Contract, ethers } from "ethers"

import { TOKEN_CONTRACT_ADDRESS, TOKEN_CONTRACT_ABI } from "../constants/contract/index"

export default async function myContract(provider, isSignerRequired = false) {

    let contract;
    const signer = await provider.getSigner()
    if (isSignerRequired) {
        contract = new Contract(TOKEN_CONTRACT_ADDRESS, TOKEN_CONTRACT_ABI, signer)
    }
    else {
        contract = new Contract(TOKEN_CONTRACT_ADDRESS, TOKEN_CONTRACT_ABI, provider)
    }

    return contract;

}