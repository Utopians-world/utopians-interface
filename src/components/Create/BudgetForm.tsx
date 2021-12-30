import { Button, Divider, Form, Space, Switch, Tooltip } from 'antd'
import { FormItems } from 'components/shared/formItems'
// import { ThemeContext } from 'contexts/themeContext'
import { UserContext } from 'contexts/userContext'
import { constants } from 'ethers'
import { useAppDispatch } from 'hooks/AppDispatch'
import { useEditingFundingCycleSelector } from 'hooks/AppSelector'
import { CurrencyOption } from 'models/currency-option'
import { useContext, useLayoutEffect, useState } from 'react'
import { editingProjectActions } from 'redux/slices/editingProject'
import { fromWad } from 'utils/formatNumber'
import { hasFundingTarget, isRecurring } from 'utils/fundingCycle'

import './index.scss'

export default function BudgetForm({
  initialCurrency,
  initialTarget,
  initialDuration,
  onSave,
  onDeployBtn,
  isDisable,
}: {
  initialCurrency: CurrencyOption
  initialTarget: string
  initialDuration: string
  onSave: (currency: CurrencyOption, target: string, duration: string) => void
  onDeployBtn?: VoidFunction
  isDisable?: boolean
}) {
  // const {
  //   theme: { colors },
  // } = useContext(ThemeContext)
  // State objects avoid antd form input dependency rerendering issues
  const [currency, setCurrency] = useState<CurrencyOption>(0)
  const [target, setTarget] = useState<string>('0')
  const [duration, setDuration] = useState<string>('0')
  const [showFundingFields, setShowFundingFields] = useState<boolean>()
  const editingFC = useEditingFundingCycleSelector()
  // TODO budgetForm should not depend on dispatch
  const dispatch = useAppDispatch()
  const { adminFeePercent } = useContext(UserContext)

  useLayoutEffect(() => {
    setCurrency(initialCurrency)
    setTarget(initialTarget)
    setDuration(initialDuration)
    setShowFundingFields(hasFundingTarget(editingFC))
  }, [editingFC, initialCurrency, initialDuration, initialTarget])

  const maxIntStr = fromWad(constants.MaxUint256)

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div className="stepTopCon">
        <h1>Funding</h1>
        <h2>How your project will earn and manage funds.</h2>
        <Divider className="stepTopConDivider" orientation="right">
          Target
        </Divider>
      </div>

      <Form layout="vertical" className="stepFormCon">
        <Form.Item className="switchFormItem">
          <Space className="switchFormItemSpace">
            <label>Set a funding target</label>
            <Switch
              className="switchFormItemSwitch"
              checked={showFundingFields}
              onChange={checked => {
                setTarget(checked ? '10000' : maxIntStr || '0')
                setCurrency(1)
                setShowFundingFields(checked)
              }}
            />
          </Space>

          <Tooltip
            title={
              <>
                <p>
                  No more than the target can be distributed from the project in
                  a single funding cycle. Whenever a new funding cycle starts,
                  any overflow automatically goes towards that cycle's target
                  amount, acting as a project's runway.
                </p>
                <p>
                  A funding target allows you to redistribute surplus revenue to
                  your community. When a project's balance is greater than its
                  funding target, the overflow (surplus funds) can by redeemed
                  by the community by burning their project tokens.
                </p>
              </>
            }
          >
            <span className="switchFormItemTip">What is project target ?</span>
          </Tooltip>
        </Form.Item>

        {target === maxIntStr && (
          <p className="stepExplain">
            No target: All funds can be distributed by the project, and the
            project will have no overflow. (This is the same as setting the
            target to infinity.)
          </p>
        )}

        {showFundingFields && (
          <FormItems.ProjectTarget
            formItemProps={{
              rules: [{ required: true }],
              extra: null,
            }}
            value={target.toString()}
            onValueChange={val => setTarget(val || '0')}
            currency={currency}
            onCurrencyChange={setCurrency}
            fee={adminFeePercent}
          />
        )}

        {showFundingFields && (
          <p className="stepExplain">
            If target is 0: No funds can be distributed by the project, and the
            project's entire balance will be considered overflow.
          </p>
        )}

        <Divider
          style={{ margin: '40px 0 26px' }}
          className="stepTopConDivider"
          orientation="right"
        >
          Duration
        </Divider>

        <FormItems.ProjectDuration
          value={duration}
          isRecurring={isRecurring(editingFC)}
          onToggleRecurring={() =>
            dispatch(
              editingProjectActions.setIsRecurring(!isRecurring(editingFC)),
            )
          }
          onValueChange={val => setDuration(val ?? '0')}
          formItemProps={{
            rules: [{ required: true }],
          }}
        />

        {duration === '0' && (
          <p className="stepExplain">
            Duration not set: Funding can be reconfigured at any time, which
            will start a new funding cycle.
          </p>
        )}

        <Form.Item className="stepSaveDeployBtnsCon" style={{ marginTop: 20 }}>
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
          <Button
            className="stepSaveBtn"
            htmlType="submit"
            type="primary"
            onClick={() => onSave(currency, target, duration)}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </Space>
  )
}
