
import { ethers } from 'ethers';
import React, { useState } from 'react';
import { Button, Card, CardBody, Row, Col, CardHeader } from 'reactstrap';
import { metaMaskHooks } from '../../../connectors';
import { BridgeTimelockController__factory } from '../../../typechain-types';


const InitializeTransferCard = ({ amount, onTransferInitialized, preImageSalt, networkName, targetNetworkName, txHashAllowance }
    : { txHashAllowance: string, amount: number, onTransferInitialized: (txHash: string) => void, preImageSalt: Uint8Array, networkName: string, targetNetworkName: string }) => {
    const { useProvider, useAccount } = metaMaskHooks
    const [loading, setLoading] = useState(false)

    const LEFT_TOKEN_ADDRESS = process.env.REACT_APP_LEFT_TOKEN_ADDRESS ?? "0xB56324Ebf90e447e33A9A916fc894a44b96776b8"
    const RIGHT_TOKEN_ADDRESS = process.env.REACT_APP_RIGHT_TOKEN_ADDRESS ?? "0xB56324Ebf90e447e33A9A916fc894a44b96776b8"
    const LEFT_BRIDGE_ADDRESS = process.env.REACT_APP_LEFT_BRIDGE_ADDRESS ?? "0x0089aF7E4F507ad213046d6Ef9182E84b5Bb6fC5"

    const account = useAccount()
    const provider = useProvider()

    const onClick = async () => {
        if (provider) {
            setLoading(true)

            try {
                const commitment = ethers.utils.solidityKeccak256(["bytes32", "address", "address", "uint256"], [preImageSalt, account, LEFT_TOKEN_ADDRESS, amount])
                const bridge = await BridgeTimelockController__factory.connect(LEFT_BRIDGE_ADDRESS, provider.getSigner(account))
                const tx = await bridge.initialzeTransferToOtherChain(account ?? "", LEFT_TOKEN_ADDRESS, RIGHT_TOKEN_ADDRESS, amount, commitment)
                const txReceipt = await tx.wait()
                onTransferInitialized(txReceipt.transactionHash)

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
                        <span>Initialize the transfer by sending a commitment to {networkName}</span>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody className="d-flex justify-content-between">
                <Col>
                    <Row>
                        <p>
                            The allowance has been increased successfully in the transaction <a href={`http://ec2-18-185-126-189.eu-central-1.compute.amazonaws.com:26000/tx/${txHashAllowance}`} target="_blank" rel="noreferrer">{txHashAllowance}</a>
                        </p>
                        <p>
                            The preImageSalt for the commitment is {preImageSalt.toString()}. It will be used to claim the transfer on {targetNetworkName} afterwards. The value is incorporated automatically. It must be kept secret until the Tokens are claimed
                        </p>
                    </Row>
                    <Row>
                        <Button
                            onClick={onClick}
                            disabled={amount <= 0 || loading}
                        >
                            {loading ? "loading ..." : `initialize transfer on ${networkName}`}
                        </Button>
                    </Row>
                </Col>
            </CardBody>
        </Card>
    )

}

export default InitializeTransferCard