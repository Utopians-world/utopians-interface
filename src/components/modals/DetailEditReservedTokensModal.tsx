import { CSSProperties, useState } from 'react'
import { Divider, Modal, Space, Slider, Row, Col, InputNumber } from 'antd'
import ModalTab from '../ProjectsDetail/ModalTab'
import Garbage from '../icons/Garbage'

export default function DetailEditReservedTokensModal({
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
  const DivStrategyStyle: CSSProperties = {
    border: '2px solid #bdc1e4',
    width: '100%',
    height: '120px',
    borderRadius: '4px',
    margin: '15px auto',
    display: 'flex',
    justifyContent: 'left',
    background: '#fdfeff',
  }
  const DividerStyle: CSSProperties = {
    color: '#D3DCEE',
    margin: 0,
    fontSize: '12px',
    borderTopColor: '#D3DCEE',
    paddingRight: '15px',
  }
  const inputValue = 1
  function onChange() {}
  return (
    <Modal
      title={'Edit reserved tokens'}
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
            <Divider orientation="right" style={DividerStyle}>
              Reserve percentage
            </Divider>
            <p style={{ fontWeight: 'bold', fontSize: '13px' }}>
              Tokens are earned by anyone who pays your project, and can be
              redeemed for overflow if your project has set a funding target.
            </p>
            <p
              style={{ color: '#3A1FF5', fontWeight: 'bold', fontSize: '13px' }}
            >
              What is rule of reserved token ?
            </p>
            <p
              style={{
                fontWeight: 'bold',
                fontSize: '15px',
                marginTop: '10px',
              }}
            >
              Reserved tokens
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
                'Whenever someone pays your project, this percentage of tokens will be reserved and the rest will go to the payer. Reserve tokens are reserved for the project owner by default, but can also be allocated to other wallet addresses by the owner. Once tokens are reserved, anyone can "mint" them, which distributes them to their intended receivers.'
              }
            />
          </div>
          <div style={DivInputStyle}>
            <Divider orientation="right" style={DividerStyle}>
              Allocation
            </Divider>
            <p style={{ fontWeight: 'bold', fontSize: '13px' }}>
              Allocate reserved tokens is optional. By default, automatically
              distribute a portion of your project's reserved tokens to other
              utopians projects or ETH wallets.
            </p>
            <div
              style={{
                background: '#D3DCEE',
                border: '1px dashed #665FAC',
                height: '60px',
                lineHeight: '60px',
                textAlign: 'center',
                borderRadius: '3px',
                color: '#665FAC',
                fontWeight: 'bold',
                marginTop: '10px',
              }}
            >
              Add token receiver
            </div>
            <div style={DivStrategyStyle}>
              <div
                style={{ width: '30%', fontSize: '12px', padding: '10px 20px' }}
              >
                <p
                  style={{
                    color: '#9092A7',
                    paddingLeft: '20px',
                    marginBottom: '10px',
                  }}
                >
                  Percentage
                </p>
                <p
                  style={{
                    fontSize: '40px',
                    fontWeight: 'bold',
                    marginBottom: '15px',
                    lineHeight: '50px',
                  }}
                >
                  27%
                </p>
              </div>
              <div style={{ width: '50%', padding: '10px 20px' }}>
                <p style={{ color: '#9092A7' }}>Address</p>
                <p
                  style={{
                    color: '#5F5E61',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    lineHeight: '13px',
                  }}
                >
                  0X0003034304930493049304930493403493049343049304{' '}
                </p>
                <p
                  style={{
                    color: '#9092A7',
                    marginTop: '20px',
                    marginBottom: 0,
                  }}
                >
                  Locked date
                </p>
                <p
                  style={{
                    color: '#5F5E61',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    lineHeight: '13px',
                  }}
                >
                  12-09-2021{' '}
                </p>
              </div>
              <div
                style={{
                  width: '20%',
                  textAlign: 'center',
                  lineHeight: '120px',
                }}
              >
                <Garbage />
              </div>
            </div>
            <div>
              <p
                style={{
                  textAlign: 'right',
                  fontWeight: 'bold',
                  fontSize: '22px',
                }}
              >
                TOTAL PAYOUT: 27%
              </p>
              <p
                style={{
                  textAlign: 'right',
                  color: '#FE5164',
                  fontWeight: 'bold',
                }}
              >
                Remaining 73% percentage without reserved payout{' '}
              </p>
            </div>
          </div>
        </div>
      </Space>
    </Modal>
  )
}
