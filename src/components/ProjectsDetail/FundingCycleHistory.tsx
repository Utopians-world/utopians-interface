import React, { CSSProperties, useCallback, useState } from 'react'

import { Col, Collapse, Row, Space } from 'antd'

import { CaretRightOutlined } from '@ant-design/icons'

import CollapsePanel from 'antd/lib/collapse/CollapsePanel'

import { BigNumber } from '@ethersproject/bignumber'

import { hasFundingTarget } from '../../utils/fundingCycle'

import { formatWad } from '../../utils/formatNumber'
import { formatHistoricalDate } from '../../utils/formatDate'
import { FundingCycle } from '../../models/funding-cycle'

import useContractReader from '../../hooks/ContractReader'
import { ContractName } from '../../models/contract-name'
import { deepEqFundingCycles } from '../../utils/deepEqFundingCycles'
import FundingCycleInfo from './FundingCycleInfo'
import Loading from '../shared/Loading'

export default function FundingCycleHistory({
  startId,
  showHistoryDetail,
}: {
  startId: BigNumber | undefined
  showHistoryDetail?: boolean
}) {
  const [fundingCycles, setFundingCycles] = useState<FundingCycle[]>([])
  const [cycleIds, setCycleIds] = useState<BigNumber[]>([])

  if (startId?.gt(0) && !cycleIds.length) setCycleIds([startId])

  const allCyclesLoaded = fundingCycles.length >= cycleIds.length
  const cycleNumber = allCyclesLoaded
    ? undefined
    : cycleIds[cycleIds.length - 1]

  useContractReader<FundingCycle>({
    contract: ContractName.FundingCycles,
    functionName: 'get',
    args: cycleNumber ? [cycleNumber] : null,
    valueDidChange: (a, b) => !deepEqFundingCycles(a, b),
    callback: useCallback(
      cycle => {
        if (
          !cycle ||
          !cycleNumber ||
          cycleIds.includes(cycle.basedOn) ||
          cycle.id.eq(0)
        )
          return

        setFundingCycles([...fundingCycles, cycle])
        setCycleIds([
          ...cycleIds,
          ...(cycle.basedOn.toNumber() > 0 ? [cycle.basedOn] : []),
        ])
      },
      [cycleNumber, cycleIds, fundingCycles],
    ),
  })
  const MainStyle: CSSProperties = {
    position: 'absolute',
    paddingLeft: '25px',
    top: '-2px',
    width: '100%',
  }
  // return <div style={MainStyle}>No past funding history cycles</div>

  const fundingCycleElems = (
    <div>
      {fundingCycles.length ? (
        fundingCycles.map((cycle, i) => (
          <Collapse
            style={{
              position: 'relative',
              background: '#ffffff',
              padding: '15px',
              border: '1px solid rgb(211, 220, 238)',
              borderRadius: '5px',
              marginTop: '10px',
            }}
            defaultActiveKey={showHistoryDetail ? '0' : undefined}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined
                style={{ color: '#2713E1' }}
                rotate={isActive ? 90 : 0}
                width={20}
                height={20}
              />
            )}
          >
            <CollapsePanel
              key={i}
              style={{ border: 'none' }}
              header={
                <Row gutter={16} style={MainStyle}>
                  <Col className="gutter-row" span={5}>
                    <Space>
                      <div
                        style={{
                          fontWeight: 'bold',
                          fontSize: '18px',
                          color: '#2713E1',
                          lineHeight: '50px',
                        }}
                      >
                        Cycle #{cycle.number.toString()}
                      </div>
                    </Space>
                  </Col>
                  <Col
                    className="gutter-row"
                    span={10}
                    style={{ textAlign: 'right', paddingRight: '20px' }}
                  >
                    <Space>
                      <div style={{ lineHeight: '48px' }}>
                        {hasFundingTarget(cycle) ? (
                          <>
                            {formatWad(cycle.tapped, { decimals: 2 })}/
                            {formatWad(cycle.target, { decimals: 2 })} withdrawn
                          </>
                        ) : (
                          <>
                            {formatWad(cycle.tapped, { decimals: 2 })} withdrawn
                          </>
                        )}
                      </div>
                    </Space>
                  </Col>
                  <Col
                    span={9}
                    style={{ textAlign: 'right', paddingRight: '20px' }}
                  >
                    <Space>
                      <div style={{ lineHeight: '48px' }}>
                        {formatHistoricalDate(
                          cycle.start.add(cycle.duration).mul(1000).toNumber(),
                        )}
                      </div>
                    </Space>
                  </Col>
                </Row>
              }
            >
              <FundingCycleInfo fundingCycle={fundingCycles[i]} />
            </CollapsePanel>
          </Collapse>
        ))
      ) : (
        <div
          style={{
            position: 'relative',
            background: '#ffffff',
            padding: '15px',
            border: '1px solid rgb(211, 220, 238)',
            borderRadius: '5px',
            marginTop: '20px',
          }}
        >
          No past funding cycles
        </div>
      )}
    </div>
  )

  return (
    <div>
      {fundingCycleElems}

      {allCyclesLoaded ? null : <Loading />}
    </div>
  )
}
