import { Col, Row } from 'antd'

import React, { useContext } from 'react'

import { parseEther } from '@ethersproject/units'

import { FundingCycle } from '../../models/funding-cycle'

import { ProjectContext } from '../../contexts/projectContext'
import { formatDate } from '../../utils/formatDate'
import { decodeFCMetadata } from '../../utils/fundingCycle'
import {
  formatWad,
  fromPerbicent,
  fromPermille,
} from '../../utils/formatNumber'
import { weightedRate } from '../../utils/math'

import { getBallotStrategyByAddress } from '../../constants/ballot-strategies'
import TooltipLabel from '../shared/TooltipLabel'

export default function FundingCycleInfo({
  fundingCycle,
}: {
  fundingCycle: FundingCycle | undefined
}) {
  const { tokenSymbol } = useContext(ProjectContext)

  if (!fundingCycle) return null

  const formattedStartTime = formatDate(fundingCycle.start.mul(1000))

  const secondsInDay = 24 * 60 * 60

  const formattedEndTime = formatDate(
    fundingCycle.start.add(fundingCycle.duration.mul(secondsInDay)).mul(1000),
  )

  const metadata = decodeFCMetadata(fundingCycle.metadata)
  return (
    <div>
      <Row style={{ padding: '10px' }}>
        <Col span={8} style={{ fontWeight: 'bold' }}>
          Address
        </Col>
        <Col
          span={14}
          style={{
            height: '60px',
            width: '100%',
            wordWrap: 'break-word',
            fontWeight: 'bold',
          }}
        >
          {getBallotStrategyByAddress(fundingCycle.ballot).address}
        </Col>
      </Row>
      <Row style={{ padding: '10px', borderTop: '1px dashed #665FAC' }}>
        <Col span={10}>Target:</Col>
        <Col span={14}>{formatWad(fundingCycle.target, { decimals: 2 })}</Col>
      </Row>
      <Row style={{ padding: '10px', borderTop: '1px dashed #665FAC' }}>
        <Col span={10}>Start:</Col>
        <Col span={14}>{formattedStartTime}</Col>
      </Row>
      <Row style={{ padding: '10px', borderTop: '1px dashed #665FAC' }}>
        <Col span={10}>End:</Col>
        <Col span={14}>{formattedEndTime}</Col>
      </Row>
      <Row style={{ padding: '10px', borderTop: '1px dashed #665FAC' }}>
        <Col span={10} style={{ height: '25px' }}>
          <TooltipLabel
            label={
              <div
                style={{
                  marginBottom: '5px',
                  display: 'inline-block',
                  marginRight: '10px',
                  fontSize: '15px',
                }}
              >
                <span>Reserved:</span>
              </div>
            }
            tip="Whenever someone pays your project, this percentage of tokens will be reserved and the rest will
                 go to the payer. Reserve tokens are reserved for the project owner by default, but can also be
                  allocated to other wallet addresses by the owner. Once tokens are reserved, anyone can 'mint' them,
                   which distributes them to their intended receivers."
          />
        </Col>
        <Col span={14}>{fromPerbicent(metadata?.reservedRate)}%</Col>
      </Row>
      <Row style={{ padding: '10px', borderTop: '1px dashed #665FAC' }}>
        <Col span={10} style={{ height: '25px' }}>
          <TooltipLabel
            label={
              <div
                style={{
                  marginBottom: '5px',
                  display: 'inline-block',
                  marginRight: '10px',
                  fontSize: '15px',
                }}
              >
                <span>Discount rate:</span>
              </div>
            }
            tip="The ratio of tokens rewarded per payment amount will decrease by this percentage with each
                 new funding cycle. A higher discount rate will incentivize supporters to pay your project earlier
                  than later."
          />
        </Col>
        <Col span={14}>{fromPermille(fundingCycle.discountRate)}%</Col>
      </Row>
      <Row style={{ padding: '10px', borderTop: '1px dashed #665FAC' }}>
        <Col span={10} style={{ height: '25px' }}>
          <TooltipLabel
            label={
              <div
                style={{
                  marginBottom: '5px',
                  display: 'inline-block',
                  marginRight: '10px',
                  fontSize: '15px',
                }}
              >
                <span>Tokens/ETH:</span>
              </div>
            }
            tip="Tokens received per ETH paid to the treasury. This will change according to the
                 project's discount rate over time, as well as its reserved tokens amount."
          />
        </Col>
        <Col span={14}>
          {formatWad(weightedRate(fundingCycle, parseEther('1'), 'payer'), {
            decimals: 0,
          })}{' '}
          {tokenSymbol ?? 'tokens'}
        </Col>
      </Row>
      <Row style={{ padding: '10px', borderTop: '1px dashed #665FAC' }}>
        <Col span={10} style={{ height: '25px' }}>
          <TooltipLabel
            label={
              <div
                style={{
                  marginBottom: '5px',
                  display: 'inline-block',
                  marginRight: '10px',
                  fontSize: '15px',
                }}
              >
                <span>Bonding curve:</span>
              </div>
            }
            tip="This rate determines the amount of overflow that each token can be redeemed for at any given
                 time. On a lower bonding curve, redeeming a token increases the value of each remaining token,
                  creating an incentive to hodl tokens longer than others. A bonding curve of 100% means all
                   tokens will have equal value regardless of when they are redeemed."
          />
        </Col>
        <Col span={14}>{fromPerbicent(metadata?.bondingCurveRate)}%</Col>
      </Row>
      <Row style={{ padding: '10px', borderTop: '1px dashed #665FAC' }}>
        <Col span={10} style={{ height: '25px' }}>
          <TooltipLabel
            label={
              <div
                style={{
                  marginBottom: '5px',
                  display: 'inline-block',
                  marginRight: '10px',
                  fontSize: '15px',
                }}
              >
                <span>Reconfiguration strategy:</span>
              </div>
            }
            tip="Rules for determining how funding cycles can be reconfigured."
          />
        </Col>
        <Col span={14}>
          {getBallotStrategyByAddress(fundingCycle.ballot).name}
        </Col>
      </Row>
    </div>
  )
}
