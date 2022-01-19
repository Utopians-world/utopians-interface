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
          {currentFC.duration.toNumber() === 0 ? (
            <span style={NumberStyle}>No set</span>
          ) : (
            <span></span>
          )}
          {currentFC.duration.toNumber() !== 0 && days < 0 ? (
            <span style={NumberStyle}>Finish</span>
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
      {currentFC.duration.toNumber() === 0 ? (
        <Progress percent={0} showInfo={false} className="progres-mine" />
      ) : (
        <Progress
          percent={progress}
          showInfo={false}
          className="progres-mine"
        />
      )}
    </Col>
  )
}
