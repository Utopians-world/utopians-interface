import { CSSProperties, useState } from 'react'
import { Modal, Space, Input } from 'antd'
import ModalTab from '../ProjectsDetail/ModalTab'
import { CheckCircleFilled } from '@ant-design/icons'
import { constants } from 'ethers'
// import {FundingCycle} from "../../models/funding-cycle";

export default function DetailEditRuleModal({
  visible,
  onSuccess,
  onCancel,
}: // fundingCycle
{
  visible?: boolean
  onSuccess?: VoidFunction
  onCancel?: VoidFunction
  // fundingCycle?: FundingCycle | undefined
}) {
  const [selectedIndex, setSelectedIndex] = useState<number>()
  const [loading] = useState<boolean>()
  const [customStrategyAddress, setCustomStrategyAddress] = useState<string>()
  const InputStyle: CSSProperties = {
    width: '95%',
    height: '42px',
    borderRadius: '5px',
    border: '2px solid #bdc1e4',
    padding: '0 15px',
    marginTop: '5px',
  }
  const SecondDivStyle: CSSProperties = {
    width: '15%',
    textAlign: 'center',
    lineHeight: '140px',
  }
  // console.log(fundingCycle)

  return (
    <Modal
      title={'Edit reconfiguration strategy'}
      visible={visible}
      onCancel={onCancel}
      confirmLoading={loading}
      width={670}
      centered={true}
      cancelText={'CANCEL'}
      okText={'SAVE CHANGES'}
    >
      <Space
        direction="vertical"
        size="large"
        style={{ gap: '20px!important' }}
      >
        <ModalTab
          textFirst={'Changes will be applied to the'}
          textSecond={' upcoming '}
          textLast={'funding cycle.'}
        />
        <div
          style={{
            ...(selectedIndex === 0 ? { border: '2px solid #3A1FF5' } : {}),
          }}
          onClick={() => setSelectedIndex(0)}
          key={0}
          className="editRule"
        >
          <div style={{ width: '85%', fontSize: '12px', padding: '10px 20px' }}>
            <div style={{ fontSize: '18px' }}>NO strategy</div>
            <p>
              Any reconfiguration to an upcoming funding cycle will take effect
              once the current cycle ends. A project with no strategy may be
              vulnerable to being rug-pulled by its owner.
            </p>
            <div style={{ marginTop: '15px' }}>
              Contract Address 0X0003034304930493049304930493403493049343049304
            </div>
          </div>
          <div style={SecondDivStyle}>
            {0 === selectedIndex ? (
              <CheckCircleFilled
                style={{ fontSize: '22px', color: '#3A1FF5' }}
              />
            ) : (
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '10px',
                  border: '2px solid #D3DCEE',
                  margin: '55px auto',
                }}
              >
                {' '}
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            ...(selectedIndex === 1 ? { border: '2px solid #3A1FF5' } : {}),
          }}
          onClick={() => setSelectedIndex(1)}
          key={1}
          className="editRule"
        >
          <div style={{ width: '85%', fontSize: '12px', padding: '10px 20px' }}>
            <div style={{ fontSize: '18px' }}>7-day delay</div>
            <p>
              A reconfiguration to an upcoming funding cycle must be submitted
              at least 7 days before it starts.
            </p>
            <div style={{ marginTop: '35px' }}>
              Contract Address 0X0003034304930493049304930493403493049343049304
            </div>
          </div>
          <div style={SecondDivStyle}>
            {1 === selectedIndex ? (
              <CheckCircleFilled
                style={{ fontSize: '22px', color: '#3A1FF5' }}
              />
            ) : (
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '10px',
                  border: '2px solid #D3DCEE',
                  margin: '55px auto',
                }}
              >
                {' '}
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            ...(selectedIndex === 2 ? { border: '2px solid #3A1FF5' } : {}),
          }}
          onClick={() => setSelectedIndex(2)}
          key={2}
          className="editRule"
        >
          <div style={{ width: '85%', fontSize: '12px', padding: '10px 20px' }}>
            <div style={{ fontSize: '18px' }}>3-day delay</div>
            <p>
              A reconfiguration to an upcoming funding cycle must be submitted
              at least 3 days before it starts.
            </p>
            <div style={{ marginTop: '35px' }}>
              Contract Address 0X0003034304930493049304930493403493049343049304
            </div>
          </div>
          <div style={SecondDivStyle}>
            {2 === selectedIndex ? (
              <CheckCircleFilled
                style={{ fontSize: '22px', color: '#3A1FF5' }}
              />
            ) : (
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '10px',
                  border: '2px solid #D3DCEE',
                  margin: '55px auto',
                }}
              >
                {' '}
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            ...(selectedIndex === 3 ? { border: '2px solid #3A1FF5' } : {}),
          }}
          onClick={() => setSelectedIndex(3)}
          key={3}
          className="editRule"
        >
          <div style={{ width: '85%', fontSize: '12px', padding: '10px 20px' }}>
            <div style={{ fontSize: '18px' }}>Custom strategy</div>
            <div>
              <Input
                style={InputStyle}
                value={customStrategyAddress}
                placeholder={constants.AddressZero}
                onChange={e =>
                  setCustomStrategyAddress(e.target.value.toLowerCase())
                }
              />
            </div>
            <div>
              The address of any smart contract deployed on main-net{' '}
              <a
                style={{ color: '#3A1FF5' }}
                href="https://github.com/jbx-protocol/juice-contracts-v1/blob/05828d57e3a27580437fc258fe9041b2401fc044/contracts/FundingCycles.sol"
                target="_blank"
                rel="noopener noreferrer"
              >
                this interface
              </a>
              .
            </div>
          </div>
          <div style={SecondDivStyle}>
            {3 === selectedIndex ? (
              <CheckCircleFilled
                style={{ fontSize: '22px', color: '#3A1FF5' }}
              />
            ) : (
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '10px',
                  border: '2px solid #D3DCEE',
                  margin: '55px auto',
                }}
              >
                {' '}
              </div>
            )}
          </div>
        </div>
      </Space>
    </Modal>
  )
}
