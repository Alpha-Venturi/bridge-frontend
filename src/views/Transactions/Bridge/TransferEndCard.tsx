
import React from 'react';
import { Button, Card, CardBody, Row, Col, CardHeader } from 'reactstrap';


const TransferEndCard = ({ amount, leftNetworkName, leftTokenName, rightNetworkName, rightTokenName, onReset, txHash }:
    {
        amount: number,
        leftNetworkName: string,
        leftTokenName: string,
        rightNetworkName: string,
        rightTokenName: string,
        onReset: () => void,
        txHash: string,
    }) => {

    const onClick = async () => {
        onReset()
    }



    return (
        <Card className="app-table-card shadow">
            <CardHeader>
                <Row className="align-items-center">
                    <Col xs="8">
                        <h3>Token Bridge</h3>
                        <span>Transfer completed</span>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody className="d-flex justify-content-between">
                <Col>
                    <Row>
                        <p>{`${amount} ${leftTokenName} from ${leftNetworkName} have been transferred to ${rightNetworkName} as ${rightTokenName}.
                        You can verify the finalization of the transfer on a block explorer by searching for transaction hash below`}</p>
                        <p>{txHash}</p>
                    </Row>
                    <Row>
                        <Button
                            onClick={onClick}
                        >
                            Reset
                        </Button>
                    </Row>
                </Col>
            </CardBody>
        </Card>
    )

}

export default TransferEndCard