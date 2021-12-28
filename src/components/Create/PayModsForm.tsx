import { Button, Form, Space, Divider, Tooltip } from 'antd'
import { FormItems } from 'components/shared/formItems'
// import { ThemeContext } from 'contexts/themeContext'
import { BigNumber } from 'ethers'
import { CurrencyOption } from 'models/currency-option'
import { PayoutMod } from 'models/mods'
import { useLayoutEffect, useState } from 'react'
import { fromWad } from 'utils/formatNumber'

import './index.scss'

export default function PayModsForm({
  initialMods,
  currency,
  target,
  fee,
  onSave,
}: {
  initialMods: PayoutMod[]
  currency: CurrencyOption
  target: BigNumber
  fee: BigNumber | undefined
  onSave: (mods: PayoutMod[]) => void
}) {
  // State objects avoid antd form input dependency rerendering issues
  const [mods, setMods] = useState<PayoutMod[]>([])

  // const {
  //   theme: { colors },
  // } = useContext(ThemeContext)

  useLayoutEffect(() => {
    setMods(initialMods)
  }, [initialMods])

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div className="stepTopCon">
        <h1>Distribution</h1>
        <h2>How your project will distribute funds.</h2>
        <Divider className="stepTopConDivider" />
      </div>
      <p>
        Payouts are optional. By default, all unallocated revenue will be
        withdrawable to the project owner's wallet.
        <Tooltip
          title={
            <p>
              Payouts let you commit portions of every withdrawal to other
              Ethereum wallets or Juicebox projects. Use this to pay
              contributors, charities, other projects you depend on, or anyone
              else. Payouts will be distributed automatically whenever a
              withdrawal is made from your project.
            </p>
          }
        >
          <span className="stepTooltip">What is project target ?</span>
        </Tooltip>
      </p>

      <Form layout="vertical" className="stepFormCon">
        <FormItems.ProjectPayoutMods
          mods={mods}
          target={fromWad(target)}
          currency={currency}
          onModsChanged={setMods}
          fee={fee}
        />
        <Form.Item>
          <Button
            className="stepSaveBtn"
            style={{ marginTop: 20 }}
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
