import React from 'react'
import { Input, Select } from 'antd'

export default function FundUs() {
  const selectAfter = (
    <Select defaultValue="ETH" className="select-after">
      <Select.Option value="ETH">ETH</Select.Option>
      <Select.Option value="TEST">TEST</Select.Option>
      <Select.Option value="TEST">TEST</Select.Option>
      <Select.Option value="TEST">TEST</Select.Option>
    </Select>
  )
  return (
    <div
      style={{
        width: '100%',
        background: '#ffffff',
        border: '1px solid #D3DCEE',
        padding: '15px',
        borderRadius: '3px',
      }}
    >
      <h3 style={{ color: '#1D1D1D' }}>Fund us</h3>
      <Input bordered={false} addonAfter={selectAfter} />
      <div
        style={{
          fontSize: 12,
          padding: '8px 0',
        }}
      >
        Receive 0 People / coin
      </div>
      <div>
        <button
          style={{
            width: '100%',
            height: '45px',
            background: '#481BE3',
            borderRadius: '3px',
            color: '#ffffff',
            border: 'none',
            boxShadow: '0px 2px 9px 0px rgba(58, 31, 245, 0.41)',
            fontFamily: 'GoodTimesW00-Bold',
            fontWeight: 'bold',
          }}
        >
          CONTRIBUE
        </button>
      </div>
    </div>
  )
}
