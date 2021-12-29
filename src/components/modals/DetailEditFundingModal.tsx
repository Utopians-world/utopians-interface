import { CSSProperties, useState } from 'react'
import { Modal, Space, Switch, Input, Select, Divider } from 'antd'

import { constants } from 'ethers'

import ModalTab from '../ProjectsDetail/ModalTab'
import { fromWad } from '../../utils/formatNumber'
// import {FormItems} from "../shared/formItems";
// import {UserContext} from "../../contexts/userContext";

export default function DetailEditFundingModal({
  visible,
  onSuccess,
  onCancel,
}: {
  visible?: boolean
  onSuccess?: VoidFunction
  onCancel?: VoidFunction
}) {
  const [loading] = useState<boolean>()
  const DivStrategyStyle: CSSProperties = {
    width: '100%',
    display: 'flex',
    justifyContent: 'left',
  }
  const { Option } = Select
  const [target, setTarget] = useState<string>('0')
  const [showFundingFields, setShowFundingFields] = useState<boolean>()
  const [showFundingDuration, setShowFundingDuration] = useState<boolean>()
  const maxIntStr = fromWad(constants.MaxUint256)
  // const { adminFeePercent } = useContext(UserContext)

  const selectAfter = (
    <Select defaultValue="ETH" className="select-after">
      <Option value="ETH">ETH</Option>
      <Option value="TEST">TEST</Option>
      <Option value="TEST">TEST</Option>
      <Option value="TEST">TEST</Option>
    </Select>
  )

  const periodAfter = (
    <Select defaultValue="one - time" className="select-after">
      <Option value="onetime">one - time</Option>
      <Option value="TEST">TEST</Option>
      <Option value="TEST">TEST</Option>
      <Option value="TEST">TEST</Option>
    </Select>
  )

  const DividerStyle: CSSProperties = {
    color: '#D3DCEE',
    margin: 0,
    fontSize: '12px',
    borderTopColor: '#D3DCEE',
    paddingRight: '15px',
    marginTop: '10px',
  }

  return (
    <Modal
      title={'Edit funding'}
      visible={visible}
      onCancel={onCancel}
      confirmLoading={loading}
      width={600}
      centered={true}
      cancelText={'CANCEL'}
      okText={'SAVE CHANGES'}
    >
      <Space
        direction="vertical"
        size="large"
        style={{ width: '100%', paddingTop: 0, gap: '20px' }}
      >
        <ModalTab
          textFirst={'Changes will be applied to the'}
          textSecond={' upcoming '}
          textLast={'funding cycle.'}
        />
        <div style={DivStrategyStyle}>
          <div style={{ width: '80%' }}>
            <p style={{ fontWeight: 'bold', fontSize: '14px' }}>
              Set a funding target{' '}
            </p>
            <p
              style={{ color: '#3A1FF5', fontWeight: 'bold', fontSize: '14px' }}
            >
              What is project target ?
            </p>
          </div>
          <div style={{ width: '20%', textAlign: 'right', paddingTop: '10px' }}>
            <Switch
              className="switchFormItemSwitch"
              checked={showFundingFields}
              onChange={checked => {
                setTarget(checked ? '10000' : maxIntStr || '0')
                setShowFundingFields(checked)
              }}
            />
          </div>
        </div>
        <div>
          {showFundingFields && (
            <div>
              <p
                style={{
                  width: '50%',
                  float: 'left',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  height: '30px',
                  lineHeight: '30px',
                }}
              >
                Funding target{' '}
              </p>
              <p
                style={{
                  width: '50%',
                  float: 'left',
                  textAlign: 'right',
                  fontWeight: 'bold',
                  fontSize: '19px',
                }}
              >
                $0 after 0% JBX
              </p>
            </div>
          )}
          {target === maxIntStr && (
            <p className="stepExplain">
              No target: All funds can be distributed by the project, and the
              project will have no overflow. (This is the same as setting the
              target to infinity.)
            </p>
          )}

          {showFundingFields && (
            <div>
              <Input bordered={false} addonAfter={selectAfter} />
              <p style={{ color: '#5F5E61' }}>
                If target is 0: No funds can be distributed by the project, and
                the project's entire balance will be considered overflow.
              </p>
            </div>
          )}

          {/*{showFundingFields && (*/}
          {/*  <p className="stepExplain">*/}
          {/*    If target is 0: No funds can be distributed by the project, and the*/}
          {/*    project's entire balance will be considered overflow.*/}
          {/*  </p>*/}
          {/*)}*/}

          <Divider orientation="right" style={DividerStyle}>
            Duration
          </Divider>
        </div>
        <div style={DivStrategyStyle}>
          <div style={{ width: '80%' }}>
            <p style={{ fontWeight: 'bold', fontSize: '14px' }}>
              Set a funding cycle duration
            </p>
            <p
              style={{ color: '#3A1FF5', fontWeight: 'bold', fontSize: '14px' }}
            >
              What is project duration
            </p>
          </div>
          <div style={{ width: '20%', textAlign: 'right', paddingTop: '10px' }}>
            <Switch
              className="switchFormItemSwitch"
              checked={showFundingDuration}
              onChange={checked => {
                setShowFundingDuration(checked)
              }}
            />
          </div>
        </div>
        {showFundingDuration && (
          <div>
            <p
              style={{
                fontWeight: 'bold',
                fontSize: '14px',
                height: '30px',
                lineHeight: '30px',
              }}
            >
              Funding period
            </p>
            <div className={'long-input'}>
              <Input bordered={false} addonAfter={periodAfter} />
            </div>
            <p style={{ color: '#5F5E61' }}>
              If target is 0: No funds can be distributed by the project, and
              the project's entire balance will be considered overflow.
            </p>
          </div>
        )}
        {!showFundingDuration && (
          <p style={{ color: '#5F5E61' }}>
            If target is 0: No funds can be distributed by the project, and the
            project's entire balance will be considered overflow.
          </p>
        )}
      </Space>
    </Modal>
  )
}
