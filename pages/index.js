import Header from "./components/Header/index"
import Footer from "./components/Footer/index"
import ConnectToWallet from "./components/wallet/index"
import UserConnected from "./components/connected/index"
import BodyMain from "./components/body"
import { useEffect, useReducer, useRef } from "react"
import { WALLET_INITIAL_STATE, walletReducer } from "./reducer/wallet/index"
import { contractReducer, CONTRACT_INITIAL_STATE } from "./reducer/contract/index"
import Web3Modal from "web3modal"


export default function Home() {

  const web3ModalRef = useRef()
  const [walletState, walletDispatch] = useReducer(walletReducer, WALLET_INITIAL_STATE)
  const [contractState, contractDispatch] = useReducer(contractReducer, CONTRACT_INITIAL_STATE);

  useEffect(() => {

    if (!walletState.walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: 'rinkeby',
        providerOptions: {},
        disableInjectedProvider: false
      })
    }

  }, [])







  return (
    <div>
      <Header />

      {
        walletState.walletConnected ? (
          <div>


            <UserConnected walletState={walletState} walletDispatch={walletDispatch} contractState={contractState} contractDispatch={contractDispatch} />

          </div>

        ) : (
          <div>

            <ConnectToWallet walletState={walletState} walletDispatch={walletDispatch} web3ModalRef={web3ModalRef} />


          </div>
        )
      }
      <br />
      <br />

      <BodyMain />

      <Footer />
    </div >
  )
}
