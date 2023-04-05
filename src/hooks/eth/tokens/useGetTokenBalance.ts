import { Token } from '../../../util/types';
import { ERC20__factory } from '../../../typechain-types';
import { useEagerWeb3RPC } from '../useEagerWeb3RPC';
import { useEffect, useState } from 'react';
import { Web3ReactHooks } from '@web3-react/core';
import { Connector } from '@web3-react/types';


export const useGetTokenBalance = (connector: [Connector, Web3ReactHooks], chainId: number, token: Token | undefined, address: string): { value: number; error: any; loading: boolean; } => {
    const [loading, setLoading] = useState(true)
    const web3 = useEagerWeb3RPC(connector, chainId)
    const [balance, setBalance] = useState(0)
    const [error, setError] = useState()
    useEffect(() => {
        setLoading(true)
        if (web3.provider && token?.fungible) {
            const erc20 = ERC20__factory.connect(token.contractAddress, web3.provider)
            erc20.balanceOf(address)
                .then(async b => {
                    const decimals = await erc20.decimals()
                    setBalance(b.toNumber() / (10 ** decimals))
                    setLoading(false)
                })
                .catch(e => {
                    setError(e)
                    setLoading(false)
                    console.error(e)
                })
        } else {
            setLoading(false)
        }

    }, [web3.provider, token, address])
    return {
        value: balance, loading: loading, error: error
    }
};