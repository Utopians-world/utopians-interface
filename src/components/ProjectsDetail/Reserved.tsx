import React, { useContext, useLayoutEffect, useState } from 'react'
import { Col, Row, Space, Tooltip } from 'antd'

import { BigNumber } from '@ethersproject/bignumber'

import { LockOutlined } from '@ant-design/icons'

import { useForm } from 'antd/lib/form/Form'
import { constants } from 'ethers'

import { ProjectContext } from '../../contexts/projectContext'
import {
  formatWad,
  fromPerbicent,
  fromPermyriad,
} from '../../utils/formatNumber'
import { decodeFCMetadata } from '../../utils/fundingCycle'
import DetailEditReservedTokensModal from '../modals/DetailEditReservedTokensModal'
import DetailEdit from '../icons/DetailEdit'
import DistributeTokensModal from '../modals/DistributeTokensModal'
import { PayoutMod, TicketMod } from '../../models/mods'

import ProjectHandle from '../shared/ProjectHandle'
import TooltipLabel from '../shared/TooltipLabel'
import FormattedAddress from '../shared/FormattedAddress'

import { formatDate } from '../../utils/formatDate'
import OwnerIcon from '../../assets/images/Owner-1.png'

import { TicketingFormFields } from '../Create/TicketingForm'
import { FundingCycle } from '../../models/funding-cycle'
import { editingProjectActions } from '../../redux/slices/editingProject'
import { useAppDispatch } from '../../hooks/AppDispatch'

import { UserContext } from '../../contexts/userContext'

export default function Reserved({
  total,
  ticketMods,
  fundingCycle,
}: {
  total?: BigNumber
  ticketMods: TicketMod[] | undefined
  fundingCycle: FundingCycle | undefined
}) {
  const {
    balanceInCurrency,
    owner,
    currentFC,
    tokenSymbol,
    currentTicketMods,
    projectId,
  } = useContext(ProjectContext)
  const [DetailEditReservesVisible, setDetailEditReservesVisible] =
    useState<boolean>(false)
  const [modalIsVisible, setModalIsVisible] = useState<boolean>()
  const [editingTicketMods, setEditingTicketMods] = useState<TicketMod[]>([])
  const [ticketingForm] = useForm<TicketingFormFields>()
  const dispatch = useAppDispatch()
  const metadata = decodeFCMetadata(fundingCycle?.metadata)

  useLayoutEffect(() => {
    if (!ticketMods || !fundingCycle) return
    const metadata = decodeFCMetadata(fundingCycle.metadata)
    if (!metadata) return
    setEditingTicketMods(ticketMods)
    ticketingForm.setFieldsValue({
      reserved: parseFloat(fromPerbicent(metadata.reservedRate)),
    })
  }, [fundingCycle, ticketMods, ticketingForm])

  const onTicketingFormSaved = (mods: TicketMod[]) => {
    const fields = ticketingForm.getFieldsValue(true)
    dispatch(editingProjectActions.setReserved(fields.reserved))
    setEditingTicketMods(mods)
  }
  const { transactor, contracts } = useContext(UserContext)
  const [loading, setLoading] = useState<boolean>()

  if (!currentFC) return null

  const untapped = currentFC.target.sub(currentFC.tapped)

  const modsTotal = currentTicketMods?.reduce(
    (acc, curr) => acc + curr.percent,
    0,
  )
  const ownerPercent = 10000 - (modsTotal ?? 0)
  const lastMod = { beneficiary: owner, percent: ownerPercent }

  const withdrawable = balanceInCurrency?.gt(untapped)
    ? untapped
    : balanceInCurrency

  async function updateReserved() {
    if (!transactor || !contracts?.TerminalV1 || !fundingCycle || !projectId)
      return

    setLoading(true)
    transactor(
      contracts.TerminalV1,
      'configure',
      [
        projectId.toHexString(),
        editingTicketMods.map(m => ({
          preferUnstaked: false,
          percent: BigNumber.from(m.percent).toHexString(),
          lockedUntil: BigNumber.from(m.lockedUntil ?? 0).toHexString(),
          beneficiary: m.beneficiary || constants.AddressZero,
          allocator: constants.AddressZero,
        })),
      ],
      {
        onDone: () => {
          setLoading(false)
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
      <h2 style={{ fontWeight: 'bold' }}>
        Reserved tokens ({fromPerbicent(metadata?.reservedRate)}%)
        <span
          className="editIcon"
          onClick={() => setDetailEditReservesVisible(true)}
        >
          <DetailEdit />
        </span>
      </h2>
      <div
        style={{
          border: '1px solid #D3DCEE',
          borderRadius: '5px',
          padding: '15px 15px',
        }}
      >
        <Row
          style={{
            borderBottom: '1px dashed #665FAC',
            padding: '0 20px',
            paddingBottom: '20px',
          }}
        >
          <Col span={6}>
            <Space>
              <div
                style={{
                  color: '#2713E1',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  marginBottom: '5px',
                }}
              >
                Available
              </div>
            </Space>
          </Col>
          <Col span={10}>
            <div
              style={{
                fontWeight: 'bold',
                fontSize: '18px',
                marginBottom: '5px',
              }}
            >
              {formatWad(withdrawable, { decimals: 4 }) || '0'}{' '}
            </div>
          </Col>
          <Col span={8}>
            <div
              className={'button-spec'}
              onClick={() => setModalIsVisible(true)}
            >
              DISTRIBUTE
            </div>
          </Col>
        </Row>
        <div>
          <Space style={{ padding: '15px 20px' }}>
            <div
              style={{ color: '#2713E1', fontWeight: 'bold', fontSize: '18px' }}
            >
              Distribute to
            </div>
          </Space>

          {currentTicketMods?.length
            ? [...currentTicketMods]
                .sort((a, b) => (a.percent < b.percent ? 1 : -1))
                .map(mod => (
                  <div
                    style={{
                      padding: '0 20px',
                      background: '#F6F7FF',
                      height: '30px',
                      lineHeight: '30px',
                    }}
                  >
                    <div style={{ float: 'left', width: '50%' }}>
                      <div style={{ lineHeight: 1.4 }}>
                        <div
                          style={{ display: 'flex', alignItems: 'baseline' }}
                        >
                          {(mod as PayoutMod).projectId &&
                          BigNumber.from((mod as PayoutMod).projectId).gt(0) ? (
                            <div>
                              <div style={{ fontWeight: 500 }}>
                                {(mod as PayoutMod).projectId ? (
                                  <ProjectHandle
                                    link
                                    projectId={
                                      (mod as PayoutMod).projectId as BigNumber
                                    }
                                  />
                                ) : (
                                  '--'
                                )}
                                :
                              </div>
                              <div
                                style={{
                                  fontSize: '.8rem',
                                  marginLeft: 10,
                                }}
                              >
                                <TooltipLabel
                                  label={'Tokens:'}
                                  tip={`This address will receive any tokens minted when the recipient project gets paid.`}
                                />{' '}
                                <FormattedAddress address={mod.beneficiary} />{' '}
                                {owner === mod.beneficiary && (
                                  <Tooltip title="Project owner">
                                    <img
                                      src={OwnerIcon}
                                      alt=""
                                      style={{ width: '15px' }}
                                    />
                                  </Tooltip>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div style={{ fontWeight: 500 }}>
                              <FormattedAddress address={mod.beneficiary} />
                              {owner === mod.beneficiary && (
                                <span style={{ marginLeft: 5 }}>
                                  <Tooltip title="Project owner">
                                    <img
                                      src={OwnerIcon}
                                      alt=""
                                      style={{ width: '15px' }}
                                    />
                                  </Tooltip>
                                </span>
                              )}
                              :
                            </div>
                          )}
                        </div>
                        {mod.lockedUntil ? (
                          <div style={{ fontSize: '.8rem' }}>
                            <LockOutlined /> until{' '}
                            {mod.lockedUntil
                              ? formatDate(mod.lockedUntil * 1000, 'MM-DD-yyyy')
                              : null}
                          </div>
                        ) : null}{' '}
                      </div>
                    </div>
                    <div
                      style={{
                        float: 'right',
                        width: '50%',
                        textAlign: 'right',
                      }}
                    >
                      {fromPermyriad(mod.percent) +
                        '%' +
                        (total
                          ? ` (${formatWad(total?.mul(mod.percent).div(10000), {
                              decimals: 0,
                            })} ${tokenSymbol ?? ' tokens'})`
                          : '')}
                    </div>
                  </div>
                ))
            : null}

          {ownerPercent > 0 && (
            <div
              style={{
                padding: '0 20px',
                height: '30px',
                lineHeight: '30px',
                ...(currentTicketMods?.length &&
                currentTicketMods?.length % 2 === 0
                  ? {
                      background: '#F6F7FF',
                    }
                  : {
                      background: '#ffffff',
                    }),
              }}
            >
              <div style={{ float: 'left', width: '50%' }}>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  {(lastMod as PayoutMod).projectId &&
                  BigNumber.from((lastMod as PayoutMod).projectId).gt(0) ? (
                    <div>
                      <div style={{ fontWeight: 500 }}>
                        {(lastMod as PayoutMod).projectId ? (
                          <ProjectHandle
                            link
                            projectId={
                              (lastMod as PayoutMod).projectId as BigNumber
                            }
                          />
                        ) : (
                          '--'
                        )}
                        :
                      </div>
                      <div
                        style={{
                          fontSize: '.8rem',
                          marginLeft: 10,
                        }}
                      >
                        <TooltipLabel
                          label={'Tokens:'}
                          tip={`This address will receive any tokens minted when the recipient project gets paid.`}
                        />{' '}
                        <FormattedAddress address={lastMod.beneficiary} />{' '}
                        {owner === lastMod.beneficiary && (
                          <Tooltip title="Project owner">
                            <img
                              src={OwnerIcon}
                              alt=""
                              style={{ width: '15px' }}
                            />
                          </Tooltip>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div style={{ fontWeight: 500 }}>
                      <FormattedAddress address={lastMod.beneficiary} />
                      {owner === lastMod.beneficiary && (
                        <span style={{ marginLeft: 5 }}>
                          <Tooltip title="Project owner">
                            <img
                              src={OwnerIcon}
                              alt=""
                              style={{ width: '15px' }}
                            />
                          </Tooltip>
                        </span>
                      )}
                      :
                    </div>
                  )}
                </div>{' '}
              </div>
              <div style={{ float: 'right', width: '50%', textAlign: 'right' }}>
                <span style={{ fontWeight: 400 }}>
                  {fromPermyriad(ownerPercent)}%
                  {total
                    ? ` (${formatWad(total?.mul(ownerPercent).div(10000), {
                        decimals: 0,
                      })} ${tokenSymbol ?? ' tokens'})`
                    : ''}
                </span>
              </div>
            </div>
          )}
          <div></div>
        </div>
      </div>
      <DetailEditReservedTokensModal
        form={ticketingForm}
        visible={DetailEditReservesVisible}
        onSuccess={() => setDetailEditReservesVisible(false)}
        onCancel={() => setDetailEditReservesVisible(false)}
        onSave={async mods => {
          await ticketingForm.validateFields()
          onTicketingFormSaved(mods)
          updateReserved()
        }}
        initialMods={editingTicketMods}
        confirm={loading}

        // fundingCycle={currentFC}
      />
      <DistributeTokensModal
        visible={modalIsVisible}
        onCancel={() => setModalIsVisible(false)}
        onConfirmed={() => setModalIsVisible(false)}
      />
    </div>
  )
}
