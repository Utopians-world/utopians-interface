import React from 'react'

export default function YourBalance() {
  return (
    <div
      style={{
        width: '100%',
        background: '#ffffff',
        border: '1px solid #D3DCEE',
        padding: '15px',
        borderRadius: '3px',
        marginTop: '20px',
      }}
    >
      <h3
        style={{
          borderBottom: '1px dashed #665FAC',
          paddingBottom: 10,
          color: '#1D1D1D',
        }}
      >
        Your Balance
      </h3>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '60%',
          }}
        >
          <div
            style={{ height: '40px', lineHeight: '40px', fontWeight: 'bold' }}
          >
            222,222324 JBX
          </div>
          <div style={{ fontWeight: 'bold' }}>0 Claimable</div>
          <div style={{ fontSize: 12, color: '#9092A7' }}>0% of supply</div>
        </div>
        <div
          style={{
            width: '40%',
          }}
        >
          <div className={'button-spec'} style={{ marginTop: '45px' }}>
            MANAGE
          </div>
        </div>
      </div>
    </div>
  )
}
