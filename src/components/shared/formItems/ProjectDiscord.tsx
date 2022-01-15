import { Form, Input } from 'antd'

import { FormItemExt } from './formItemExt'

export default function ProjectDiscord({
  name,
  hideLabel,
  formItemProps,
}: FormItemExt) {
  return (
    <Form.Item
      name={name}
      label={hideLabel ? undefined : 'Telegram'}
      extra="An invite link to your project's Telegram server."
      {...formItemProps}
    >
      <Input
        placeholder="https://t.me/abcdefgh"
        type="string"
        autoComplete="off"
      />
    </Form.Item>
  )
}
