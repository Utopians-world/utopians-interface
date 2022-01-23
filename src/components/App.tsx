import { Layout, Modal, Space, Button } from 'antd'
import { Content } from 'antd/lib/layout/layout'

import { NetworkContext } from 'contexts/networkContext'
// import { NetworkName } from 'models/network-name'
import { useContext, useLayoutEffect, useState } from 'react'

import { readNetwork } from 'constants/networks'

import Navbar from './Navbar'
import Router from './Router'
import Footer from './Footer'

function App() {
  const [switchNetworkModalVisible, setSwitchNetworkModalVisible] =
    useState<boolean>()

  const { signerNetwork, onSelectWallet } = useContext(NetworkContext)

  const networkName = readNetwork.name

  // const supportedNetworks: NetworkName[] = [
  //   NetworkName.mainnet,
  //   NetworkName.rinkeby,
  // ]

  useLayoutEffect(() => {
    if (!signerNetwork) return
    setSwitchNetworkModalVisible(signerNetwork !== networkName)
  }, [networkName, signerNetwork])

  return (
    <>
      <Layout
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          background: 'transparent',
        }}
      >
        <Navbar />
        <Content style={{ minHeight: 'auto', paddingTop: 80 }}>
          <Router />
        </Content>
        <Footer />
      </Layout>

      <Modal
        visible={switchNetworkModalVisible}
        centered
        // closable={false}
        onCancel={() => {
          setSwitchNetworkModalVisible(!switchNetworkModalVisible)
        }}
        footer={null}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 200,
          }}
        >
          <Space direction="vertical" align="center">
            <h2
              style={{
                textAlign: 'center',
                fontSize: 18,
                fontFamily: 'TeXGyreAdventor-Bold',
                color: '#1c1c20',
                lineHeight: '16px',
              }}
            >
              Please connect to the {networkName}（Metis) network
            </h2>

            <Button
              className="stepSaveBtn"
              style={{
                width: '260px',
                height: '52px',
                margin: '1.5rem auto 0',
              }}
              onClick={onSelectWallet}
            >
              Connect to {networkName}
            </Button>
          </Space>
        </div>
      </Modal>
    </>
  )
}

export default App
