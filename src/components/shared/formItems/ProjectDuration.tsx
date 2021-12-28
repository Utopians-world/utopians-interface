import { Form, Space, Switch, Tooltip } from 'antd'
import { useEffect, useState } from 'react'

import InputAccessoryButton from '../InputAccessoryButton'
import FormattedNumberInput from '../inputs/FormattedNumberInput'
import { FormItemExt } from './formItemExt'

export default function ProjectDuration({
  name,
  formItemProps,
  value,
  isRecurring,
  hideLabel,
  onToggleRecurring,
  onValueChange,
}: {
  value: string | undefined
  isRecurring: boolean | undefined
  onToggleRecurring: VoidFunction
  onValueChange: (val?: string) => void
} & FormItemExt) {
  const [showDurationInput, setShowDurationInput] = useState<boolean>()

  useEffect(() => {
    if (value && value !== '0') setShowDurationInput(true)
  }, [value])

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div className="switchFormItem">
          <Space className="switchFormItemSpace">
            <label>Set a funding cycle duration</label>
            <Switch
              className="switchFormItemSwitch"
              checked={showDurationInput}
              onChange={checked => {
                setShowDurationInput(checked)
                onValueChange(checked ? '30' : '0')
              }}
            />
          </Space>
          <Tooltip
            title={
              <p>
                This duration determines how long your funding cycles will last.
                No more than the target amount (if a target has been set) can be
                distributed by the project in a single funding cycle, and
                funding reconfigurations won't take effect until the start of
                the next funding cycle.
              </p>
            }
          >
            <span className="switchFormItemTip">
              What is project duration ?
            </span>
          </Tooltip>
        </div>

        <Form.Item
          extra="How long one funding cycle will last. Changes to upcoming funding cycles will only take effect once the current cycle has ended."
          name={name}
          label={hideLabel ? undefined : 'Funding period'}
          {...formItemProps}
          style={{ display: showDurationInput ? 'block' : 'none' }}
        >
          <FormattedNumberInput
            placeholder="30"
            value={value}
            suffix="days"
            onChange={onValueChange}
            min={1}
            accessory={
              <InputAccessoryButton
                content={isRecurring ? 'recurring' : 'onetime'}
                withArrow={true}
                onClick={onToggleRecurring}
              />
            }
          />
        </Form.Item>
      </Space>
    </div>
  )
}
