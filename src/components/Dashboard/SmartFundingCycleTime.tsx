import { BigNumber } from '@ethersproject/bignumber'
import { Progress, Space } from 'antd'

import React, { CSSProperties } from 'react'

import { ClockCircleOutlined } from '@ant-design/icons'

import { FundingCycle } from '../../models/funding-cycle'

export function FundingCycleTime({
  currentFC,
}: {
  currentFC: FundingCycle | undefined
}) {
  if (!currentFC) return null
  const secsPerDay = 60 * 60 * 24
  const endTime = currentFC.start
    .add(currentFC.duration.mul(secsPerDay))
    .mul(1000)

  const secondsLeft =
    BigNumber.from(endTime).sub(Math.floor(Date.now().valueOf())).toNumber() /
    1000
  const duration = BigNumber.from(currentFC.duration.mul(secsPerDay)).toNumber()
  const progress = duration
    ? 100 - Math.floor((secondsLeft / duration) * 100)
    : 0
  const days = secondsLeft / 60 / 60 / 24
  const hours = (secondsLeft / 60 / 60) % 24
  const minutes = (secondsLeft / 60) % 60
  const seconds = secondsLeft % 60

  const TimeStyle: CSSProperties = {
    color: '#2713E1',
    fontWeight: 'bold',
    fontSize: '17px',
    marginLeft: '3px',
    marginRight: '10px',
    lineHeight: '22px',
  }
  const NumberStyle: CSSProperties = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#303030',
    lineHeight: '27px',
  }
  const SmartFundingTimeWrapper: CSSProperties = {
    display: 'flex',
    flex: '1 1 auto',
    flexFlow: 'column wrap',
    marginLeft: '24px',
  }

  return (
    <div style={SmartFundingTimeWrapper}>
      <Space>
        <div>
          <ClockCircleOutlined />
        </div>
        <div>
          {!days || days < 0 ? (
            <span>
              <span style={{ color: '#665FAC', ...NumberStyle }}>--</span>
              <span style={TimeStyle}>h</span>{' '}
              <span style={{ color: '#665FAC', ...NumberStyle }}>--</span>
              <span style={TimeStyle}>m</span>{' '}
              <span style={{ color: '#665FAC', ...NumberStyle }}>--</span>
              <span style={TimeStyle}>s</span>
            </span>
          ) : (
            <span></span>
          )}
          {days > 0 && days < 1 ? (
            <span>
              <span style={NumberStyle}>{Math.floor(hours).toString()}</span>
              <span style={TimeStyle}>h</span>{' '}
              <span style={NumberStyle}>{Math.floor(minutes).toString()}</span>
              <span style={TimeStyle}>m</span>{' '}
              <span style={NumberStyle}>{Math.floor(seconds).toString()}</span>
              <span style={TimeStyle}>s</span>
            </span>
          ) : (
            <span></span>
          )}
          {days > 1 ? (
            <span>
              <span style={NumberStyle}>{Math.floor(days).toString()}</span>
              <span style={TimeStyle}>d</span>{' '}
              <span style={NumberStyle}>{Math.floor(hours).toString()}</span>
              <span style={TimeStyle}>h</span>
            </span>
          ) : (
            <span></span>
          )}
        </div>
      </Space>
      <Progress
        className="SmartFundingProgress"
        percent={progress}
        showInfo={false}
        strokeLinecap="round"
      />
    </div>
  )
}
