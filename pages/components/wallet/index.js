import connect from "../../utility/connect";
import Image from 'next/image'
import background from "../../../public/bg-image.webp"

export default function ConnectToWallet({ walletState, walletDispatch, web3ModalRef }) {

    const connectMe = () => {
        connect(web3ModalRef, walletDispatch);
    }

    return (
        <div>
            <div className="py-20 bg-cover bg-no-repeat bg-fixed" style={{
                backgroundImage: `url(/bg-image.webp)`
            }}>
                <div className="container m-auto text-center px-6 opacity-100">
                    <h2 className="text-4xl font-bold mb-2 text-white">Initial Coin Offering!</h2>
                    <h3 className="text-2xl mb-8 text-gray-200">Welcome to Crypto Devs ICO. Max Of 10,000 CD tokens. Every Crypto Dev NFT holder should get 10 tokens for free</h3>
                    <button onClick={connectMe} className="bg-white font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider hover:border-transparent hover:text-blue-500 hover:bg-gray-800 transition-all">

                        Login With MetaMask 🦊

                    </button>
                </div>
            </div>

        </div >
    )


}