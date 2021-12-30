import React, { CSSProperties } from 'react'
import { Row, Col } from 'antd'

import FundOverview from './FundOverview'
import JBXToken from './JBXToken'
import Distribution from './Distribution'
import Reserved from './Reserved'
import FundUs from './FundUs'
import YourBalance from './YourBalance'
import Activity from './Activity'
import '../../styles/overrides/modal.scss'
import FundingCycle from './FundingCycle'
import ProjectTitle from './ProjectTitle'

export default function ProjectsDetail() {
  const MainLayout: CSSProperties = {
    maxWidth: '1420px',
    width: '100%',
    margin: '40px auto',
    paddingLeft: '20px',
    zIndex: 2,
  }
  const LeftLayout: CSSProperties = {
    minHeight: '1000px',
    background: '#ffffff',
    marginRight: '3%',
    padding: '20px',
    borderRadius: '3px',
    border: '1px solid #D3DCEE',
    zIndex: 2,
  }

  return (
    <Row gutter={20} style={MainLayout} className="mainLayout">
      <Col span={17} style={LeftLayout}>
        <ProjectTitle />
        <FundingCycle />
        <FundOverview />
        <JBXToken />
        <Distribution />
        <Reserved />
      </Col>
      <Col span={6} style={{ zIndex: 2 }}>
        <FundUs />
        <YourBalance />
        <Activity />
      </Col>
      <div className="indexBackground"> </div>
    </Row>
  )
}
