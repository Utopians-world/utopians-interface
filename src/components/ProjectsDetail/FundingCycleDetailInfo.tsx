import { Col, Row } from 'antd'
import { FundingCycle } from '../../models/funding-cycle'
import { useContext } from 'react'
import { ProjectContext } from '../../contexts/projectContext'
import { formatDate } from '../../utils/formatDate'
import { decodeFCMetadata } from '../../utils/fundingCycle'
import {
  formatWad,
  fromPerbicent,
  fromPermille,
} from '../../utils/formatNumber'
import { weightedRate } from '../../utils/math'
import { parseEther } from '@ethersproject/units'
import { getBallotStrategyByAddress } from '../../constants/ballot-strategies'

export default function FundingCycleDetailInfo({
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
        <Col span={10}>Reserved:</Col>
        <Col span={14}>{fromPerbicent(metadata?.reservedRate)}%</Col>
      </Row>
      <Row style={{ padding: '10px', borderTop: '1px dashed #665FAC' }}>
        <Col span={10}>Discount rate:</Col>
        <Col span={14}>{fromPermille(fundingCycle.discountRate)}%</Col>
      </Row>
      <Row style={{ padding: '10px', borderTop: '1px dashed #665FAC' }}>
        <Col span={10}>JBX/ETH:</Col>
        <Col span={14}>
          {formatWad(weightedRate(fundingCycle, parseEther('1'), 'payer'), {
            decimals: 0,
          })}{' '}
          {tokenSymbol ?? 'tokens'}
        </Col>
      </Row>
      <Row style={{ padding: '10px', borderTop: '1px dashed #665FAC' }}>
        <Col span={10}>Bonding curve:</Col>
        <Col span={14}>{fromPerbicent(metadata?.bondingCurveRate)}%</Col>
      </Row>
      <Row style={{ padding: '10px', borderTop: '1px dashed #665FAC' }}>
        <Col span={10}>Reconfiguration strategy:</Col>
        <Col span={14}>
          {getBallotStrategyByAddress(fundingCycle.ballot).name}
        </Col>
      </Row>
    </div>
  )
}
