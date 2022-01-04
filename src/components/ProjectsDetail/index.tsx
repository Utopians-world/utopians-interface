import React, { CSSProperties, useContext } from 'react'
import { Row, Col } from 'antd'

import FundOverview from './FundOverview'
import JBXToken from './JBXToken'
import Distribution from './Distribution'
import Reserved from './Reserved'
import FundUs from './FundUs'
import YourBalance from './YourBalance'
import Activity from './Activity'
import '../../styles/overrides/modal.scss'
import FundingCycleTitle from './FundingCycleTitle'
import ProjectTitle from './ProjectTitle'
import { ProjectContext } from '../../contexts/projectContext'
import BalanceTimeline from '../Dashboard/BalanceTimeline'

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

  const {
    queuedFC,
    queuedPayoutMods,
    currentPayoutMods,
    queuedTicketMods,
    currentTicketMods,
    currentFC,
  } = useContext(ProjectContext)

  return (
    <Row gutter={20} style={MainLayout} className="mainLayout">
      <Col span={17} style={LeftLayout}>
        <ProjectTitle />
        <FundingCycleTitle />
        <FundOverview />
        <div style={{ marginTop: '20px' }} className="chartsStyle">
          <BalanceTimeline height={240} />
        </div>
        <JBXToken
          fundingCycle={queuedFC?.number.gt(0) ? queuedFC : currentFC}
        />
        <Distribution
          payoutMods={
            queuedFC?.number.gt(0) ? queuedPayoutMods : currentPayoutMods
          }
        />
        <Reserved
          ticketMods={
            queuedFC?.number.gt(0) ? queuedTicketMods : currentTicketMods
          }
          fundingCycle={queuedFC?.number.gt(0) ? queuedFC : currentFC}
        />
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
