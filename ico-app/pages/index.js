import { useEffect, useReducer, useRef } from "react"
import Web3Modal from "web3modal"

import BodyMain from "../components/body"
import UserConnected from "../components/connected/index"
import Footer from "../components/Footer/index"
import Header from "../components/Header/index"
import ConnectToWallet from "../components/wallet/index"
import { CONTRACT_INITIAL_STATE, contractReducer } from "../reducer/contract/index"
import { WALLET_INITIAL_STATE, walletReducer } from "../reducer/wallet/index"

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
