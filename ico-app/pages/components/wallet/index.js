import connect from "../../utility/connect";


export default function ConnectToWallet({ walletState, walletDispatch, web3ModalRef }) {

    const connectMe = () => {
        connect(web3ModalRef, walletDispatch);
    }

    return (
        <div>
            <button onClick={connectMe}>connect</button>
        </div>
    )


}