import { Button, Form, FormInstance, Space, Divider } from 'antd'
import { FormItems } from 'components/shared/formItems'
import { normalizeHandle } from 'utils/formatHandle'
import { cidFromUrl, unpinIpfsFileByCid } from 'utils/ipfs'

import './index.scss'

export type ProjectFormFields = {
  name: string
  description: string
  infoUri: string
  handle: string
  logoUri: string
  twitter: string
  discord: string
  payButton: string
  payDisclosure: string
}

export default function ProjectForm({
  form,
  onSave,
}: {
  form: FormInstance<ProjectFormFields>
  onSave: VoidFunction
}) {
  return (
    <Space direction="vertical" size="large">
      <div className="stepTopCon">
        <h1>Appearance</h1>
        <h2>Project name, handle, links, and other details.</h2>
        <Divider className="stepTopConDivider" orientation="right">
          Basic information
        </Divider>
      </div>

      <Form form={form} layout="vertical" className="stepFormCon">
        <FormItems.ProjectName
          name="name"
          formItemProps={{
            rules: [{ required: true }],
          }}
          onChange={name => {
            const val = name ? normalizeHandle(name) : ''
            // Use `handle` state to enable ProjectHandle to validate while typing
            form.setFieldsValue({ handle: val })
          }}
        />
        <FormItems.ProjectHandleFormItem
          name="handle"
          initialValue={form.getFieldValue('handle')}
          requireState="notExist"
          formItemProps={{
            dependencies: ['name'],
          }}
          required
        />
        <FormItems.ProjectDescription name="description" />
        <FormItems.ProjectPayDisclosure name="payDisclosure" />
        <FormItems.ProjectLogoUri
          name="logoUri"
          initialUrl={form.getFieldValue('logoUri')}
          onSuccess={logoUri => {
            const prevUrl = form.getFieldValue('logoUri')
            // Unpin previous file
            form.setFieldsValue({ logoUri })
            if (prevUrl) unpinIpfsFileByCid(cidFromUrl(prevUrl))
          }}
        />
        <Divider className="stepTopConDivider" orientation="right">
          Project Social
        </Divider>

        <FormItems.ProjectLink name="infoUri" />
        <FormItems.ProjectTwitter name="twitter" />
        <FormItems.ProjectDiscord name="discord" />
        <Divider className="stepTopConDivider" orientation="right">
          Custom
        </Divider>

        <FormItems.ProjectPayButton name="payButton" />
        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            className="stepSaveBtn"
            onClick={async () => {
              await form.validateFields()
              onSave()
            }}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </Space>
  )
}
