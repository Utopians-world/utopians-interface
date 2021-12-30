import { useContext, useLayoutEffect, useState } from 'react'
import { Modal, Space, Switch, Divider, Tooltip, Form } from 'antd'
import { constants } from 'ethers'

import { fromWad } from '../../utils/formatNumber'
import { CurrencyOption } from '../../models/currency-option'
import { UserContext } from '../../contexts/userContext'
import { hasFundingTarget, isRecurring } from '../../utils/fundingCycle'
import { editingProjectActions } from '../../redux/slices/editingProject'
import { useEditingFundingCycleSelector } from '../../hooks/AppSelector'
import { useAppDispatch } from '../../hooks/AppDispatch'
import { FormItems } from '../shared/formItems'
import ModalTab from '../ProjectsDetail/ModalTab'
// import {FormItems} from "../shared/formItems";
// import {UserContext} from "../../contexts/userContext";

export default function DetailEditFundingModal({
  visible,
  onSuccess,
  onCancel,
  initialCurrency,
  initialTarget,
  initialDuration,
}: {
  initialCurrency: CurrencyOption
  initialTarget: string
  initialDuration: string
  visible?: boolean
  onSuccess?: VoidFunction
  onCancel?: VoidFunction
}) {
  const [loading] = useState<boolean>()
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

  useLayoutEffect(() => {
    setCurrency(initialCurrency)
    setTarget(initialTarget)
    setDuration(initialDuration)
    setShowFundingFields(hasFundingTarget(editingFC))
  }, [editingFC, initialCurrency, initialDuration, initialTarget])

  return (
    <Modal
      title={'Edit funding'}
      visible={visible}
      onCancel={onCancel}
      confirmLoading={loading}
      width={530}
      centered={true}
      cancelText={'CANCEL'}
      okText={'SAVE CHANGES'}
      className="projectModal"
    >
      <ModalTab
        textFirst={'Changes will be applied to the'}
        textSecond={' upcoming '}
        textLast={'funding cycle.'}
      />
      <Space
        direction="vertical"
        size="large"
        style={{ width: '100%', marginTop: '20px' }}
        className="fundingSet"
      >
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
                    No more than the target can be distributed from the project
                    in a single funding cycle. Whenever a new funding cycle
                    starts, any overflow automatically goes towards that cycle's
                    target amount, acting as a project's runway.
                  </p>
                  <p>
                    A funding target allows you to redistribute surplus revenue
                    to your community. When a project's balance is greater than
                    its funding target, the overflow (surplus funds) can by
                    redeemed by the community by burning their project tokens.
                  </p>
                </>
              }
            >
              <span className="switchFormItemTip">
                What is project target ?
              </span>
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
              If target is 0: No funds can be distributed by the project, and
              the project's entire balance will be considered overflow.
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
        </Form>
      </Space>
    </Modal>
  )
}
