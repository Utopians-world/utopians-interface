import { Button, Col, Row } from 'antd'
import { NetworkContext } from 'contexts/networkContext'
import { useContext } from 'react'
import './index.scss'

import Balance from './Balance'
import Wallet from './Wallet'

export default function Account() {
  const { signingProvider, userAddress, onSelectWallet, onLogOut } =
    useContext(NetworkContext)

  return (
    <div>
      <Row gutter={10} align="middle">
        {userAddress && (
          <Col>
            <Balance address={userAddress} showEthPrice />
          </Col>
        )}
        {userAddress && (
          <Col>
            <Wallet userAddress={userAddress}></Wallet>
          </Col>
        )}
        <Col>
          {!signingProvider ? (
            <Button className="login-btn" onClick={onSelectWallet}>
              Connect
            </Button>
          ) : (
            <Button className="logout-btn" onClick={onLogOut}>
              Logout
            </Button>
          )}
        </Col>
      </Row>
    </div>
  )
}
