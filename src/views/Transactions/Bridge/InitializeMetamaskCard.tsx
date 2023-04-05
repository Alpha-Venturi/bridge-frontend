import React from 'react';
import { Button, Card, CardBody, Row, Col, CardHeader } from 'reactstrap';
import { CHAINS } from '../../../chains';
import { metaMask, metaMaskHooks } from '../../../connectors';

const InitializeMetamaskCard = ({ requiredAccount, requiredChainID, children }: { requiredAccount: string, requiredChainID: number, children?: JSX.Element }) => {
    const { useChainId, useIsActive, useAccount } = metaMaskHooks
    const chainId = useChainId()
    const account = useAccount()
    const isActive = useIsActive()

    return (
        <Card className="app-table-card shadow">
            <CardHeader>
                <Row className="align-items-center">
                    <Col xs="8">
                        <h3>Token Bridge</h3>
                        <span>Connect the account {requiredAccount} and network {CHAINS[requiredChainID].name} via MetaMask</span>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody className="d-flex justify-content-between">
                <Col>

                    <Row>
                        {children}
                    </Row>
                    <Row>
                        <p>{isActive ? `metamask is activated` : `you need  to activate metamask on this site by clicking the button below`}</p>
                    </Row>
                    {!isActive ? <Row>
                        <Button onClick={() => {
                            metaMask.activate(requiredChainID)
                        }}>
                            activate metamask
                        </Button>
                    </Row>
                        :
                        <>
                            <Row>
                                <p>{chainId === requiredChainID ? `connected to the correct network (${requiredChainID})` : `connected to chainID ${chainId}, but chainID ${requiredChainID} is required`}</p>
                            </Row>
                            <Row>
                                <p>{account === requiredAccount ? `connected with the correct account (${account})` : `connected to account ${account}, but account ${requiredAccount} is required`}</p>
                            </Row>
                        </>
                    }


                </Col>
            </CardBody>
        </Card>
    )

}

export default InitializeMetamaskCard