import { useState } from 'react'
import { Form, Modal, Space, Tooltip } from 'antd'

import ModalTab from '../ProjectsDetail/ModalTab'
import { FormItems } from '../shared/formItems'
import { PayoutMod } from '../../models/mods'
import { useEditingFundingCycleSelector } from '../../hooks/AppSelector'
import { CurrencyOption } from '../../models/currency-option'
import { fromWad } from '../../utils/formatNumber'

export default function DetailEditPayoutModal({
  visible,
  onSuccess,
  onCancel,
}: {
  visible?: boolean
  onSuccess?: VoidFunction
  onCancel?: VoidFunction
}) {
  const [mods, setMods] = useState<PayoutMod[]>([])
  const [loading] = useState<boolean>()
  const editingFC = useEditingFundingCycleSelector()

  // const DivStrategyStyle: CSSProperties = {
  //   border: '2px solid #bdc1e4',
  //   width: '100%',
  //   height: '120px',
  //   borderRadius: '4px',
  //   margin: '0 auto',
  //   display: 'flex',
  //   justifyContent: 'left',
  //   background: '#fdfeff',
  // }
  return (
    <Modal
      title={'Edit payout'}
      visible={visible}
      onCancel={onCancel}
      confirmLoading={loading}
      width={550}
      centered={true}
      cancelText={'CANCEL'}
      okText={'SAVE CHANGES'}
      className="projectModal"
    >
      <Space
        direction="vertical"
        size="large"
        style={{ width: '100%', paddingTop: 0, gap: '20px' }}
        className="payoutModel"
      >
        <ModalTab
          textFirst={'Changes will be applied to the'}
          textSecond={' upcoming '}
          textLast={'funding cycle.'}
        />
        <div>
          <p style={{ marginBottom: 0, color: '#000000' }}>
            Payouts are optional. By default, all unallocated revenue will be
            withdrawable to the project owner's wallet.
          </p>
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
            <p style={{ marginBottom: '5px', color: '#3A1FF5' }}>
              What is project target ?
            </p>
          </Tooltip>
        </div>
        <Form layout="vertical" className="stepFormCon">
          <FormItems.ProjectPayoutMods
            mods={mods}
            target={fromWad(editingFC.target)}
            currency={editingFC.currency.toNumber() as CurrencyOption}
            onModsChanged={setMods}
            fee={editingFC.fee}
          />
        </Form>
      </Space>
    </Modal>
  )
}
