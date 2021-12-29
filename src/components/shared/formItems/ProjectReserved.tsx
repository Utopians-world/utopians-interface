import { Form } from 'antd'
import { InfoCircleFilled } from '@ant-design/icons'

import NumberSlider from '../inputs/NumberSlider'
import { FormItemExt } from './formItemExt'

export default function ProjectReserved({
  name,
  hideLabel,
  formItemProps,
  value,
  onChange,
}: {
  value: number | undefined
  onChange: (val?: number) => void
} & FormItemExt) {
  return (
    <Form.Item
      className="stepModalCon"
      extra={
        <div className="stepExtraCon">
          <InfoCircleFilled
            style={{ color: '#000', fontSize: '20px', marginRight: '10px' }}
          />
          Whenever someone pays your project, this percentage of tokens will be
          reserved and the rest will go to the payer. Reserve tokens are
          reserved for the project owner by default, but can also be allocated
          to other wallet addresses by the owner. Once tokens are reserved,
          anyone can "mint" them, which distributes them to their intended
          receivers.
        </div>
      }
      name={name}
      label={hideLabel ? undefined : 'Reserved tokens'}
      {...formItemProps}
    >
      <NumberSlider
        sliderValue={value}
        suffix="%"
        onChange={onChange}
        step={0.5}
      />
    </Form.Item>
  )
}
