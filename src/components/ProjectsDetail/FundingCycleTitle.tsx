import React, { useContext, useState } from 'react'
import { Row, Col, Space } from 'antd'

import FundingCycleDetail from './FundingCycleDetail'
import DetailEditRuleModal from '../modals/DetailEditRuleModal'
import TooltipLabel from '../shared/TooltipLabel'
import FundingCycleUpcoming from './FundingCycleUpcoming'
import FundingCycleHistory from './FundingCycleHistory'
import { ProjectContext } from '../../contexts/projectContext'
import { PayoutMod, TicketMod } from '../../models/mods'
import DetailEditShow from './DetailEditShow'
// import {ProjectContext} from "../../contexts/projectContext";

type TabOption = 'INPROGRESS' | 'UPCOMING' | 'HISTORY'

export default function FundingCycleTitle({
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
    <Col className="gutter-row" span={5}>
      <div
        style={{
          fontWeight: 'bold',
          fontSize: '13px',
          lineHeight: '31px',
          textAlign: 'center',
          cursor: 'pointer',
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
      tabContent = <FundingCycleDetail showCurrentDetail={false} />
      break
    case 'UPCOMING':
      tabContent = <FundingCycleUpcoming />
      break
    case 'HISTORY':
      tabContent = (
        <FundingCycleHistory
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
      <Row gutter={16} style={{ borderBottom: '2px solid #DFE7FF' }}>
        <Col className="gutter-row" span={9}>
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
                    fontSize: '20px',
                    marginRight: '10px',
                  }}
                >
                  Funding cycle
                </div>
              }
              tip="A project's lifetime is defined in funding cycles.
                    If a funding target is set, the project can withdraw no
                    more than the target for the duration of the cycle."
            />
            <div
              className="editIcon"
              onClick={() => setDetailEditRuleVisible(true)}
            >
              <DetailEditShow />
            </div>
          </Space>
        </Col>
        {tab('INPROGRESS')}
        {tab('UPCOMING')}
        {tab('HISTORY')}
      </Row>
      <div>{tabContent}</div>
      <DetailEditRuleModal
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
