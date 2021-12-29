import { BigNumber } from '@ethersproject/bignumber'
import { Col, Progress, Space } from 'antd'

import React, { CSSProperties } from 'react'

import Shape from '../icons/Shape'

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
  const progress = 100 - Math.floor((secondsLeft / duration) * 100)
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
  }
  const NumberStyle: CSSProperties = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#303030',
  }

  return (
    <Col className="gutter-row" span={15}>
      <Space>
        <div style={{ paddingTop: '5px' }}>
          <Shape />
        </div>
        <div>
          {days && days > 1 ? (
            <span>
              <span style={NumberStyle}>{Math.floor(days).toString()}</span>
              <span style={TimeStyle}>d</span>{' '}
              <span style={NumberStyle}>{Math.floor(hours).toString()}</span>
              <span style={TimeStyle}>h</span>
            </span>
          ) : (
            <span>
              <span style={NumberStyle}>{Math.floor(hours).toString()}</span>
              <span style={TimeStyle}>h</span>{' '}
              <span style={NumberStyle}>{Math.floor(minutes).toString()}</span>
              <span style={TimeStyle}>m</span>{' '}
              <span style={NumberStyle}>{Math.floor(seconds).toString()}</span>
              <span style={TimeStyle}>s</span>
            </span>
          )}
        </div>
      </Space>
      <Progress percent={progress} showInfo={false} />
    </Col>
  )
}
