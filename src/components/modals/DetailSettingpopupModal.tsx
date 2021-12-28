import { CSSProperties, useState } from 'react'
import { Modal, Space, Col, Row, Input, Divider } from 'antd'
import ModalTab from '../ProjectsDetail/ModalTab'

export default function DetailSettingpopupModal({
  visible,
  onSuccess,
  onCancel,
}: {
  visible?: boolean
  onSuccess?: VoidFunction
  onCancel?: VoidFunction
}) {
  const [loading] = useState<boolean>()
  const InputStyle: CSSProperties = {
    width: '95%',
    height: '42px',
    borderRadius: '5px',
    border: '2px solid #bdc1e4',
    padding: '0 15px',
  }
  const TextAreaStyle: CSSProperties = {
    width: '95%',
    height: '100px',
    borderRadius: '5px',
    border: '2px solid #bdc1e4',
    padding: '5px 15px',
  }
  const DividerStyle: CSSProperties = {
    color: '#D3DCEE',
    margin: 0,
    fontSize: '12px',
    borderTopColor: '#D3DCEE',
    paddingRight: '15px',
  }
  const { TextArea } = Input
  return (
    <Modal
      title={'Edit Appearance'}
      visible={visible}
      onCancel={onCancel}
      confirmLoading={loading}
      width={1080}
      centered={true}
      bodyStyle={{ background: '#ffffff' }}
      cancelText={'CANCEL'}
      okText={'SAVE CHANGES'}
    >
      <Space
        direction="vertical"
        size="large"
        style={{ width: '100%', paddingTop: 0, gap: '10px' }}
      >
        <ModalTab
          textFirst={'Changes will be applied to the'}
          textSecond={' upcoming '}
          textLast={'funding cycle.'}
        />
        <Row gutter={16}>
          <Col span={12}>
            <Divider orientation="right" style={DividerStyle}>
              Basic information
            </Divider>
            <p>
              Project name
              <span style={{ color: '#FE5164', marginLeft: '3px' }}>*</span>
            </p>
            <Input style={InputStyle} placeholder="Project name" />
          </Col>
          <Col span={12}>
            <Divider orientation="right" style={DividerStyle}>
              Project Social
            </Divider>
            <p>Project Website</p>
            <Input style={InputStyle} placeholder="http://" />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <p>
              Unique handle
              <span style={{ color: '#FE5164', marginLeft: '3px' }}>*</span>
            </p>
            <Input style={InputStyle} prefix="@" placeholder="Unique handle" />
          </Col>
          <Col span={12}>
            <p>Twitter</p>
            <Input style={InputStyle} prefix="@" placeholder="Unique handle" />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <p>Project description</p>
            <TextArea
              rows={4}
              style={TextAreaStyle}
              placeholder="Utopians dao"
            />
          </Col>
          <Col span={12}>
            <p>Discord</p>
            <Input style={InputStyle} placeholder="http:// discord.gg/ XXX" />
            <div style={{ fontSize: '12px', color: '#5F5E61', width: '95%' }}>
              An invite link to your project's Discord server.
            </div>
            <Divider
              orientation="right"
              style={{
                color: '#D3DCEE',
                margin: '22px 0 0 0',
                fontSize: '12px',
                borderTopColor: '#D3DCEE',
                paddingRight: '15px',
              }}
            >
              Custom
            </Divider>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <p>Pay disclosure </p>
            <TextArea rows={4} style={TextAreaStyle} />
          </Col>
          <Col span={12}>
            <p>Pay button text</p>
            <Input style={InputStyle} placeholder="http:// discord.gg/ XXX" />
            <div style={{ fontSize: '12px', color: '#5F5E61', width: '95%' }}>
              Text displayed on your project's "pay" button. Leave this blank to
              use the default.
            </div>
          </Col>
        </Row>
      </Space>
    </Modal>
  )
}
