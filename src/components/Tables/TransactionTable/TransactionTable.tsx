import React, { useState, useEffect, useCallback } from 'react';

import { Card, Col, CardHeader, Table, Row, CardFooter } from 'reactstrap';

import { PaginationType, TokenTransfer } from '../../../util/types';
import 'react-datepicker/dist/react-datepicker.css';
import ProgressIndicator from '../../Utility/ProgressIndicator/ProgressIndicator';
import Empty from '../../Utility/Empty/Empty';
import { useEagerWeb3RPC } from '../../../hooks/eth/useEagerWeb3RPC';
import { ERC20__factory } from '../../../typechain-types';
import { TransferEvent } from '../../../typechain-types/@openzeppelin/contracts/token/ERC20/ERC20';
import TokenTransferRow from './TokenTransferRow';
import TableLoader from '../../Utility/Loader/TableLoader';
import PaginationElement from '../../Utility/Pagination/Pagination';
import { CHAINS } from '../../../chains';
import { Connector } from '@web3-react/types'; import { Web3ReactHooks } from '@web3-react/core';


const TransactionTable = ({ userAddress, tokenAddress, chainId, fungibleToken, web3Connector }: { web3Connector: [Connector, Web3ReactHooks], userAddress: string, tokenAddress?: string, chainId: number, fungibleToken: boolean }) => {
  const [transactions, setTransactions] = useState<TokenTransfer[]>([]);
  const [loading, setLoading] = useState(false);
  const web3 = useEagerWeb3RPC(web3Connector, chainId)


  const loadTokenTransfers = useCallback(async () => {
    const mapFungibleTransferEventToTokenTransfer: (event: TransferEvent, currencySymbol: string, decimals: number) => Promise<TokenTransfer> = async (transferEvent, currencySymbol, decimals) => {
      const timestamp = (await web3.provider?.getBlock(transferEvent.blockHash))?.timestamp ?? 0
      return {
        blockHash: transferEvent.blockHash,
        blockNumber: transferEvent.blockNumber,
        from: transferEvent.args.from,
        to: transferEvent.args.to,
        fungible: true,
        timestamp: new Date(timestamp * 1000),
        tokenContract: transferEvent.address,
        txHash: transferEvent.transactionHash,
        value: transferEvent.args.value.toNumber() / (10 ** decimals),
        currency: currencySymbol
      }
    }

    setLoading(true)
    try {
      if (web3.provider) {
        if (fungibleToken && tokenAddress) {
          const tokenContract = await ERC20__factory.connect(tokenAddress, web3.provider)
          const currencySymbol = await tokenContract.symbol()
          const decimals = await tokenContract.decimals()
          const outgoingFilter = tokenContract.filters.Transfer(userAddress)
          const incomingFilter = tokenContract.filters.Transfer(null, userAddress)
          const outgoingTx = await tokenContract.queryFilter(outgoingFilter)
          const incomingTx = await tokenContract.queryFilter(incomingFilter)
          const transfers: TransferEvent[] = [...outgoingTx, ...incomingTx]
          console.log(tokenAddress)
          console.log(transfers)
          const mappedTransfers = await Promise.all(transfers.map((transfer) => mapFungibleTransferEventToTokenTransfer(transfer, currencySymbol, decimals)))
          setLoading(false)
          return mappedTransfers
        }
      }
    }
    catch (e) {
      setLoading(false)
    }
    setLoading(false)
    return []
  }, [fungibleToken, tokenAddress, userAddress, web3.provider])


  useEffect(() => {
    if (web3.isActive) {
      loadTokenTransfers().then((transfers) => {
        setTransactions(transfers)
      })
    }
  }, [web3.isActive, tokenAddress, userAddress, loadTokenTransfers])

  const [pagination, setPagination] = useState<PaginationType>({
    page: 0,
    size: 10,
    totalPages: 1,
    totalElements: 0,
  });

  if (!CHAINS[chainId].name) {
    return (
      <Row>
        <div className="col">
          <Card className="app-table-card shadow">
            <CardHeader>
              <Row className="align-items-center">
                <Col xs="8">
                  <h3>Coming soon...</h3>
                  <span>It will be possible to bridge tokens to other networks</span>
                </Col>
              </Row>
            </CardHeader>
          </Card>
        </div>
      </Row>
    )
  }

  return (
    <Row>
      <div className="col">
        <Card className="app-table-card shadow">
          <CardHeader>
            <Row className="align-items-center">
              <Col xs="8">
                <h3>Token transfers on {CHAINS[chainId]?.name}</h3>
                <span>Tokens can be transferred to and from your account</span>
              </Col>
            </Row>
          </CardHeader>


          {loading && transactions.length === 0 && (
            <div className="notification-container" style={{ minHeight: '100px' }}>
              <ProgressIndicator message="Loading Transactions..." />
            </div>
          )}

          {!loading && transactions.length === 0 && <Empty message="No Transactions Yet" />}

          {transactions.length > 0 && (
            <>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Timestamp</th>
                    <th scope="col">Mode</th>
                    <th scope="col">Partner</th>
                    <th scope="col">Value</th>
                    <th scope="col">Currency</th>
                  </tr>
                </thead>
                <tbody className="loader-container">
                  {loading && <TableLoader colspan={'6'} />}
                  {transactions.sort((a, b) => a.timestamp < b.timestamp ? 1 : -1).map((transaction: TokenTransfer, index: number) => {
                    return <TokenTransferRow key={transaction.txHash} tokenTransfer={transaction} ownAccount={userAddress} />;
                  })}
                </tbody>
              </Table>
              <CardFooter>
                <nav aria-label="...">
                  <PaginationElement pagination={pagination} setPagination={setPagination} />
                </nav>
              </CardFooter>

            </>
          )}
        </Card>
      </div>
    </Row>
  );
};

export default TransactionTable;
