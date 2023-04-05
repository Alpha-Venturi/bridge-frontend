import React, { useMemo, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Row } from 'reactstrap';
import TransactionTable from '../../components/Tables/TransactionTable/TransactionTable';
import { Token } from '../../util/types';
import { useGetTokenBalance } from '../../hooks/eth/tokens/useGetTokenBalance';
import OptionPicker from '../../components/Picker/OptionPicker';
import { leftNetwork, leftNetworkHooks, rightNetwork, rightNetworkHooks } from '../../connectors';
import BalanceIndicator from './BalanceIndicator';
import BridgeIcon from './BridgeIcon';
import Bridge from './Bridge';

const Transactions = () => {

  const [walletAddress, setWalletAddress] = useState<string>(process.env.REACT_APP_USER_WALLET_ADDRESS ?? "0x7CDDeD2529d7eaB098Ee18bB5384803E751DBcF7")
  const [rightToken, setRightToken] = useState<Token>({
    contractAddress: process.env.REACT_APP_RIGHT_TOKEN_ADDRESS ?? "0xB56324Ebf90e447e33A9A916fc894a44b96776b8",
    fungible: true,
    symbol: process.env.REACT_APP_RIGHT_TOKEN_SYMBOL ?? "WNOK",
    name: process.env.REACT_APP_RIGHT_TOKEN_NAME ?? "Wrapped Norwegian Crown",
  })
  const [leftToken, setLeftToken] = useState<Token>({
    contractAddress: process.env.REACT_APP_LEFT_TOKEN_ADDRESS ?? "0xB56324Ebf90e447e33A9A916fc894a44b96776b8",
    fungible: true,
    symbol: process.env.REACT_APP_LEFT_TOKEN_SYMBOL ?? "NOK",
    name: process.env.REACT_APP_LEFT_TOKEN_NAME ?? "Norwegian Crown",
  })
  const rightNetworkID = + (process.env.REACT_APP_CHAIN_ID ?? 1075)
  const leftNetworkID = + (process.env.REACT_APP_CHAIN_ID_2 ?? 1337)
  const rightBalance = useGetTokenBalance([rightNetwork, rightNetworkHooks], rightNetworkID, rightToken, walletAddress)
  const leftBalance = useGetTokenBalance([leftNetwork, leftNetworkHooks], leftNetworkID, leftToken, walletAddress)


  const renderAvailableWallets = useMemo(() => {
    return (
      <Input
        type="select"
        name="walletAddress"
        placeholder="Select a voucher type"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}>
        <option value={walletAddress}>{walletAddress}</option>
      </Input>
    )
  }, [walletAddress])

  const renderAvailableTokens = () => {
    return (
      <Input
        type="select"
        name="walletAddress"
        placeholder="Select a rightToken type"
        value={rightToken?.contractAddress ?? undefined}
        onChange={(e) => {
        }}>
        return (
        <option value={rightToken.contractAddress}>{rightToken.symbol}</option>
        )
      </Input>
    )
  }


  return (
    <Container fluid>
      <h2 className="title-top">Transactions</h2>
      <Row>
        <Col md={12}>
          <Card className="shadow">
            <CardHeader>
              <h3>Token Transfers</h3>
            </CardHeader>
            <CardBody className='align-self-stretch'>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="exampleFormControlSelect1"
                    >
                      Wallet Address
                    </label>
                    {renderAvailableWallets}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="exampleFormControlSelect1"
                    >
                      Token
                    </label>
                    {renderAvailableTokens()}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <OptionPicker
                    label='Norges Bank Network (token contract address)'
                    options={[`HL Besu - private testnet (${leftToken?.contractAddress})`]}
                    placeholder="Select the network the rightToken is originally minted at"
                  />
                </Col>
                <Col md={6}>
                  <OptionPicker
                    label='Reward Voucher Network (token contract address)'
                    options={[`IOTA Layer 2 ISC - private testnet (${rightToken?.contractAddress})`]}
                    placeholder="Select the network used for the Energy Incentive Scheme"
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className="mb-1" lg={6}>
          <BalanceIndicator token={leftToken} balance={leftBalance.value.toString()} network={"Norges Bank HL Besu"} />
        </Col>
        <Col className="mb-1" lg={6}>
          <BalanceIndicator token={rightToken} balance={rightBalance.value.toString()} network={"IOTA Layer 2 ISC - public testnet"} />
        </Col>
      </Row>
      <Row>
        <Col md={12} lg={5}>
          <TransactionTable userAddress={walletAddress} tokenAddress={leftToken?.contractAddress} chainId={leftNetworkID} fungibleToken={leftToken?.fungible ?? true} web3Connector={[leftNetwork, leftNetworkHooks]} />
        </Col>
        <Col md={12} lg={2} >
          <Row className="justify-content-center">
            <BridgeIcon active />
          </Row>
        </Col>
        <Col md={12} lg={5}>
          <TransactionTable userAddress={walletAddress} tokenAddress={rightToken?.contractAddress} chainId={rightNetworkID} fungibleToken={leftToken?.fungible ?? true} web3Connector={[rightNetwork, rightNetworkHooks]} />
        </Col>
      </Row>
      <Row>
        <Bridge requiredAccount={walletAddress} accountBalance={leftBalance.value} />
      </Row>
    </Container>
  );
};

export default Transactions;
