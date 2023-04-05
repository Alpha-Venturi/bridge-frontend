import { Web3ReactHooks } from '@web3-react/core';
import { Connector } from '@web3-react/types';
import { useEffect } from 'react';


export const useEagerWeb3RPC = (connector: [Connector, Web3ReactHooks], desiredChainId: number) => {

    const [network, hooks] = connector
    const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider } = hooks
    const chainId = useChainId()
    const accounts = useAccounts()
    const isActivating = useIsActivating()

    const isActive = useIsActive()

    const provider = useProvider()



    useEffect(() => {
        network.activate(desiredChainId)
    }, [desiredChainId, network])

    return {
        chainId, accounts, isActivating, isActive, provider
    };
};