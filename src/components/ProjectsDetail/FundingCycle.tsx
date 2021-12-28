import React from 'react'
import { Row, Col, Progress, Space } from 'antd'

import TipInfo from '../icons/TipInfo'
import Down from '../icons/Down'
import Shape from '../icons/Shape'
export default function FundingCycle() {
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
            </div>
          </Space>
        </Col>
        <Col className="gutter-row" span={5}>
          <div
            style={{
              fontWeight: 'bold',
              fontSize: '13px',
              lineHeight: '31px',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            INPROGRESS
          </div>
          <div
            style={{
              background:
                'linear-gradient(90deg, #06E6DA 0%, #3297DA 30%, #B5A8EE 62%, #FFFFFF 100%)',
              height: '2px',
            }}
          ></div>
        </Col>
        <Col className="gutter-row" span={5}>
          <div
            style={{
              fontWeight: 'bold',
              fontSize: '13px',
              lineHeight: '31px',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            UPCOMING
          </div>
          <div
            style={{
              background:
                'linear-gradient(90deg, #06E6DA 0%, #3297DA 30%, #B5A8EE 62%, #FFFFFF 100%)',
              height: '2px',
            }}
          ></div>
        </Col>
        <Col className="gutter-row" span={5}>
          <div
            style={{
              fontWeight: 'bold',
              fontSize: '13px',
              lineHeight: '31px',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            HISTORY
          </div>
          <div
            style={{
              background:
                'linear-gradient(90deg, #06E6DA 0%, #3297DA 30%, #B5A8EE 62%, #FFFFFF 100%)',
              height: '2px',
            }}
          ></div>
        </Col>
      </Row>
      <Row
        gutter={16}
        style={{
          border: '1px solid #9B9EFF',
          padding: '10px',
          borderRadius: '3px',
          marginTop: '20px',
        }}
      >
        <Col className="gutter-row" span={5}>
          <Space>
            <div style={{ paddingTop: '8px' }}>
              <Down />
            </div>
            <div
              style={{
                fontWeight: 'bold',
                fontSize: '18px',
                color: '#2713E1',
                lineHeight: '50px',
              }}
            >
              Cycle #10
            </div>
          </Space>
        </Col>
        <Col className="gutter-row" span={15}>
          <Space>
            <div style={{ paddingTop: '5px' }}>
              <Shape />
            </div>
            <div>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>05</span>
              <span
                style={{
                  color: '#2713E1',
                  fontWeight: 'bold',
                  fontSize: '17px',
                  marginLeft: '3px',
                  marginRight: '10px',
                }}
              >
                h
              </span>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>59</span>
              <span
                style={{
                  color: '#2713E1',
                  fontWeight: 'bold',
                  fontSize: '17px',
                  marginLeft: '3px',
                  marginRight: '10px',
                }}
              >
                m
              </span>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>05</span>
              <span
                style={{
                  color: '#2713E1',
                  fontWeight: 'bold',
                  fontSize: '17px',
                  marginLeft: '3px',
                  marginRight: '10px',
                }}
              >
                s
              </span>
            </div>
          </Space>
          <Progress percent={50} showInfo={false} />
        </Col>
      </Row>

      {/*<h2>Funding cycle</h2>*/}
      {/*<div style={{*/}
      {/*    background:"#edf1f9",*/}
      {/*    padding: "20px"*/}
      {/*}}>*/}
      {/*    <div style={{*/}
      {/*        height: "60px",*/}
      {/*        display: "flex",*/}
      {/*        justifyContent: 'center',*/}
      {/*        marginBottom: "20px"*/}
      {/*    }}>*/}
      {/*        <div style={{width:"30%",paddingLeft:"30px",borderRight:"1.5px solid #C3D0F9"}}>*/}
      {/*            <h3>Volume</h3>*/}
      {/*            <h2 style={{color:"#00DAC5"}}>1998,45</h2>*/}
      {/*        </div>*/}
      {/*        <div style={{width:"30%",paddingLeft:"30px",borderRight:"1.5px solid #C3D0F9"}}>*/}
      {/*            <h3>In Utopians</h3>*/}
      {/*            <h2 style={{color:"#00DAC5"}}>1998,45</h2>*/}
      {/*            <h4 style={{color:"#9092A7"}}>3,456</h4>*/}
      {/*        </div>*/}
      {/*        <div style={{width:"40%"}}>*/}

      {/*        </div>*/}
      {/*    </div>*/}
      {/*    <div style={{*/}
      {/*        height: "90px",*/}
      {/*        borderTop: "1.5px solid #C3D0F9",*/}
      {/*    }}>*/}

      {/*    </div>*/}
      {/*</div>*/}
    </div>
  )
}
