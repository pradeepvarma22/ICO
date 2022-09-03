import { BigNumber } from "ethers";


const contractReducer = (state, action) => {


    switch (action.type) {
        case CONTRACT_OPTIONS.SET_WALLET_ADDRESS: return { ...state, walletAddress: action.payload };
        case CONTRACT_OPTIONS.ERROR: return { ...state, error: true, errorMessage: action.payload };
        case CONTRACT_OPTIONS.SET_TOKENS_MINTED: return { ...state, tokensMinted: action.payload };
        case CONTRACT_OPTIONS.SET_BALANCE_OF_USER: return { ...state, balanceOf: action.payload };
        case CONTRACT_OPTIONS.SET_TOKEN_AMOUNT: return { ...state, tokenAmount: BigNumber.from(action.payload) };
        case CONTRACT_OPTIONS.SET_TOKENS_TO_BE_CLAIMED: return { ...state, tokensToBeClaimed: action.payload };
        default: return state;
    }

}


const bigZero = BigNumber.from(0);

const CONTRACT_INITIAL_STATE = {
    tokensMinted: bigZero,
    balanceOf: bigZero,
    tokenAmount: bigZero,
    tokensToBeClaimed: bigZero,
    error: false,
    errorMessage: ""

}


const CONTRACT_OPTIONS = {
    SET_TOKENS_MINTED: 'SET_TOKENS_MINTED',
    SET_BALANCE_OF_USER: 'SET_BALANCE_OF_USER',
    SET_TOKEN_AMOUNT: 'SET_TOKEN_AMOUNT',
    SET_TOKENS_TO_BE_CLAIMED: 'SET_TOKENS_TO_BE_CLAIMED',
    ERROR: 'ERROR'

}



export { contractReducer, CONTRACT_INITIAL_STATE, CONTRACT_OPTIONS }


/*
SET_TOKEN_AMOUNT: No of tokens user want to mint using public mint function


*/