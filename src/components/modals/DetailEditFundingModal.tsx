import { CSSProperties, useState } from 'react'
import { Modal, Space, Switch, Input, Select, Divider } from 'antd'
import ModalTab from '../ProjectsDetail/ModalTab'

export default function DetailEditFundingModal({
  visible,
  onSuccess,
  onCancel,
}: {
  visible?: boolean
  onSuccess?: VoidFunction
  onCancel?: VoidFunction
}) {
  const [loading] = useState<boolean>()
  const DivStrategyStyle: CSSProperties = {
    width: '100%',
    display: 'flex',
    justifyContent: 'left',
  }
  const { Option } = Select

  const selectAfter = (
    <Select defaultValue="ETH" className="select-after">
      <Option value="ETH">ETH</Option>
      <Option value="TEST">TEST</Option>
      <Option value="TEST">TEST</Option>
      <Option value="TEST">TEST</Option>
    </Select>
  )

  const periodAfter = (
    <Select defaultValue="one - time" className="select-after">
      <Option value="onetime">one - time</Option>
      <Option value="TEST">TEST</Option>
      <Option value="TEST">TEST</Option>
      <Option value="TEST">TEST</Option>
    </Select>
  )

  const DividerStyle: CSSProperties = {
    color: '#D3DCEE',
    margin: 0,
    fontSize: '12px',
    borderTopColor: '#D3DCEE',
    paddingRight: '15px',
    marginTop: '10px',
  }

  return (
    <Modal
      title={'Edit funding'}
      visible={visible}
      onCancel={onCancel}
      confirmLoading={loading}
      width={600}
      centered={true}
      cancelText={'CANCEL'}
      okText={'SAVE CHANGES'}
    >
      <Space
        direction="vertical"
        size="large"
        style={{ width: '100%', paddingTop: 0, gap: '20px' }}
      >
        <ModalTab
          textFirst={'Changes will be applied to the'}
          textSecond={' upcoming '}
          textLast={'funding cycle.'}
        />
        <div style={DivStrategyStyle}>
          <div style={{ width: '80%' }}>
            <p style={{ fontWeight: 'bold', fontSize: '14px' }}>
              Set a funding target{' '}
            </p>
            <p
              style={{ color: '#3A1FF5', fontWeight: 'bold', fontSize: '14px' }}
            >
              What is project target ?
            </p>
          </div>
          <div style={{ width: '20%', textAlign: 'right', paddingTop: '10px' }}>
            <Switch />
          </div>
        </div>
        <div>
          <div>
            <p
              style={{
                width: '50%',
                float: 'left',
                fontWeight: 'bold',
                fontSize: '14px',
                height: '30px',
                lineHeight: '30px',
              }}
            >
              Funding target{' '}
            </p>
            <p
              style={{
                width: '50%',
                float: 'left',
                textAlign: 'right',
                fontWeight: 'bold',
                fontSize: '19px',
              }}
            >
              $0 after 0% JBX
            </p>
          </div>
          <Input bordered={false} addonAfter={selectAfter} />
          <p style={{ color: '#5F5E61' }}>
            If target is 0: No funds can be distributed by the project, and the
            project's entire balance will be considered overflow.
          </p>
          <Divider orientation="right" style={DividerStyle}>
            Duration
          </Divider>
        </div>
        <div style={DivStrategyStyle}>
          <div style={{ width: '80%' }}>
            <p style={{ fontWeight: 'bold', fontSize: '14px' }}>
              Set a funding cycle duration
            </p>
            <p
              style={{ color: '#3A1FF5', fontWeight: 'bold', fontSize: '14px' }}
            >
              What is project duration
            </p>
          </div>
          <div style={{ width: '20%', textAlign: 'right', paddingTop: '10px' }}>
            <Switch />
          </div>
        </div>
        <div>
          <p
            style={{
              fontWeight: 'bold',
              fontSize: '14px',
              height: '30px',
              lineHeight: '30px',
            }}
          >
            Funding period
          </p>
          <div className={'long-input'}>
            <Input bordered={false} addonAfter={periodAfter} />
          </div>
          <p style={{ color: '#5F5E61' }}>
            If target is 0: No funds can be distributed by the project, and the
            project's entire balance will be considered overflow.
          </p>
        </div>
      </Space>
    </Modal>
  )
}
