import React from 'react'
import { Space } from 'antd'

import TipInfo from '../icons/TipInfo'

export default function JBXToken() {
  return (
    <div
      style={{
        width: '100%',
        marginTop: '20px',
      }}
    >
      <Space>
        <h2>JBX Token</h2>
        <div style={{ paddingBottom: '2px' }}>
          <TipInfo size={15} />
        </div>
      </Space>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          border: '1px solid #D3DCEE',
          borderRadius: '5px',
          padding: '15px 37px',
        }}
      >
        <div
          style={{
            width: '25%',
          }}
        >
          <div>Address</div>
          <div>Total supply</div>
        </div>
        <div
          style={{
            width: '45%',
          }}
        >
          <div>0x9329582…..f3434242</div>
          <div>
            22,398,439
            <span style={{ fontWeight: 'bold' }}> JBX</span>
          </div>
        </div>
        <div
          style={{
            width: '30%',
          }}
        >
          <div className={'button-spec'}>SHOW HOLDER</div>
        </div>
      </div>
    </div>
  )
}
