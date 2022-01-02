import { Form, Input } from 'antd'

import { FormItemExt } from './formItemExt'

export default function ProjectTwitter({
  name,
  hideLabel,
  formItemProps,
  defaultValue,
}: FormItemExt) {
  return (
    <Form.Item
      name={name}
      label={hideLabel ? undefined : 'Twitter'}
      extra="Your project's Twitter handle."
      {...formItemProps}
    >
      <Input
        prefix="@"
        placeholder="UtopiansMETIS"
        type="string"
        autoComplete="off"
        defaultValue={defaultValue}
      />
    </Form.Item>
  )
}
