import { useContext, useLayoutEffect, useState } from 'react'
import { Form, Modal, Space, Tooltip } from 'antd'

import { BigNumber } from '@ethersproject/bignumber'

import { constants } from 'ethers'

import ModalTab from '../ProjectsDetail/ModalTab'
import { FormItems } from '../shared/formItems'
import { PayoutMod, TicketMod } from '../../models/mods'
import { useEditingFundingCycleSelector } from '../../hooks/AppSelector'
import { CurrencyOption } from '../../models/currency-option'
import { fromWad } from '../../utils/formatNumber'

import { UserContext } from '../../contexts/userContext'
import { FCProperties } from '../../models/funding-cycle-properties'
import { FCMetadata } from '../../models/funding-cycle'

export default function DetailEditPayoutModal({
  visible,
  onSuccess,
  onCancel,
  initialMods,
  projectId,
  ticketMods,
}: {
  visible?: boolean
  onSuccess?: VoidFunction
  onCancel: VoidFunction
  initialMods: PayoutMod[]
  ticketMods: TicketMod[]
  projectId?: BigNumber
}) {
  const [mods, setMods] = useState<PayoutMod[]>([])
  const editingFC = useEditingFundingCycleSelector()
  const { transactor, contracts } = useContext(UserContext)
  const [loading, setLoading] = useState<boolean>()
  const [editingPayoutMods, setEditingPayoutMods] = useState<PayoutMod[]>([])
  const onPayModsFormSaved = (mods: PayoutMod[]) => setEditingPayoutMods(mods)
  useLayoutEffect(() => {
    setMods(initialMods)
  }, [initialMods])
  async function updatePayout(mods: PayoutMod[]) {
    if (!transactor || !contracts?.TerminalV1 || !projectId) return

    setLoading(true)

    const properties: Record<keyof FCProperties, string> = {
      target: editingFC.target.toHexString(),
      currency: editingFC.currency.toHexString(),
      duration: editingFC.duration.toHexString(),
      discountRate: editingFC.discountRate.toHexString(),
      cycleLimit: BigNumber.from(0).toHexString(),
      ballot: editingFC.ballot,
    }

    const metadata: Omit<FCMetadata, 'version'> = {
      reservedRate: editingFC.reserved.toNumber(),
      bondingCurveRate: editingFC.bondingCurveRate.toNumber(),
      reconfigurationBondingCurveRate: editingFC.bondingCurveRate.toNumber(),
    }

    transactor(
      contracts.TerminalV1,
      'configure',
      [
        projectId.toHexString(),
        properties,
        metadata,
        editingPayoutMods.map(m => ({
          preferUnstaked: false,
          percent: BigNumber.from(m.percent).toHexString(),
          lockedUntil: BigNumber.from(m.lockedUntil ?? 0).toHexString(),
          beneficiary: m.beneficiary || constants.AddressZero,
          projectId: m.projectId || BigNumber.from(0).toHexString(),
          allocator: constants.AddressZero,
        })),
        mods.map(m => ({
          preferUnstaked: false,
          percent: BigNumber.from(m.percent).toHexString(),
          lockedUntil: BigNumber.from(m.lockedUntil ?? 0).toHexString(),
          beneficiary: m.beneficiary || constants.AddressZero,
          allocator: constants.AddressZero,
        })),
      ],
      {
        onDone: () => {
          onPayModsFormSaved(mods)
          setLoading(false)
          onCancel()
        },
      },
    )
  }

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
      onOk={() => {
        updatePayout(mods)
      }}
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
                Ethereum wallets or Utopians projects. Use this to pay
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
