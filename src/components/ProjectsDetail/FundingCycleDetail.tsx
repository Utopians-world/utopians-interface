import { Collapse, Row, Col, Space, Progress } from 'antd'

import React, { CSSProperties, useContext } from 'react'

import Shape from '../icons/Shape'
import { ProjectContext } from '../../contexts/projectContext'
import CollapsePanel from 'antd/lib/collapse/CollapsePanel'
import FundingCycleDetailInfo from './FundingCycleDetailInfo'
import { CaretRightOutlined } from '@ant-design/icons'

export default function FundingCycleDetail({
  showCurrentDetail,
}: {
  showCurrentDetail?: boolean
}) {
  const { currentFC } = useContext(ProjectContext)

  const MainStyle: CSSProperties = {
    position: 'absolute',
    paddingLeft: '25px',
    top: '-2px',
    width: '100%',
  }
  const TimeStyle: CSSProperties = {
    color: '#2713E1',
    fontWeight: 'bold',
    fontSize: '17px',
    marginLeft: '3px',
    marginRight: '10px',
  }
  if (!currentFC) return null
  return (
    <Collapse
      style={{
        position: 'relative',
        background: '#ffffff',
        padding: '15px',
        border: '1px solid rgb(211, 220, 238)',
        borderRadius: '5px',
        marginTop: '20px',
      }}
      defaultActiveKey={showCurrentDetail ? '0' : undefined}
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
                  }}
                >
                  Cycle #{currentFC.number.toString()}
                </div>
              </Space>
            </Col>
            <Col className="gutter-row" span={15}>
              <Space>
                <div style={{ paddingTop: '5px' }}>
                  <Shape />
                </div>
                <div>
                  <span
                    style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#303030',
                    }}
                  >
                    05
                  </span>
                  <span style={TimeStyle}>h</span>
                  <span
                    style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#303030',
                    }}
                  >
                    59
                  </span>
                  <span style={TimeStyle}>m</span>
                  <span
                    style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#303030',
                    }}
                  >
                    05
                  </span>
                  <span style={TimeStyle}>s</span>
                </div>
              </Space>
              <Progress percent={50} showInfo={false} />
            </Col>
          </Row>
        }
      >
        <FundingCycleDetailInfo fundingCycle={currentFC} />
      </CollapsePanel>
    </Collapse>
  )
}
