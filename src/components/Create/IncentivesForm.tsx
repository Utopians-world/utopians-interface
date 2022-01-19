import { Button, Form, Space, Divider } from 'antd'
import { InfoCircleFilled } from '@ant-design/icons'
import { FormItems } from 'components/shared/formItems'
import { ThemeContext } from 'contexts/themeContext'
import {
  CSSProperties,
  useContext,
  useLayoutEffect,
  useState,
  useEffect,
} from 'react'

import './index.scss'

export type IncentivesFormFields = {
  discountRate: string
  bondingCurveRate: string
}

export default function IncentivesForm({
  initialDiscountRate,
  initialBondingCurveRate,
  disableBondingCurve,
  disableDiscountRate,
  onSave,
  onDeployBtn,
  isDisable,
}: {
  initialDiscountRate: string
  initialBondingCurveRate: string
  disableBondingCurve?: string
  disableDiscountRate?: string
  onSave: (discountRate: string, bondingCurveRate: string) => void
  onDeployBtn?: VoidFunction
  isDisable?: boolean
}) {
  const [discountRate, setDiscountRate] = useState<string>()
  const [bondingCurveRate, setBondingCurveRate] = useState<string>()
  const {
    theme: { colors },
  } = useContext(ThemeContext)

  useLayoutEffect(() => {
    setDiscountRate(initialDiscountRate)
    setBondingCurveRate(initialBondingCurveRate)
  }, [initialBondingCurveRate, initialDiscountRate])

  useEffect(() => {
    if (discountRate === undefined || bondingCurveRate === undefined) return
    console.log(discountRate, 'discountRate')
    console.log(bondingCurveRate, 'bondingCurveRate')
    onSave(discountRate, bondingCurveRate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discountRate, bondingCurveRate])

  const saveButton = (
    <Form.Item className="stepSaveDeployBtnsCon">
      {onDeployBtn && (
        <Button
          htmlType="submit"
          type="primary"
          className="stepDeployBtn"
          onClick={() => {
            onDeployBtn()
          }}
          disabled={isDisable}
        >
          deploy Project
        </Button>
      )}
      {/* <Button
        style={{display: 'none'}}
        className="stepSaveBtn"
        htmlType="submit"
        type="primary"
        onClick={() => {
          if (discountRate === undefined || bondingCurveRate === undefined)
            return
          onSave(discountRate, bondingCurveRate)
        }}
      >
        Save
      </Button> */}
    </Form.Item>
  )

  const disableTextStyle: CSSProperties = {
    color: colors.text.primary,
    fontWeight: 500,
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div className="stepTopCon">
        <h1>Incentives</h1>
        <h2>Adjust incentivizes for paying your project.</h2>
        <Divider className="stepTopConDivider" />
      </div>

      <Form layout="vertical" className="stepFormCon">
        <div style={{ marginBottom: '20px' }}>
          The ratio of tokens rewarded per payment amount will decrease by this
          percentage with each new funding cycle. A higher discount rate will
          incentivize supporters to pay your project earlier than later.
        </div>
        <FormItems.ProjectDiscountRate
          name="discountRate"
          value={discountRate?.toString() ?? '0'}
          onChange={(val?: number) => setDiscountRate(val?.toString())}
          disabled={!!disableDiscountRate}
        />
        {disableDiscountRate && (
          <div className="stepExtraCon" style={disableTextStyle}>
            <InfoCircleFilled
              style={{ color: '#000', fontSize: '20px', marginRight: '10px' }}
            />
            {disableDiscountRate}
          </div>
        )}
        <Divider
          className="stepTopConDivider"
          style={{ margin: '40px 0 26px' }}
        />
        <div style={{ marginBottom: '20px' }}>
          This rate determines the amount of overflow that each token can be
          redeemed for at any given time. On a lower bonding curve, redeeming a
          token increases the value of each remaining token, creating an
          incentive to hodl tokens longer than others. A bonding curve of 100%
          means all tokens will have equal value regardless of when they are
          redeemed.
        </div>
        <FormItems.ProjectBondingCurveRate
          name="bondingCurveRate"
          value={bondingCurveRate?.toString() ?? '0'}
          onChange={(val?: number) => setBondingCurveRate(val?.toString())}
          disabled={!!disableBondingCurve}
          disableBondingCurve={disableBondingCurve}
        />
        {saveButton}
      </Form>
    </Space>
  )
}
