import React, { useState } from 'react'
import { Row, Col, Space } from 'antd'

import TipInfo from '../icons/TipInfo'
import FundingCycleDetail from './FundingCycleDetail'
import DetailEdit from '../icons/DetailEdit'
import DetailEditRuleModal from '../modals/DetailEditRuleModal'
// import {ProjectContext} from "../../contexts/projectContext";

type TabOption = 'INPROGRESS' | 'UPCOMING' | 'HISTORY'

export default function FundingCycle() {
  const [selectedTab, setSelectedTab] = useState<TabOption>('INPROGRESS')
  const [hoverTab, setHoverTab] = useState<TabOption>()
  const [DetailEditRuleVisible, setDetailEditRuleVisible] =
    useState<boolean>(false)
  // const {currentFC} = useContext(ProjectContext)
  const tab = (option: TabOption) => (
    <Col className="gutter-row" span={5}>
      <div
        style={{
          fontWeight: 'bold',
          fontSize: '13px',
          lineHeight: '31px',
          textAlign: 'center',
          cursor: 'pointer',
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
                backgroud:
                  'linear-gradient(90deg, #06E6DA 0%, #3297DA 30%, #B5A8EE 62%, #FFFFFF 100%)',
              }
            : {
                backgroud:
                  'linear-gradient(90deg, #06E6DA 0%, #3297DA 30%, #B5A8EE 62%, #FFFFFF 100%)',
              }),
          ...(option === hoverTab
            ? {
                backgroud:
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
      tabContent = <FundingCycleDetail showCurrentDetail={true} />
      break
    case 'UPCOMING':
      tabContent = <FundingCycleDetail />
      break
    case 'HISTORY':
      tabContent = <FundingCycleDetail />
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
          <Space style={{ fontWeight: 'bold', fontSize: '20px' }}>
            <div>Funding cycle</div>
            <div style={{ marginLeft: '10px', paddingTop: '2px' }}>
              <TipInfo />
              <span
                className="editIcon"
                onClick={() => setDetailEditRuleVisible(true)}
              >
                <DetailEdit />
              </span>
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
        // fundingCycle={currentFC}
      />
    </div>
  )
}
