import { InfoCircleOutlined } from '@ant-design/icons'
import { BigNumber } from '@ethersproject/bignumber'
import { Button, Form, Input, Modal, Space, Tooltip } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { UserContext } from 'contexts/userContext'
import { useContext, useState } from 'react'

export default function IssueTickets({
  projectId,
}: {
  projectId: BigNumber | undefined
}) {
  const { transactor, contracts } = useContext(UserContext)
  const [modalVisible, setModalVisible] = useState<boolean>()
  const [loading, setLoading] = useState<boolean>()
  const [form] = useForm<{ name: string; symbol: string }>()

  const issue = async () => {
    await form.validateFields()
    if (!projectId || !transactor || !contracts) return

    setLoading(true)

    const fields = form.getFieldsValue(true)

    transactor(
      contracts.TicketBooth,
      'issue',
      [projectId.toHexString(), fields.name, fields.symbol],
      {
        onDone: () => {
          setLoading(false)
          setModalVisible(false)
        },
      },
    )
  }

  return (
    <div style={{ marginTop: '10px' }}>
      <Space align="end">
        <Button
          className={'button-spec'}
          style={{ width: 'auto', lineHeight: 'normal' }}
          loading={loading}
          onClick={() => setModalVisible(true)}
        >
          Issue ERC-20 token
        </Button>
        <Tooltip
          title="Issue an ERC-20 to be used as this project's token. Once
          issued, current staked token holders will be able to claim their
          balance in the new token."
        >
          <InfoCircleOutlined style={{ color: undefined }} />
        </Tooltip>
      </Space>
      <Modal
        visible={modalVisible}
        title="Issue ERC-20 token"
        okText="Issue token"
        onOk={issue}
        onCancel={() => setModalVisible(false)}
      >
        <Space
          direction="vertical"
          size="large"
          style={{ width: '100%', paddingTop: 0, gap: '20px' }}
        >
          <div>
            <div
              style={{
                fontFamily: 'TeXGyreAdventor-Regular',
                fontSize: '12px',
                marginBottom: '20px',
              }}
            >
              Issue an ERC-20 token for this project. once issued, current
              staked token holders will be able to claim their exsting balance
              in the new token
            </div>
            <Form form={form} layout="vertical">
              <Form.Item
                name="name"
                label="Token name"
                rules={[{ required: true, message: 'Token name is required' }]}
              >
                <Input
                  style={{
                    width: '100%',
                    height: '42px',
                    borderRadius: '5px',
                    border: '2px solid #bdc1e4',
                    padding: '0 15px',
                    marginTop: '5px',
                  }}
                  placeholder={'Project Token'}
                />
              </Form.Item>
              <Form.Item
                name="symbol"
                label="Token symbol"
                rules={[
                  { required: true, message: 'Token symbol is required' },
                ]}
              >
                <Input
                  style={{
                    width: '100%',
                    height: '42px',
                    borderRadius: '5px',
                    border: '2px solid #bdc1e4',
                    padding: '0 15px',
                    marginTop: '5px',
                  }}
                  placeholder="PRJ"
                  onChange={e =>
                    form.setFieldsValue({
                      symbol: e.target.value.toUpperCase(),
                    })
                  }
                />
              </Form.Item>
            </Form>
          </div>
        </Space>
      </Modal>
    </div>
  )
}
