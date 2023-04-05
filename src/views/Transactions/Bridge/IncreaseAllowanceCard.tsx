
import React, { useState } from 'react';
import { Button, Card, CardBody, FormGroup, Input, Label, Row, Col, CardHeader } from 'reactstrap';
import { metaMaskHooks } from '../../../connectors';
import { ERC20__factory } from '../../../typechain-types';


const IncreaseAllowanceCard = ({ amount, setAmount, onAllowanceSet, max, decimals }: { decimals: number, amount: number, setAmount: (amount: number) => void, onAllowanceSet: (txHash: string) => void, max: number }) => {
    const { useProvider, useAccount } = metaMaskHooks
    const [loading, setLoading] = useState(false)

    const LEFT_TOKEN_ADDRESS = process.env.REACT_APP_LEFT_TOKEN_ADDRESS ?? "0xB56324Ebf90e447e33A9A916fc894a44b96776b8"
    const LEFT_BRIDGE_ADDRESS = process.env.REACT_APP_LEFT_BRIDGE_ADDRESS ?? "0x5b746e0E5Ad341d0bA2d0a7A6a9936BCA569aF4A"

    const account = useAccount()
    const provider = useProvider()

    const onClick = async () => {
        if (provider) {
            setLoading(true)
            const token1 = await ERC20__factory.connect(LEFT_TOKEN_ADDRESS, provider.getSigner(account))
            const tx = await token1.increaseAllowance(LEFT_BRIDGE_ADDRESS, amount * (10 ** decimals))
            const txReceipt = await tx.wait()
            setLoading(false)
            //update state
            onAllowanceSet(txReceipt.transactionHash)
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
                        <span>Increase the allowance of the Bridge Contract on {process.env.REACT_APP_CHAIN_NAME_2}</span>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody className="d-flex justify-content-between">
                <Col>
                    <Row>
                        <p>You have to give the bridge contract the permission to transfer the funds away from your account on this network.</p>
                    </Row>
                    <FormGroup>
                        <Label for="exampleNumber">Amount</Label>
                        <Input
                            type="number"
                            name="number"
                            id="exampleNumber"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => {
                                setAmount(+e.target.value)
                            }} />
                    </FormGroup>
                    <Row>
                        <Button
                            onClick={onClick}
                            disabled={amount <= 0 || amount > max || loading}
                        >
                            {loading ? "loading ..." : "increase allowance"}
                        </Button>
                    </Row>
                </Col>
            </CardBody>
        </Card>
    )

}

export default IncreaseAllowanceCard