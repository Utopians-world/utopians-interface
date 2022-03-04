import React, { useContext, useState } from 'react'

import { Space } from 'antd'

import { PaymentActivity } from '../Dashboard/ProjectActivity/PaymentActivity'
import { ThemeContext } from '../../contexts/themeContext'
import { RedeemActivity } from '../Dashboard/ProjectActivity/RedeemActivity'
import { TapActivity } from '../Dashboard/ProjectActivity/TapActivity'
import { ReservesActivity } from '../Dashboard/ProjectActivity/ReservesActivity'

// import { Space } from 'antd'

// import LinkIcon from '../icons/LinkIcon'

type ShowGraph = 'Pay' | 'Redeem' | 'Widthdraw' | 'Reserves'

export default function Activity() {
  const [showGraph, setShowGraph] = useState<ShowGraph>('Pay')
  const {
    theme: { colors },
  } = useContext(ThemeContext)

  const textTitle = () => {
    switch (showGraph) {
      case 'Pay':
        return 'Activity-Pay'
      case 'Redeem':
        return 'Activity-redeem'
      case 'Widthdraw':
        return 'Activity-Widthdraw'
      case 'Reserves':
        return 'Activity-Reserves'
    }
  }

  const tabMemo = () => {
    switch (showGraph) {
      case 'Pay':
        return <PaymentActivity pageSize={50} />
      case 'Redeem':
        return <RedeemActivity pageSize={50} />
      case 'Widthdraw':
        return <TapActivity pageSize={50} />
      case 'Reserves':
        return <ReservesActivity pageSize={50} />
    }
  }

  const tab = (tab: ShowGraph) => {
    const selected = tab === showGraph

    let text: string
    switch (tab) {
      case 'Pay':
        text = 'Pay'
        break
      case 'Redeem':
        text = 'Redeem'
        break
      case 'Widthdraw':
        text = 'Widthdraw'
        break
      case 'Reserves':
        text = 'Reserves'
        break
    }

    return (
      <div
        style={{
          textTransform: 'uppercase',
          fontSize: '12px',
          color: selected ? colors.text.secondary : colors.text.tertiary,
          cursor: 'pointer',
          background: selected ? '#d9d5fe' : '#ffffff',
          fontWeight: 600,
          minWidth: '70px',
          textAlign: 'center',
        }}
        onClick={() => setShowGraph(tab)}
        className={
          text === 'Pay'
            ? 'leftChartsText'
            : text === 'Reserves'
            ? 'rightChartsText'
            : 'midChartsText'
        }
      >
        {text}
      </div>
    )
  }

  return (
    <div
      style={{
        width: '100%',
        background: '#ffffff',
        border: '1px solid #D3DCEE',
        borderRadius: '3px',
        marginTop: '18px',
      }}
    >
      <h3
        style={{
          padding: '10px 15px 0 15px',
          display: 'inline-block',
          fontSize: '22px',
          fontWeight: 'bold',
          fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
          color: '#1D1D1D',
          marginBottom: 0,
        }}
      >
        {textTitle()}
      </h3>

      <div
        className="chartsStyle"
        style={{ textAlign: 'center', margin: '15px 0' }}
      >
        <Space size="large" style={{ margin: '0 auto' }}>
          {tab('Pay')}
          {tab('Redeem')}
          {tab('Widthdraw')}
          {tab('Reserves')}
        </Space>
      </div>
      <div style={{ padding: '0 15px' }}>{tabMemo()}</div>
    </div>
  )
}
