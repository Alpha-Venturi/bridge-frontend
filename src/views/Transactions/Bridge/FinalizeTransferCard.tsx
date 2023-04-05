
import { ethers } from 'ethers';
import React, { useState } from 'react';
import { Button, Card, CardBody, Row, Col, CardHeader } from 'reactstrap';
import { CHAINS } from '../../../chains';
import { metaMaskHooks } from '../../../connectors';
import { BridgeTimelockController__factory } from '../../../typechain-types';


const FinalizeTransferCard = ({ amount, onTransferFinalized, preImageSalt, sourceChainId, targetChainId, relayer }: { targetChainId: number, amount: number, onTransferFinalized: (txHash: string) => void, preImageSalt: Uint8Array, sourceChainId: number, relayer: string }) => {
    const { useProvider, useAccount } = metaMaskHooks
    const [loading, setLoading] = useState(false)

    const LEFT_TOKEN_ADDRESS = process.env.REACT_APP_LEFT_TOKEN_ADDRESS ?? "0xB56324Ebf90e447e33A9A916fc894a44b96776b8"
    const RIGHT_BRIDGE_ADDRESS = process.env.REACT_APP_RIGHT_BRIDGE_ADDRESS ?? "0x5b746e0E5Ad341d0bA2d0a7A6a9936BCA569aF4A"
    const RIGHT_TOKEN_ADDRESS = process.env.REACT_APP_RIGHT_TOKEN_ADDRESS ?? "0xB56324Ebf90e447e33A9A916fc894a44b96776b8"

    const account = useAccount()
    const provider = useProvider()

    const onClick = async () => {
        if (provider) {
            setLoading(true)

            try {
                const commitment = ethers.utils.solidityKeccak256(["bytes32", "address", "address", "uint256"], [preImageSalt, account, LEFT_TOKEN_ADDRESS, amount])
                const bridge = await BridgeTimelockController__factory.connect(RIGHT_BRIDGE_ADDRESS, provider.getSigner(account))
                console.log("attempting finalized transfer, preimagesalt: " + preImageSalt)
                const tx = await bridge.finalizeTransferFromOtherChain(commitment, preImageSalt, LEFT_TOKEN_ADDRESS, RIGHT_TOKEN_ADDRESS, account ?? "", relayer, amount, sourceChainId)
                const txReceipt = await tx.wait()
                //update state
                console.log(txReceipt)
                console.log("finalized transfer, preimagesalt: " + preImageSalt)
                onTransferFinalized(txReceipt.transactionHash)

            } catch (e) {
                console.error(e)
            }
            setLoading(false)
            //update state
        } else {
            console.error("no provider available")
        }
    }



    return (
        <Card className="app-table-card shadow">
            <CardHeader>
                <Row className="align-items-center">
                    <Col xs="8">
                        <h3>Token Bridge</h3>
                        <span>Finalize the transfer on {CHAINS[targetChainId].name}</span>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody className="d-flex justify-content-between">
                <Col>
                    <Row>
                        <p>The preImageSalt used for the commitment was {preImageSalt.toString()}. It is used now to finalize the transfer.</p>
                    </Row>
                    <Row>
                        <Button
                            onClick={onClick}
                            disabled={amount <= 0 || loading}
                        >
                            {loading ? "loading ..." : "finalize transfer"}
                        </Button>
                    </Row>
                </Col>
            </CardBody>
        </Card>
    )

}

export default FinalizeTransferCard