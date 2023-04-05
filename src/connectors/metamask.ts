import { initializeConnector } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
//@ts-ignore
export const [metaMask, metaMaskHooks] = initializeConnector<MetaMask>((actions) => new MetaMask({ actions: actions }))