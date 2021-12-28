import React, { CSSProperties } from 'react'
import { Col, Row, Slider, Space } from 'antd'

import TipInfo from '../icons/TipInfo'

export default function FundOverview() {
  const NumberTotal: CSSProperties = {
    color: '#00DAC5',
    textShadow: '0px 5px 6px #9EFFF1',
    fontFamily: 'GoodTimesRg-Regular',
    margin: 0,
    lineHeight: '20px',
  }
  const inputValue = 1
  function onChange() {}
  return (
    <div
      style={{
        width: '100%',
        marginTop: '20px',
      }}
    >
      <h2>Fund Overview</h2>
      <div
        style={{
          background: '#edf1f9',
          padding: '20px',
        }}
      >
        <div
          style={{
            height: '60px',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              width: '30%',
              paddingLeft: '30px',
              borderRight: '1.5px solid #C3D0F9',
            }}
          >
            <Space>
              <h4>Volume</h4>
              <div style={{ paddingBottom: '2px' }}>
                <TipInfo size={15} />
              </div>
            </Space>
            <h2 style={NumberTotal}>1998,45</h2>
          </div>
          <div
            style={{
              width: '30%',
              paddingLeft: '30px',
              borderRight: '1.5px solid #C3D0F9',
            }}
          >
            <h4>In Utopians</h4>
            <h2 style={NumberTotal}>1998,45</h2>
            <h4 style={{ color: '#9092A7' }}>3,456</h4>
          </div>
          <div style={{ width: '40%', paddingLeft: '30px' }}>
            <div style={{ height: '29px' }}>
              <h4 style={{ float: 'left' }}>In wallet</h4>
              <div style={{ color: '#3A1FF5', float: 'right' }}>
                All Asset &gt;
              </div>
            </div>
            <div style={{ height: '40px' }}>
              <h2
                style={{
                  color: '#00DAC5',
                  textShadow: '0px 5px 6px #9EFFF1',
                  fontFamily: 'GoodTimesRg-Regular',
                  margin: 0,
                  float: 'left',
                  lineHeight: '20px',
                }}
              >
                1998,45
              </h2>
              <div
                style={{ color: '#717171', float: 'right', fontWeight: 'bold' }}
              >
                + 0 JBX
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            height: '90px',
            borderTop: '1.5px solid #C3D0F9',
            paddingLeft: '30px',
            paddingTop: '20px',
          }}
        >
          <Space>
            <h4>Distributed</h4>
            <div style={{ paddingBottom: '2px' }}>
              <TipInfo size={15} />
            </div>
          </Space>
          <h2
            style={{
              color: '#3A1FF5',
              textShadow: '0px 5px 6px #C4BAE1',
              fontFamily: 'GoodTimesRg-Regular',
              margin: 0,
              lineHeight: '20px',
            }}
          >
            {' '}
            $199,450 / $199,450
          </h2>
          <Row style={{ margin: '5px 0' }}>
            <Col span={18}>
              <Slider
                min={1}
                max={20}
                onChange={onChange}
                value={inputValue === 1 ? inputValue : 0}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}
