import { ReactNode, useState } from 'react'
import { Popover } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

export default function Upopover({
  children,
  content,
}: {
  children?: ReactNode
  content?: ReactNode
}) {
  const [visible, setvisible] = useState(false)

  return (
    <Popover
      title={
        <CloseOutlined
          style={{ color: '#ffffff' }}
          onClick={() => {
            setvisible(false)
          }}
        />
      }
      content={content}
      trigger="click"
      visible={visible}
      onVisibleChange={() => {
        setvisible(!visible)
      }}
    >
      {children}
    </Popover>
  )
}
