import React, { CSSProperties } from 'react'
import { Space } from 'antd'

import ExclamatoryMark from '../icons/ExclamatoryMark'

export default function ModalTab({
  textFirst,
  textSecond,
  textLast,
}: {
  textFirst?: string
  textSecond?: string
  textLast?: string
}) {
  const TextStyle: CSSProperties = {
    background: '#dbd6fe',
    borderRadius: '10px',
    padding: '8px 30px',
    color: '#241515',
    width: '100%',
    fontWeight: 'bold',
    position: 'relative',
  }
  return (
    <Space style={TextStyle}>
      <div style={{ position: 'absolute', top: '9px' }}>
        <ExclamatoryMark />
      </div>
      <p style={{ marginLeft: '15px', fontSize: '12px' }}>
        {textFirst}
        <span style={{ color: '#FE5164' }}>{textSecond}</span>
        {textLast}
      </p>
    </Space>
  )
}
