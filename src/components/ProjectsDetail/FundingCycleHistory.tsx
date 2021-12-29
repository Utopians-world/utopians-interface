import React, { CSSProperties } from 'react'

export default function FundingCycleHistory() {
  const MainStyle: CSSProperties = {
    position: 'relative',
    background: '#ffffff',
    padding: '15px',
    border: '1px solid rgb(211, 220, 238)',
    borderRadius: '5px',
    marginTop: '20px',
  }
  return <div style={MainStyle}>No past funding history cycles</div>
}
