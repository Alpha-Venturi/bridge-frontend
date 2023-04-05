import { ethers } from 'ethers';
import React, { useMemo, useState } from 'react';
import { CHAINS } from '../../chains';
import { metaMaskHooks } from '../../connectors';
import FinalizeTransferCard from './Bridge/FinalizeTransferCard';
import IncreaseAllowanceCard from './Bridge/IncreaseAllowanceCard';
import InitializeMetamaskCard from './Bridge/InitializeMetamaskCard';
import InitializeTransferCard from './Bridge/InitializeTransferCard';
import TransferEndCard from './Bridge/TransferEndCard';


const Bridge = ({ requiredAccount, accountBalance }: { requiredAccount: string, accountBalance: number }) => {
    const [amount, setAmount] = useState<number>(0.00)
    const { useChainId, useIsActive, useAccount } = metaMaskHooks

    const preImageSalt = useMemo(() => {
        return ethers.utils.randomBytes(32)
    }, [])

    const [txHashAllowance, setTxHashAllowance] = useState<string>()
    const [transferInitializedHash, setTransferInitializedHash] = useState<string>()
    const [txHash, setTxHash] = useState<string | undefined>(undefined)

    const RELAYER = process.env.REACT_APP_RELAYER ?? "0x6f402c5CDE186AD328208863995E07A9Ab5143a8"

    const LEFT_CHAIN_ID = +(process.env.REACT_APP_CHAIN_ID_2 ?? 1337)
    const RIGHT_CHAIN_ID = +(process.env.REACT_APP_CHAIN_ID ?? 1075)

    const chainId = useChainId()
    const account = useAccount()
    const isActive = useIsActive()

    if ((!isActive || chainId !== LEFT_CHAIN_ID || account !== requiredAccount) && !transferInitializedHash) {
        return (<InitializeMetamaskCard requiredAccount={requiredAccount} requiredChainID={LEFT_CHAIN_ID} />)
    } else if (!txHashAllowance) {
        return (
            <IncreaseAllowanceCard
                max={accountBalance}
                amount={amount}
                setAmount={setAmount}
                onAllowanceSet={(txHash) => {
                    setTxHashAllowance(txHash)
                }}
                decimals={2}
            />)
    } else if (!transferInitializedHash) {
        return (
            <InitializeTransferCard
                amount={amount * (10 ** 2)}
                onTransferInitialized={(txHash) => {
                    setTransferInitializedHash(txHash)
                }}
                preImageSalt={preImageSalt}
                networkName={CHAINS[LEFT_CHAIN_ID].name}
                targetNetworkName={CHAINS[RIGHT_CHAIN_ID].name}
                txHashAllowance={txHashAllowance}
            />
        )
    } else if ((!isActive || chainId !== RIGHT_CHAIN_ID || account !== requiredAccount) && transferInitializedHash) {
        return (
            <InitializeMetamaskCard requiredAccount={requiredAccount} requiredChainID={RIGHT_CHAIN_ID}>
                <p>
                    The transfer has been initialized on the network {CHAINS[LEFT_CHAIN_ID].name} via the transaction <a href={`http://ec2-18-185-126-189.eu-central-1.compute.amazonaws.com:26000/tx/${transferInitializedHash}`} target="_blank" rel="noreferrer">{transferInitializedHash}</a>.
                    Please switch the network in metamask to finalize the transfer on {CHAINS[RIGHT_CHAIN_ID].name}.
                </p>
            </InitializeMetamaskCard>
        )
    } else if (txHashAllowance && transferInitializedHash && chainId === RIGHT_CHAIN_ID && !txHash) {
        return (
            <FinalizeTransferCard
                amount={amount * (10 ** 2)}
                onTransferFinalized={(txHash: string) => {
                    setTxHash(txHash)
                }}
                preImageSalt={preImageSalt}
                relayer={RELAYER}
                sourceChainId={LEFT_CHAIN_ID}
                targetChainId={RIGHT_CHAIN_ID}
            />
        )
    } else if (txHash) {
        return (
            <TransferEndCard
                amount={amount}
                leftNetworkName="HL Besu private"
                leftTokenName='WNOK'
                onReset={() => {
                    setTxHashAllowance(undefined)
                    setTransferInitializedHash(undefined)
                    setTxHash(undefined)
                }}
                rightNetworkName="IOTA Private L2"
                rightTokenName='WNOK'
                txHash={txHash}
            />
        )
    }

    return (
        <p>this is a bug. Please contact the team</p>
    )

}

export default Bridge