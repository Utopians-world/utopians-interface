import React from 'react'

import { PaymentActivity } from '../Dashboard/ProjectActivity/PaymentActivity'
// import { Space } from 'antd'

// import LinkIcon from '../icons/LinkIcon'

export default function ActivityMobile() {
  return (
    <div
      style={{
        width: '100%',
        background: '#ffffff',
        border: '1px solid #D3DCEE',
        borderRadius: '3px',
        marginTop: '18px',
        marginBottom: '50px',
      }}
    >
      <h3
        style={{
          padding: '10px 15px 0 15px',
          display: 'inline-block',
          fontSize: '16px',
          fontWeight: 'bold',
          fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
          color: '#1D1D1D',
          marginBottom: 0,
        }}
      >
        Activity
      </h3>
      <div style={{ padding: '0 15px' }}>
        <PaymentActivity pageSize={50} />
      </div>
    </div>
  )
}
