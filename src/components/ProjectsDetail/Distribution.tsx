import React, { useContext, useState } from 'react'
import { Col, Row, Space } from 'antd'

import { ProjectContext } from '../../contexts/projectContext'
import { formatWad } from '../../utils/formatNumber'
import { hasFundingTarget } from '../../utils/fundingCycle'
import DetailBalance from './DetailBalance'
import DetailEdit from '../icons/DetailEdit'
import DetailEditPayoutModal from '../modals/DetailEditPayoutModal'
import TooltipLabel from '../shared/TooltipLabel'
import WithdrawModal from '../modals/WithdrawModal'

export default function Distribution() {
  const { balanceInCurrency, owner, currentFC, currentPayoutMods } =
    useContext(ProjectContext)
  const [withdrawModalVisible, setWithdrawModalVisible] = useState<boolean>()
  const [DetailPayoutVisible, setDetailPayoutVisible] = useState<boolean>(false)
  if (!currentFC) return null

  const untapped = currentFC.target.sub(currentFC.tapped)

  console.log(currentPayoutMods)

  const withdrawable = balanceInCurrency?.gt(untapped)
    ? untapped
    : balanceInCurrency
  return (
    <div
      style={{
        width: '100%',
        marginTop: '20px',
      }}
    >
      <h2 style={{ fontWeight: 'bold' }}>
        Distribution
        <span className="editIcon" onClick={() => setDetailPayoutVisible(true)}>
          <DetailEdit />
        </span>
      </h2>
      <div
        style={{
          border: '1px solid #D3DCEE',
          borderRadius: '5px',
          padding: '15px 15px',
        }}
      >
        <Row
          style={{
            borderBottom: '1px dashed #665FAC',
            padding: '0 20px',
            paddingBottom: '20px',
          }}
        >
          <Col span={6}>
            <Space>
              <TooltipLabel
                label={
                  <div
                    style={{
                      color: '#2713E1',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      marginBottom: '5px',
                      display: 'inline-block',
                      marginRight: '10px',
                    }}
                  >
                    Available
                  </div>
                }
                tip="The funds available to withdraw for this funding
                    cycle after the 5% UTO fee is subtracted. This number
                    won't roll over to the next funding cycle, so funds
                    should be withdrawn before it ends."
              />
            </Space>
            <div style={{ fontWeight: 'bold' }}>Withdraw</div>
            <div style={{ fontWeight: 'bold' }}>Owner balance</div>
          </Col>
          <Col span={10}>
            <div
              style={{
                fontWeight: 'bold',
                fontSize: '18px',
                marginBottom: '5px',
              }}
            >
              {formatWad(withdrawable, { decimals: 4 }) || '0'}{' '}
            </div>
            <div>
              {formatWad(currentFC.tapped, { decimals: 4 }) || '0'}
              {hasFundingTarget(currentFC) && (
                <span>/{formatWad(currentFC.target, { decimals: 4 })} </span>
              )}{' '}
            </div>
            <div>
              <DetailBalance address={owner} />
            </div>
          </Col>
          <Col span={8}>
            <div
              className={'button-spec'}
              onClick={() => setWithdrawModalVisible(true)}
            >
              DISTRIBUTE
            </div>
          </Col>
        </Row>
        <div>
          <Space style={{ padding: '15px 20px' }}>
            <TooltipLabel
              label={
                <div
                  style={{
                    color: '#2713E1',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    marginBottom: '5px',
                    display: 'inline-block',
                    marginRight: '10px',
                  }}
                >
                  Distribute to
                </div>
              }
              tip="Available funds are distributed according to any payouts below."
            />
          </Space>
          <div
            style={{
              padding: '0 20px',
              background: '#F6F7FF',
              height: '30px',
              lineHeight: '30px',
            }}
          >
            <div style={{ float: 'left', width: '50%' }}>peri.eth</div>
            <div style={{ float: 'right', width: '50%', textAlign: 'right' }}>
              18.2%（$ 0）
            </div>
          </div>
          <div
            style={{ padding: '0 20px', height: '30px', lineHeight: '30px' }}
          >
            <div style={{ float: 'left', width: '50%' }}>
              peri.eth.dfjekjeeefjkwjf.com
            </div>
            <div style={{ float: 'right', width: '50%', textAlign: 'right' }}>
              18.2%（$ 0）
            </div>
          </div>
          <div
            style={{
              padding: '0 20px',
              background: '#F6F7FF',
              height: '30px',
              lineHeight: '30px',
            }}
          >
            <div style={{ float: 'left', width: '50%' }}>@ peri.eth</div>
            <div style={{ float: 'right', width: '50%', textAlign: 'right' }}>
              18.2%（$ 0）
            </div>
          </div>
          <div
            style={{ padding: '0 20px', height: '30px', lineHeight: '30px' }}
          >
            <div style={{ float: 'left', width: '50%' }}>peri.eth</div>
            <div style={{ float: 'right', width: '50%', textAlign: 'right' }}>
              18.2%（$ 0）
            </div>
          </div>
        </div>
      </div>
      <DetailEditPayoutModal
        visible={DetailPayoutVisible}
        onSuccess={() => setDetailPayoutVisible(false)}
        onCancel={() => setDetailPayoutVisible(false)}
        // fundingCycle={currentFC}
      />
      <WithdrawModal
        visible={withdrawModalVisible}
        onCancel={() => setWithdrawModalVisible(false)}
        onConfirmed={() => setWithdrawModalVisible(false)}
      />
    </div>
  )
}
