import React from 'react'
import { Space } from 'antd'

import TipInfo from '../icons/TipInfo'

export default function Reserved() {
  return (
    <div
      style={{
        width: '100%',
        marginTop: '20px',
      }}
    >
      <h2>Reserved JBX (35%)</h2>
      <div
        style={{
          border: '1px solid #D3DCEE',
          borderRadius: '5px',
          padding: '15px 15px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            borderBottom: '1px dashed #665FAC',
            padding: '0 20px',
            paddingBottom: '20px',
          }}
        >
          <div
            style={{
              width: '25%',
            }}
          >
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
          </div>
          <div
            style={{
              width: '45%',
            }}
          >
            <div
              style={{
                fontWeight: 'bold',
                fontSize: '18px',
                marginBottom: '5px',
              }}
            >
              $590,494
            </div>
            <div>$ 555454545/4545345</div>
            <div>22,398,439 </div>
          </div>
          <div
            style={{
              width: '30%',
            }}
          >
            <div className={'button-spec'}>DISTRIBUTE</div>
          </div>
        </div>
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
    </div>
  )
}
