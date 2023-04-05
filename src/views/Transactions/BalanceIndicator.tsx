import React from 'react';
import { Card, CardBody } from 'reactstrap';

const BalanceIndicator = ({ token, balance, network }: { token?: { name: string, symbol: string }, balance?: string, network: string }) => {
    return (
        <Card className="card-dark card-dashboard shadow" inverse>
            <CardBody className="d-flex justify-content-between">
                <div className="title">
                    <small>Balance of {token?.name} on {network} </small>
                    <h2>{balance} {token?.symbol}</h2>
                </div>
                <div>
                    <span className="orange-circle">
                        <i className="fa-solid fa-ranking-star"></i>
                    </span>
                </div>
            </CardBody>
        </Card>
    )

}

export default BalanceIndicator