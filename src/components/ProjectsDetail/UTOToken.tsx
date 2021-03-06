import React, { useContext, useLayoutEffect, useState } from 'react'
import { Space } from 'antd'

import { BigNumber } from '@ethersproject/bignumber'

import { useForm } from 'antd/lib/form/Form'

import { constants } from 'ethers'

import useContractReader from '../../hooks/ContractReader'

import { ContractName } from '../../models/contract-name'
import { bigNumbersDiff } from '../../utils/bigNumbersDiff'
import { ProjectContext } from '../../contexts/projectContext'
import { decodeFCMetadata, hasFundingTarget } from '../../utils/fundingCycle'
import {
  formatWad,
  fromPerbicent,
  fromPermille,
  parsePerbicent,
  parsePermille,
} from '../../utils/formatNumber'
import DetailIncentivesModal from '../modals/DetailIncentivesModal'
import { useEditingFundingCycleSelector } from '../../hooks/AppSelector'
import TooltipLabel from '../shared/TooltipLabel'
import ParticipantsModal from '../modals/ParticipantsModal'
import { editingProjectActions } from '../../redux/slices/editingProject'
import { useAppDispatch } from '../../hooks/AppDispatch'
import { serializeFundingCycle } from '../../utils/serializers'

import { TicketingFormFields } from '../Create/TicketingForm'
import { FCMetadata, FundingCycle } from '../../models/funding-cycle'
import { UserContext } from '../../contexts/userContext'
import { PayoutMod, TicketMod } from '../../models/mods'
import FormattedAddress from '../shared/FormattedAddress'

import { FCProperties } from '../../models/funding-cycle-properties'
import DetailEditShow from './DetailEditShow'

export default function UTOToken({
  payoutMods,
  ticketMods,
  fundingCycle,
}: {
  payoutMods: PayoutMod[]
  ticketMods: TicketMod[]
  fundingCycle: FundingCycle | undefined
}) {
  const { projectId, currentFC, tokenAddress } = useContext(ProjectContext)
  const { transactor, contracts } = useContext(UserContext)
  const [DetailIssueVisible, setDetailIssueVisible] = useState<boolean>(false)
  const [DetailIncentiveVisible, setDetailIncentiveVisible] =
    useState<boolean>(false)

  const metadata = decodeFCMetadata(currentFC?.metadata)
  const editingFC = useEditingFundingCycleSelector()
  const dispatch = useAppDispatch()
  const [ticketingForm] = useForm<TicketingFormFields>()
  const reservedTicketBalance = useContractReader<BigNumber>({
    contract: ContractName.TerminalV1,
    functionName: 'reservedTicketBalanceOf',
    args:
      projectId && metadata?.reservedRate
        ? [projectId, metadata.reservedRate]
        : null,
    valueDidChange: bigNumbersDiff,
  })

  const onIncentivesFormSaved = (
    discountRate: string,
    bondingCurveRate: string,
  ) => {
    dispatch(editingProjectActions.setDiscountRate(discountRate))
    dispatch(editingProjectActions.setBondingCurveRate(bondingCurveRate))
  }
  const [loading, setLoading] = useState<boolean>()

  const totalSupply = useContractReader<BigNumber>({
    contract: ContractName.TicketBooth,
    functionName: 'totalSupplyOf',
    args: projectId ? [projectId?.toHexString()] : null,
    valueDidChange: bigNumbersDiff,
  })?.add(reservedTicketBalance ? reservedTicketBalance : BigNumber.from(0))

  const ticketsIssued = tokenAddress
    ? tokenAddress !== constants.AddressZero
    : false

  useLayoutEffect(() => {
    if (!fundingCycle) return
    const metadata = decodeFCMetadata(fundingCycle.metadata)
    if (!metadata) return
    dispatch(
      editingProjectActions.setFundingCycle(
        serializeFundingCycle({
          ...fundingCycle,
          reserved: BigNumber.from(metadata.reservedRate),
          bondingCurveRate: BigNumber.from(metadata.bondingCurveRate),
        }),
      ),
    )
    ticketingForm.setFieldsValue({
      reserved: parseFloat(fromPerbicent(metadata.reservedRate)),
    })
  }, [dispatch, fundingCycle, ticketingForm])

  async function updateToken(discountRate: string, bondingCurveRate: string) {
    if (!transactor || !contracts?.TerminalV1 || !fundingCycle || !projectId)
      return

    setLoading(true)

    const properties: Record<keyof FCProperties, string> = {
      target: editingFC.target.toHexString(),
      currency: editingFC.currency.toHexString(),
      duration: editingFC.duration.toHexString(),
      discountRate: parsePermille(discountRate).toHexString(),
      cycleLimit: BigNumber.from(0).toHexString(),
      ballot: editingFC.ballot,
    }

    const metadata: Omit<FCMetadata, 'version'> = {
      reservedRate: editingFC.reserved.toNumber(),
      bondingCurveRate: parsePerbicent(bondingCurveRate).toNumber(),
      reconfigurationBondingCurveRate:
        parsePerbicent(bondingCurveRate).toNumber(),
    }

    transactor(
      contracts.TerminalV1,
      'configure',
      [
        projectId.toHexString(),
        properties,
        metadata,
        payoutMods.map(m => ({
          preferUnstaked: false,
          percent: BigNumber.from(m.percent).toHexString(),
          lockedUntil: BigNumber.from(m.lockedUntil ?? 0).toHexString(),
          beneficiary: m.beneficiary || constants.AddressZero,
          projectId: m.projectId || BigNumber.from(0).toHexString(),
          allocator: constants.AddressZero,
        })),
        ticketMods.map(m => ({
          preferUnstaked: false,
          percent: BigNumber.from(m.percent).toHexString(),
          lockedUntil: BigNumber.from(m.lockedUntil ?? 0).toHexString(),
          beneficiary: m.beneficiary || constants.AddressZero,
          allocator: constants.AddressZero,
        })),
      ],
      {
        onDone: () => {
          onIncentivesFormSaved(discountRate, bondingCurveRate)
          ticketingForm.validateFields()
          setLoading(false)
          setDetailIssueVisible(false)
        },
      },
    )
  }

  return (
    <div
      style={{
        width: '100%',
        marginTop: '20px',
      }}
    >
      <Space>
        <TooltipLabel
          label={
            <div
              style={{
                display: 'inline-block',
                fontSize: '19px',
                fontWeight: 'bold',
                fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
                color: '#1D1D1D',
              }}
            >
              Token
            </div>
          }
          tip="Tokens are distributed to anyone who pays this
              project. If the project has set a funding target, tokens
              can be redeemed for a portion of the project's
              overflow whether or not they have been claimed yet."
        />
        <div className="editIcon" onClick={() => setDetailIssueVisible(true)}>
          <DetailEditShow />
        </div>
      </Space>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          border: '1px solid #D3DCEE',
          borderRadius: '5px',
          padding: '15px 37px',
          marginTop: '10px',
        }}
      >
        <div
          style={{
            width: '25%',
          }}
        >
          <div
            style={{
              color: '#3F3D3D',
              fontWeight: 'bold',
              fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
              fontSize: '14px',
            }}
          >
            Address
          </div>
          <div
            style={{
              color: '#3F3D3D',
              fontWeight: 'bold',
              fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
              fontSize: '14px',
            }}
          >
            Total supply
          </div>
        </div>
        <div
          style={{
            width: '45%',
          }}
        >
          <div>
            {ticketsIssued ? <FormattedAddress address={tokenAddress} /> : '--'}
          </div>
          <div>
            {formatWad(totalSupply, { decimals: 0 })}
            <span style={{ fontWeight: 'bold' }}> Tokens</span>
          </div>
        </div>
        <div
          style={{
            width: '30%',
          }}
        >
          <div
            className={'button-spec'}
            onClick={() => setDetailIncentiveVisible(true)}
          >
            SHOW HOLDER
          </div>
        </div>
      </div>
      <DetailIncentivesModal
        disableBondingCurve={
          !hasFundingTarget(editingFC)
            ? 'Bonding curve disabled while no funding target is set.'
            : undefined
        }
        initialDiscountRate={fromPermille(editingFC.discountRate)}
        initialBondingCurveRate={fromPerbicent(editingFC.bondingCurveRate)}
        visible={DetailIssueVisible}
        onSuccess={() => setDetailIssueVisible(false)}
        onCancel={() => setDetailIssueVisible(false)}
        onSave={async (discountRate: string, bondingCurveRate: string) => {
          await updateToken(discountRate, bondingCurveRate)
        }}
        confirm={loading}
      />
      <ParticipantsModal
        visible={DetailIncentiveVisible}
        onCancel={() => setDetailIncentiveVisible(false)}
      />
    </div>
  )
}
