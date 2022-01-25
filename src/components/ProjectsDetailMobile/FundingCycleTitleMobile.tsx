import React, { useContext, useState } from 'react'
import { Row, Col, Space } from 'antd'

import TooltipLabel from '../shared/TooltipLabel'
import { ProjectContext } from '../../contexts/projectContext'
import { PayoutMod, TicketMod } from '../../models/mods'
import DetailEditShowMobile from './DetailEditShowMobile'
import FundingCycleDetailMobile from './FundingCycleDetailMobile'
import FundingCycleUpcomingMobile from './FundingCycleUpcomingMobile'
import FundingCycleHistoryMobile from './FundingCycleHistoryMobile'
import DetailEditRuleMobileModal from '../MobileModel/DetailEditRuleMobileModal'
// import {ProjectContext} from "../../contexts/projectContext";

type TabOption = 'INPROGRESS' | 'UPCOMING' | 'HISTORY'

export default function FundingCycleTitleMobile({
  payoutMods,
  ticketMods,
}: {
  payoutMods: PayoutMod[]
  ticketMods: TicketMod[]
}) {
  const [selectedTab, setSelectedTab] = useState<TabOption>('INPROGRESS')
  const [hoverTab, setHoverTab] = useState<TabOption>()

  const [DetailEditRuleVisible, setDetailEditRuleVisible] =
    useState<boolean>(false)
  const { projectId, currentFC } = useContext(ProjectContext)
  const tab = (option: TabOption) => (
    <Col className="gutter-row" span={8}>
      <div
        style={{
          fontWeight: 'bold',
          fontSize: '12px',
          lineHeight: '31px',
          textAlign: 'center',
          cursor: 'pointer',
          fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
          ...(option === selectedTab
            ? {
                color: '#303030',
              }
            : {
                color: '#5F5E61',
              }),
          ...(option === hoverTab
            ? {
                color: '#303030',
              }
            : {}),
        }}
        onClick={() => setSelectedTab(option)}
        onMouseEnter={() => setHoverTab(option)}
        onMouseLeave={() => setHoverTab(undefined)}
      >
        {option}
      </div>
      <div
        style={{
          height: '2px',
          ...(option === selectedTab
            ? {
                background:
                  'linear-gradient(90deg, #06E6DA 0%, #3297DA 30%, #B5A8EE 62%, #FFFFFF 100%)',
              }
            : {
                background: '#ffffff',
              }),
          ...(option === hoverTab
            ? {
                background:
                  'linear-gradient(90deg, #06E6DA 0%, #3297DA 30%, #B5A8EE 62%, #FFFFFF 100%)',
              }
            : {}),
        }}
      >
        {' '}
      </div>
    </Col>
  )

  let tabContent: JSX.Element

  switch (selectedTab) {
    case 'INPROGRESS':
      tabContent = <FundingCycleDetailMobile showCurrentDetail={false} />
      break
    case 'UPCOMING':
      tabContent = <FundingCycleUpcomingMobile />
      break
    case 'HISTORY':
      tabContent = (
        <FundingCycleHistoryMobile
          startId={currentFC?.basedOn}
          showHistoryDetail={false}
        />
      )
      break
  }

  return (
    <div
      style={{
        width: '100%',
        marginTop: '20px',
      }}
    >
      <Row gutter={16}>
        <Col className="gutter-row" span={18}>
          <Space
            style={{
              fontWeight: 'bold',
              fontSize: '15px',
              marginRight: '10px',
            }}
          >
            <TooltipLabel
              label={
                <div
                  style={{
                    display: 'inline-block',
                    fontSize: '15px',
                    marginRight: '10px',
                    fontWeight: 'bold',
                    fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
                    color: '#1D1D1D',
                  }}
                >
                  Funding cycle
                </div>
              }
              tip="A project's lifetime is defined in funding cycles.
                    If a funding target is set, the project can withdraw no
                    more than the target for the duration of the cycle."
            />
          </Space>
        </Col>
        <Col span={6} style={{ textAlign: 'right' }}>
          <div
            className="editIcon"
            onClick={() => setDetailEditRuleVisible(true)}
          >
            <DetailEditShowMobile />
          </div>
        </Col>
      </Row>
      <Row style={{ borderBottom: '2px solid #DFE7FF', marginTop: '15px' }}>
        {tab('INPROGRESS')}
        {tab('UPCOMING')}
        {tab('HISTORY')}
      </Row>
      <div>{tabContent}</div>
      <DetailEditRuleMobileModal
        visible={DetailEditRuleVisible}
        onSuccess={() => setDetailEditRuleVisible(false)}
        onCancel={() => setDetailEditRuleVisible(false)}
        projectId={projectId}
        payoutMods={payoutMods}
        ticketMods={ticketMods}
        // fundingCycle={currentFC}
      />
    </div>
  )
}
