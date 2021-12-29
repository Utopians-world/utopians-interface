import { useState, CSSProperties } from 'react'
import { Modal, Space, Col, Row, Divider, FormInstance } from 'antd'

import ModalTab from '../ProjectsDetail/ModalTab'
import { normalizeHandle } from '../../utils/formatHandle'
import { FormItems } from '../shared/formItems'
import { ProjectFormFields } from '../Create/ProjectForm'
import { ProjectMetadataV3 } from '../../models/project-metadata'

export default function DetailSettingpopupModal({
  form,
  visible,
  handle,
  metadata,
  onSuccess,
  onCancel,
}: {
  form: FormInstance<ProjectFormFields>
  metadata?: ProjectMetadataV3
  handle?: string
  visible?: boolean
  onSuccess?: VoidFunction
  onCancel?: VoidFunction
}) {
  const [loading] = useState<boolean>()
  console.log(metadata)
  const DividerStyle: CSSProperties = {
    color: '#D3DCEE',
    margin: 0,
    fontSize: '12px',
    borderTopColor: '#D3DCEE',
    paddingRight: '15px',
  }
  // const { TextArea } = Input
  if (!metadata) return null
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
        className="ModalForm"
      >
        <ModalTab
          textFirst={'Changes will be applied to the'}
          textSecond={' upcoming '}
          textLast={'funding cycle.'}
        />
        <Row gutter={16}>
          <Col span={12} style={{ height: '100px' }}>
            <Divider orientation="right" style={DividerStyle}>
              Basic information
            </Divider>
            <FormItems.ProjectName
              name="name"
              formItemProps={{
                rules: [{ required: true }],
              }}
              defaultValue={metadata.name}
              onChange={name => {
                const val = name ? normalizeHandle(name) : ''
                form.setFieldsValue({ handle: val })
              }}
            />
          </Col>
          <Col span={12} style={{ height: '100px' }}>
            <Divider orientation="right" style={DividerStyle}>
              Project Social
            </Divider>
            <FormItems.ProjectLink
              name="infoUri"
              defaultValue={metadata.infoUri}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12} style={{ height: '100px' }}>
            <FormItems.ProjectHandleFormItem
              name="handle"
              defaultValue={handle}
              initialValue={form.getFieldValue('handle')}
              requireState="notExist"
              formItemProps={{
                dependencies: ['name'],
              }}
              required
            />
          </Col>
          <Col span={12} style={{ height: '100px' }}>
            <FormItems.ProjectTwitter
              name="twitter"
              defaultValue={metadata.twitter}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <FormItems.ProjectDescription
              name="description"
              defaultValue={metadata.description}
            />
          </Col>
          <Col span={12}>
            <FormItems.ProjectDiscord
              name="discord"
              defaultValue={metadata.discord}
            />
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
            <FormItems.ProjectPayDisclosure
              name="payDisclosure"
              defaultValue={metadata.payDisclosure}
            />
          </Col>
          <Col span={12}>
            <FormItems.ProjectPayButton
              name="payButton"
              defaultValue={metadata.payButton}
            />
          </Col>
        </Row>
      </Space>
    </Modal>
  )
}
