import { CSSProperties, useState } from 'react'
import { Modal, Space, Input } from 'antd'

export default function DetailIssueModal({
  visible,
  onSuccess,
  onCancel,
}: {
  visible?: boolean
  onSuccess?: VoidFunction
  onCancel?: VoidFunction
}) {
  const [loading] = useState<boolean>()
  const InputStyle: CSSProperties = {
    width: '100%',
    height: '42px',
    borderRadius: '5px',
    border: '2px solid #bdc1e4',
    padding: '0 15px',
    marginTop: '5px',
  }
  return (
    <Modal
      title={'Issue ERC-20 token'}
      visible={visible}
      onCancel={onCancel}
      confirmLoading={loading}
      width={450}
      centered={true}
      cancelText={'CANCEL'}
      okText={'ISSUE TOKEN'}
    >
      <Space
        direction="vertical"
        size="large"
        style={{ width: '100%', paddingTop: 0, gap: '20px' }}
      >
        <div>
          <div
            style={{
              fontFamily: 'TeXGyreAdventor-Regular',
              fontSize: '12px',
              marginBottom: '20px',
            }}
          >
            Issue an ERC-20 token for this project. once issued, current staked
            token holders will be able to claim their exsting balance in the new
            token
          </div>
          <p
            style={{
              marginBottom: '5px',
              fontSize: '14px',
              fontWeight: 'bold',
              marginTop: '10px',
            }}
          >
            Token name
          </p>
          <Input style={InputStyle} placeholder={'Project Token'} />
          <p
            style={{
              marginBottom: '5px',
              fontSize: '14px',
              fontWeight: 'bold',
              marginTop: '10px',
            }}
          >
            Token symbol
          </p>
          <Input style={InputStyle} placeholder={'PRJ'} />
        </div>
      </Space>
    </Modal>
  )
}
