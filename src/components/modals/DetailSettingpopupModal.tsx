import { useState, CSSProperties, useContext, useEffect } from 'react'
import { Modal, Space, Col, Row, Divider, FormInstance, Form } from 'antd'

import { BigNumber } from '@ethersproject/bignumber'

import { useForm } from 'antd/lib/form/Form'

import ModalTab from '../ProjectsDetail/ModalTab'
import { normalizeHandle } from '../../utils/formatHandle'
import { FormItems } from '../shared/formItems'
import { ProjectFormFields } from '../Create/ProjectForm'
import { ProjectMetadataV3 } from '../../models/project-metadata'
import {
  cidFromUrl,
  editMetadataForCid,
  logoNameForHandle,
  metadataNameForHandle,
  uploadProjectMetadata,
} from '../../utils/ipfs'
import { UserContext } from '../../contexts/userContext'

import { HandleFormFields, ProjectInfoFormFields } from './EditProjectModal'

export default function DetailSettingpopupModal({
  form,
  projectId,
  visible,
  handle,
  metadata,
  onSuccess,
  onCancel,
}: {
  form: FormInstance<ProjectFormFields>
  metadata?: ProjectMetadataV3
  projectId: BigNumber
  handle?: string
  visible?: boolean
  onSuccess?: VoidFunction
  onCancel?: VoidFunction
}) {
  const { transactor, contracts } = useContext(UserContext)
  const [loadingSetURI, setLoadingSetURI] = useState<boolean>()
  const [projectInfoForm] = useForm<ProjectInfoFormFields>()
  const [handleForm] = useForm<HandleFormFields>()
  const DividerStyle: CSSProperties = {
    color: '#D3DCEE',
    margin: 0,
    fontSize: '12px',
    borderTopColor: '#D3DCEE',
    paddingRight: '15px',
  }

  useEffect(() => {
    if (metadata) {
      projectInfoForm.setFieldsValue({
        name: metadata?.name,
        infoUri: metadata?.infoUri,
        logoUri: metadata?.logoUri,
        twitter: metadata?.twitter,
        discord: metadata?.discord,
        description: metadata?.description,
        payButton: metadata?.payButton,
        payDisclosure: metadata?.payDisclosure,
      })
    }

    if (handle) {
      handleForm.setFieldsValue({ handle })
    }
  }, [handleForm, handle, projectInfoForm, metadata])

  async function setUri() {
    if (!transactor || !contracts?.TerminalV1 || !handle) return

    setLoadingSetURI(true)

    const fields = projectInfoForm.getFieldsValue(true)

    const uploadedMetadata = await uploadProjectMetadata({
      name: fields.name,
      description: fields.description,
      logoUri: fields.logoUri,
      infoUri: fields.infoUri,
      twitter: fields.twitter,
      discord: fields.discord,
      payButton: fields.payButton,
      payDisclosure: fields.payDisclosure,
      tokens: metadata?.tokens ?? [],
    })

    if (!uploadedMetadata?.success) {
      setLoadingSetURI(false)
      return
    }

    transactor(
      contracts.Projects,
      'setUri',
      [projectId.toHexString(), uploadedMetadata.cid],
      {
        onDone: () => setLoadingSetURI(false),
        onConfirmed: () => {
          if (onSuccess) onSuccess()

          // Set name for new metadata file
          editMetadataForCid(uploadedMetadata.cid, {
            name: metadataNameForHandle(handle),
          })

          // If logo changed
          if (metadata?.logoUri !== fields.logoUri) {
            // Set name for new logo file
            editMetadataForCid(cidFromUrl(fields.logoUri), {
              name: logoNameForHandle(handle),
            })
          }

          projectInfoForm.resetFields()
        },
      },
    )
  }

  // const { TextArea } = Input
  if (!metadata) return null
  return (
    <Modal
      title={'Edit Appearance'}
      visible={visible}
      onCancel={onCancel}
      confirmLoading={loadingSetURI}
      width={1080}
      centered={true}
      bodyStyle={{ background: '#ffffff' }}
      cancelText={'CANCEL'}
      okText={'SAVE CHANGES'}
      className="projectModal"
      onOk={setUri}
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
        <Form>
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
        </Form>
      </Space>
    </Modal>
  )
}
