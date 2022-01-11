import { Col, Row, Slider } from 'antd'

import React, { useContext } from 'react'

import { ProjectContext } from '../../contexts/projectContext'
import { formatWad } from '../../utils/formatNumber'

export function DitributionLoad() {
  const { currentFC, balance } = useContext(ProjectContext)
  if (!currentFC) return null
  const target = formatWad(currentFC.target, { decimals: 2, padEnd: true })
  const getBalance = Number(formatWad(balance, { decimals: 2, padEnd: true }))
  let posses
  let overFlow
  let getTarget
  if (target) {
    getTarget = target.replace(',', '')
  } else {
    getTarget = 0
  }
  if (Number(getTarget) > getBalance) {
    overFlow = 0
    posses = Math.floor((getBalance / Number(getTarget)) * 100)
  } else {
    posses = Math.floor(
      (Number(getTarget) /
        (Number(getTarget) + getBalance - Number(getTarget))) *
        100,
    )
    overFlow = 1
  }

  return (
    <div>
      {overFlow === 0 ? (
        <Row style={{ margin: '5px 0' }}>
          <Col span={18}>
            <Slider min={1} max={100} value={posses} />
          </Col>
        </Row>
      ) : (
        <Row style={{ margin: '5px 0' }}>
          <Col span={18}>
            <Slider min={1} max={100} value={posses} className="fullSlider" />
          </Col>
        </Row>
      )}
    </div>
  )
}
