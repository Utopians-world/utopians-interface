import React, { CSSProperties, useContext } from 'react'

import { Col, Collapse, Progress, Row, Space } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import CollapsePanel from 'antd/lib/collapse/CollapsePanel'

import { ProjectContext } from '../../contexts/projectContext'

import FundingCycleInfo from './FundingCycleInfo'
import Shape from '../icons/Shape'
import { hasFundingTarget } from '../../utils/fundingCycle'

export default function FundingCycleUpcoming({
  showUpcomingDetail,
}: {
  showUpcomingDetail?: boolean
}) {
  // const MainStyle: CSSProperties = {
  //   position: 'relative',
  //   background: '#ffffff',
  //   padding: '15px',
  //   border: '1px solid rgb(211, 220, 238)',
  //   borderRadius: '5px',
  //   marginTop: '20px',
  // }
  const { projectId, queuedFC } = useContext(ProjectContext)

  if (!projectId) return null

  const MainStyle: CSSProperties = {
    position: 'absolute',
    paddingLeft: '25px',
    top: '-2px',
    width: '100%',
  }
  const noInfo: CSSProperties = {
    position: 'relative',
    background: '#ffffff',
    padding: '15px',
    border: '1px solid rgb(211, 220, 238)',
    borderRadius: '5px',
    marginTop: '20px',
  }

  return (
    <div>
      {queuedFC?.number.gt(0) ? (
        hasFundingTarget(queuedFC) ? (
          <Collapse
            style={{
              position: 'relative',
              background: '#ffffff',
              padding: '15px',
              border: '1px solid rgb(211, 220, 238)',
              borderRadius: '5px',
              marginTop: '20px',
            }}
            defaultActiveKey={showUpcomingDetail ? '0' : undefined}
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
              key={0}
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
                          fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
                        }}
                      >
                        Cycle #{queuedFC.number.toString()}
                      </div>
                    </Space>
                  </Col>
                  <Col className="gutter-row" span={15}>
                    <Space>
                      <div style={{ paddingTop: '5px' }}>
                        <Shape />
                      </div>
                      <div
                        style={{
                          fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
                          fontWeight: 'bold',
                        }}
                      >
                        WAITING
                      </div>
                    </Space>
                    <Progress percent={0} showInfo={false} />
                  </Col>
                </Row>
              }
            >
              <FundingCycleInfo fundingCycle={queuedFC} />
            </CollapsePanel>
          </Collapse>
        ) : null
      ) : (
        <div style={noInfo}>No upcoming funding cycle</div>
      )}
    </div>
  )
}
