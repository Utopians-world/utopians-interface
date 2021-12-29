import React, { useContext, useState } from 'react'
import { Col, Row, Space } from 'antd'

import TipInfo from '../icons/TipInfo'
import { ProjectContext } from '../../contexts/projectContext'
import { formatWad } from '../../utils/formatNumber'
import { hasFundingTarget } from '../../utils/fundingCycle'
import DetailBalance from './DetailBalance'
import DetailEdit from '../icons/DetailEdit'
import DetailEditPayoutModal from '../modals/DetailEditPayoutModal'

export default function Distribution() {
  const { balanceInCurrency, owner, currentFC, currentPayoutMods } =
    useContext(ProjectContext)
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
      <h2>
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
              <div
                style={{
                  color: '#2713E1',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  marginBottom: '5px',
                }}
              >
                Available
              </div>
              <div>
                <TipInfo size={15} />
              </div>
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
              onClick={() => setDetailPayoutVisible(true)}
            >
              DISTRIBUTE
            </div>
          </Col>
        </Row>
        <div>
          <Space style={{ padding: '15px 20px' }}>
            <div
              style={{ color: '#2713E1', fontWeight: 'bold', fontSize: '18px' }}
            >
              Distribute to
            </div>
            <div style={{ marginTop: '6px' }}>
              <TipInfo size={15} />
            </div>
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
    </div>
  )
}
