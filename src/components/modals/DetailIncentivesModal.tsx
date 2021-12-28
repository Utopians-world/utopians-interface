import { CSSProperties, useState } from 'react'
import { Col, InputNumber, Modal, Row, Slider, Space } from 'antd'
import ModalTab from '../ProjectsDetail/ModalTab'

export default function DetailIncentivesModal({
  visible,
  onSuccess,
  onCancel,
}: {
  visible?: boolean
  onSuccess?: VoidFunction
  onCancel?: VoidFunction
}) {
  const [loading] = useState<boolean>()

  const DivInputStyle: CSSProperties = {
    marginBottom: '15px',
    width: '48%',
  }
  const inputValue = 1
  function onChange() {}

  return (
    <Modal
      title={'Edit Appearance'}
      visible={visible}
      onCancel={onCancel}
      confirmLoading={loading}
      width={1080}
      centered={true}
      cancelText={'CANCEL'}
      okText={'SAVE CHANGES'}
    >
      <Space
        direction="vertical"
        size="large"
        style={{ width: '100%', paddingTop: 0 }}
      >
        <ModalTab
          textFirst={'Changes will be applied to the'}
          textSecond={' upcoming '}
          textLast={'funding cycle.'}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'left',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              marginBottom: '15px',
              width: '48%',
              marginRight: '4%',
            }}
          >
            <p style={{ fontWeight: 400, fontSize: '13px' }}>
              The ratio of tokens rewarded per payment amount will decrease by
              this percentage with each new funding cycle. A higher discount
              rate will incentivize supporters to pay your project earlier than
              later.
            </p>
            <p
              style={{
                fontWeight: 'bold',
                fontSize: '15px',
                marginTop: '10px',
              }}
            >
              Discount rate
            </p>
            <Row style={{ margin: '30px 0px 31px 0' }}>
              <Col span={18}>
                <Slider
                  min={1}
                  max={20}
                  onChange={onChange}
                  value={inputValue === 1 ? inputValue : 0}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={1}
                  max={20}
                  style={{ margin: '0 16px' }}
                  value={inputValue}
                  onChange={onChange}
                />
              </Col>
            </Row>
            <ModalTab
              textFirst={
                'Bonding curve disabled while no funding target is set.'
              }
            />
          </div>
          <div style={DivInputStyle}>
            <p style={{ fontWeight: 400, fontSize: '13px' }}>
              This rate determines the amount of overflow that each token can be
              redeemed for at any given time. On a lower bonding curve,
              redeeming a token increases the value of each remaining token,
              creating an incentive to hodl tokens longer than others. A bonding
              curve of 100% means all tokens will have equal value regardless of
              when they are redeemed.
            </p>
            <p
              style={{
                fontWeight: 'bold',
                fontSize: '15px',
                marginTop: '10px',
              }}
            >
              Bonding curve rate
            </p>
            <Row style={{ margin: '10px 0' }}>
              <Col span={18}>
                <Slider
                  min={1}
                  max={20}
                  onChange={onChange}
                  value={inputValue === 1 ? inputValue : 0}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={1}
                  max={20}
                  style={{ margin: '0 16px' }}
                  value={inputValue}
                  onChange={onChange}
                />
              </Col>
            </Row>
            <ModalTab
              textFirst={
                'Bonding curve disabled while no funding target is set.'
              }
            />
          </div>
        </div>
      </Space>
    </Modal>
  )
}
