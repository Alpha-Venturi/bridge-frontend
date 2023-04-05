import type { AddEthereumChainParameter } from '@web3-react/types'

const ETH: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Ether',
  symbol: 'ETH',
  decimals: 18,
}

interface BasicChainInformation {
  urls: string[]
  name: string
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter['nativeCurrency']
  blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls']
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency
}

export function getAddChainParameters(chainId: number): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId]
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    }
  } else {
    return chainId
  }
}

const leftChainId = process.env.REACT_APP_CHAIN_ID_2 ?? 1337
const rightChainId = process.env.REACT_APP_CHAIN_ID ?? 1075

export const CHAINS: { [chainId: number]: BasicChainInformation | ExtendedChainInformation } = {
  [rightChainId]: {
    urls: [
      process.env.REACT_APP_CHAIN_RPC_URL ?? "",
    ].filter((url) => url !== ''),
    name: process.env.REACT_APP_CHAIN_NAME ?? 'IOTA Private L2',
    nativeCurrency: ETH,
    blockExplorerUrls: [],
  },
  [leftChainId]: {
    urls: [
      process.env.REACT_APP_CHAIN_RPC_URL_2 ?? ""
    ].filter((url) => url !== ''),
    name: process.env.REACT_APP_CHAIN_NAME_2 ?? 'HL Besu private',
    nativeCurrency: ETH,
    blockExplorerUrls: [],
  },
}

export const URLS: { [chainId: number]: string[] } = Object.keys(CHAINS).reduce<{ [chainId: number]: string[] }>(
  (accumulator, chainId) => {
    const validURLs: string[] = CHAINS[Number(chainId)].urls

    if (validURLs.length) {
      accumulator[Number(chainId)] = validURLs
    }

    return accumulator
  },
  {}
)