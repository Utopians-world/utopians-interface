import { CSSProperties, useState } from 'react'
import { Modal, Space, Input } from 'antd'
import ModalTab from '../ProjectsDetail/ModalTab'

export default function DetailEditRuleModal({
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
    width: '95%',
    height: '42px',
    borderRadius: '5px',
    border: '2px solid #bdc1e4',
    padding: '0 15px',
    marginTop: '5px',
  }
  const SecondDivStyle: CSSProperties = {
    width: '15%',
    textAlign: 'center',
    lineHeight: '140px',
  }
  const DivStrategyStyle: CSSProperties = {
    border: '2px solid #bdc1e4',
    width: '95%',
    height: '140px',
    borderRadius: '4px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'left',
    background: '#fdfeff',
    marginTop: '10px',
    cursor: 'pointer',
  }
  function Change() {}

  return (
    <Modal
      title={'Edit reconfiguration strategy'}
      visible={visible}
      onCancel={onCancel}
      confirmLoading={loading}
      width={670}
      centered={true}
      cancelText={'CANCEL'}
      okText={'SAVE CHANGES'}
    >
      <Space
        direction="vertical"
        size="large"
        style={{ gap: '20px!important' }}
      >
        <ModalTab
          textFirst={'Changes will be applied to the'}
          textSecond={' upcoming '}
          textLast={'funding cycle.'}
        />
        <div style={DivStrategyStyle} onClick={Change}>
          <div style={{ width: '85%', fontSize: '12px', padding: '10px 20px' }}>
            <div style={{ fontSize: '18px' }}>NO strategy</div>
            <p>
              Any reconfiguration to an upcoming funding cycle will take effect
              once the current cycle ends. A project with no strategy may be
              vulnerable to being rug-pulled by its owner.
            </p>
            <div style={{ marginTop: '15px' }}>
              Contract Address 0X0003034304930493049304930493403493049343049304
            </div>
          </div>
          <div style={SecondDivStyle}>
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '10px',
                border: '2px solid #D3DCEE',
                margin: '55px auto',
              }}
            >
              {' '}
            </div>
          </div>
        </div>
        <div style={DivStrategyStyle}>
          <div style={{ width: '85%', fontSize: '12px', padding: '10px 20px' }}>
            <div style={{ fontSize: '18px' }}>7-day delay</div>
            <p>
              A reconfiguration to an upcoming funding cycle must be submitted
              at least 7 days before it starts.
            </p>
            <div style={{ marginTop: '35px' }}>
              Contract Address 0X0003034304930493049304930493403493049343049304
            </div>
          </div>
          <div style={SecondDivStyle}>
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '10px',
                border: '2px solid #D3DCEE',
                margin: '55px auto',
              }}
            >
              {' '}
            </div>
          </div>
        </div>
        <div style={DivStrategyStyle}>
          <div style={{ width: '85%', fontSize: '12px', padding: '10px 20px' }}>
            <div style={{ fontSize: '18px' }}>3-day delay</div>
            <p>
              A reconfiguration to an upcoming funding cycle must be submitted
              at least 3 days before it starts.
            </p>
            <div style={{ marginTop: '35px' }}>
              Contract Address 0X0003034304930493049304930493403493049343049304
            </div>
          </div>
          <div style={SecondDivStyle}>
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '10px',
                border: '2px solid #D3DCEE',
                margin: '55px auto',
              }}
            >
              {' '}
            </div>
          </div>
        </div>
        <div style={DivStrategyStyle}>
          <div style={{ width: '85%', fontSize: '12px', padding: '10px 20px' }}>
            <div style={{ fontSize: '18px' }}>Custom strategy</div>
            <div>
              <Input style={InputStyle} placeholder={'0x00000000000000000'} />
            </div>
            <div>
              The address of any smart contract deployed on main-net that
              implements.{' '}
            </div>
          </div>
          <div style={SecondDivStyle}>
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '10px',
                border: '2px solid #D3DCEE',
                margin: '55px auto',
              }}
            >
              {' '}
            </div>
          </div>
        </div>
      </Space>
    </Modal>
  )
}
