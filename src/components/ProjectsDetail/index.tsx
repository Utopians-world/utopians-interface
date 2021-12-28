import React from 'react'
import { Space } from 'antd'
import TestImg from 'assets/images/home-pic.png'

import FundOverview from './FundOverview'
import JBXToken from './JBXToken'
import Distribution from './Distribution'
import Reserved from './Reserved'
import FundUs from './FundUs'
import YourBalance from './YourBalance'
import Activity from './Activity'
import '../../styles/overrides/modal.scss'
import Tools from '../icons/Tools'
import WalletIcon from '../icons/WalletIcon'
import Dworld from '../icons/Dworld'
import TheDworld from '../icons/TheDworld'
import FundingCycle from './FundingCycle'
// import DetailIncentivesModal from "../modals/DetailIncentivesModal";
// import DetailEditFundingModal from "../modals/DetailEditFundingModal";
// import DetailEditReservedTokensModal from "../modals/DetailEditReservedTokensModal";
// import DetailIssueModal from "../modals/DetailIssueModal";
// import DetailSettingpopupModal from "../modals/DetailSettingpopupModal";
// import DetailEditRuleModal from "../modals/DetailEditRuleModal";

export default function ProjectsDetail() {
  // const [DetailSettingModalVisible, setDetailSettingModalVisible] = useState<boolean>(false)
  // function toast() {
  //   setDetailSettingModalVisible(true)
  // }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '80%',
        margin: '50px auto',
      }}
    >
      <div
        style={{
          width: '67%',
          minHeight: '1000px',
          background: '#ffffff',
          marginRight: '3%',
          padding: '20px',
          borderRadius: '3px',
          border: '1px solid #D3DCEE',
        }}
      >
        <div style={{ height: '25px' }}>
          <Space
            style={{
              textAlign: 'right',
              color: '#6D6B6B',
              fontSize: '12px',
              position: 'relative',
              float: 'right',
            }}
            align={'end'}
          >
            <div style={{ position: 'absolute', top: '1px' }}>
              <Tools />
            </div>
            <p style={{ marginLeft: '5px' }}>ID: 495434</p>
          </Space>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '25%',
              marginRight: '5%',
            }}
          >
            <img
              src={TestImg}
              alt=""
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div
            style={{
              width: '70%',
            }}
          >
            <div
              style={{
                fontSize: '30px',
                color: '#555252',
                fontWeight: 'bold',
                fontFamily: 'GoodTimesW00-Bold, GoodTimesW00',
                lineHeight: '35px',
              }}
            >
              THE FREEDOM CONCEPT DAO PROJECT
            </div>
            <p
              style={{
                color: '#777576',
                marginBottom: '5px',
                fontSize: '13px',
              }}
            >
              @ Freedom
            </p>
            <div
              style={{
                height: '20px',
                marginBottom: '10px',
              }}
            >
              <div
                style={{
                  float: 'left',
                  color: '#00DAC5',
                  fontSize: '12px',
                  width: '24%',
                }}
              >
                <WalletIcon />
                <span style={{ marginLeft: '3px' }}>freedom.com</span>
              </div>
              <div
                style={{
                  float: 'left',
                  color: '#00DAC5',
                  fontSize: '12px',
                  width: '24%',
                }}
              >
                <Dworld />
                <span style={{ marginLeft: '3px' }}>@The Dworld</span>
              </div>
              <div
                style={{
                  float: 'left',
                  color: '#00DAC5',
                  fontSize: '12px',
                  width: '24%',
                }}
              >
                <TheDworld />
                <span style={{ marginLeft: '3px' }}>@The Dworld</span>
              </div>
            </div>
            <p>
              In pharetra, quam a blandit dapibus, lorem ligula ornare odio, et
              mollis nisi ipsum a est. Suspendisse dignissim sed dolor a mattis.
              Praesent vulputate leo sed nibh pretium viverra. Pellentesque us.
              Mauris vel arcu consectetur, molestie lectus et, facilisis nunc.
            </p>
          </div>
        </div>
        <FundingCycle />
        <FundOverview />
        <JBXToken />
        <Distribution />
        <Reserved />
        {/*<Button*/}
        {/*  style={{ width: '100%' }}*/}
        {/*  type="primary"*/}
        {/*  onClick={toast}*/}
        {/*>*/}
        {/*  Test*/}
        {/*</Button>*/}
        {/*<DetailEditFundingModal*/}
        {/*  visible={DetailSettingModalVisible}*/}
        {/*  onSuccess={() => setDetailSettingModalVisible(false)}*/}
        {/*  onCancel={() => setDetailSettingModalVisible(false)}*/}
        {/*/>*/}
      </div>
      <div
        style={{
          width: '30%',
          minHeight: '600px',
        }}
      >
        <FundUs />
        <YourBalance />
        <Activity />
      </div>
    </div>
  )
}
