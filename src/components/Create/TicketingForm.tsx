import { Button, Form, FormInstance, Space, Divider } from 'antd'
import { FormItems } from 'components/shared/formItems'
// import { ThemeContext } from 'contexts/themeContext'
import { TicketMod } from 'models/mods'
import { useLayoutEffect, useState } from 'react'

import './index.scss'

export type TicketingFormFields = {
  reserved: number
}

export default function TicketingForm({
  form,
  initialMods,
  onSave,
  onDeployBtn,
  isDisable,
}: {
  form: FormInstance<TicketingFormFields>
  initialMods: TicketMod[]
  onSave: (mods: TicketMod[]) => void
  onDeployBtn?: VoidFunction
  isDisable?: boolean
}) {
  const [mods, setMods] = useState<TicketMod[]>([])

  // const {
  //   theme: { colors },
  // } = useContext(ThemeContext)

  useLayoutEffect(() => {
    setMods(initialMods)
  }, [initialMods])

  return (
    <Space direction="vertical" size="large">
      <div className="stepTopCon">
        <h1>Reserved tokens</h1>
        <h2>Reward specific community members with tokens.</h2>
        <Divider className="stepTopConDivider" orientation="right">
          Reserve percentage
        </Divider>
      </div>

      <p>
        Tokens are earned by anyone who pays your project, and can be redeemed
        for overflow if your project has set a funding target.
        <br />
        <br />
        You'll be able to issue ERC-20 tokens once your project contract has
        been deployed. Until then, the protocol will track token balances,
        allowing your supporters to earn tokens and redeem for overflow in the
        meantime.
      </p>

      <Form form={form} layout="vertical" className="stepFormCon">
        <FormItems.ProjectReserved
          value={form.getFieldValue('reserved')}
          onChange={(val?: number) => form.setFieldsValue({ reserved: val })}
        />
        <Divider className="stepTopConDivider" orientation="right">
          Allocate
        </Divider>
        <p>
          Allocate reserved tokens is optional. By default, automatically
          distribute a portion of your project's reserved tokens to other
          utopians projects or ETH wallets.
        </p>
        <FormItems.ProjectTicketMods
          name="ticketMods"
          mods={mods}
          onModsChanged={setMods}
          // formItemProps={{
          //   label: 'Allocate reserved tokens (optional)',
          //   extra:
          //     "Automatically distribute a portion of your project's reserved tokens to other Utopians projects or METIS wallets.",
          // }}
        />
        <Form.Item className="stepSaveDeployBtnsCon">
          {onDeployBtn && (
            <Button
              htmlType="submit"
              type="primary"
              className="stepDeployBtn"
              onClick={() => {
                onDeployBtn()
              }}
              disabled={isDisable}
            >
              deploy Project
            </Button>
          )}
          <Button
            className="stepSaveBtn"
            htmlType="submit"
            type="primary"
            onClick={() => onSave(mods)}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </Space>
  )
}
