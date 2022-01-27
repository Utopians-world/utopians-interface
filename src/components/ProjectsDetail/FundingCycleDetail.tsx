import { Collapse, Row, Col, Space } from 'antd'

import React, { CSSProperties, useContext } from 'react'

import CollapsePanel from 'antd/lib/collapse/CollapsePanel'

import { CaretRightOutlined } from '@ant-design/icons'

import { ProjectContext } from '../../contexts/projectContext'

import FundingCycleInfo from './FundingCycleInfo'

import { FundingCycleTime } from './FundingCycleTime'

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
                    fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
                  }}
                >
                  Cycle #{currentFC.number.toString()}
                </div>
              </Space>
            </Col>
            <FundingCycleTime currentFC={currentFC} />
          </Row>
        }
      >
        <FundingCycleInfo fundingCycle={currentFC} />
      </CollapsePanel>
    </Collapse>
  )
}
