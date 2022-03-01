import React, { useContext, useLayoutEffect, useState } from 'react'
import { Col, Row, Space, Tooltip } from 'antd'

import { constants } from 'ethers'

import { BigNumber } from '@ethersproject/bignumber'

import { LockOutlined } from '@ant-design/icons'

import { ProjectContext } from '../../contexts/projectContext'
import { formatWad, fromPermyriad } from '../../utils/formatNumber'
import { hasFundingTarget } from '../../utils/fundingCycle'
import DetailBalance from './DetailBalance'
import DetailEditPayoutModal from '../modals/DetailEditPayoutModal'
import TooltipLabel from '../shared/TooltipLabel'
import WithdrawModal from '../modals/WithdrawModal'
import OwnerIcon from '../../assets/images/Owner-1.png'

import CurrencySymbol from '../shared/CurrencySymbol'
import { amountSubFee } from '../../utils/math'
import { PayoutMod, TicketMod } from '../../models/mods'

import ProjectHandle from '../shared/ProjectHandle'
import FormattedAddress from '../shared/FormattedAddress'

import { formatDate } from '../../utils/formatDate'
import DetailEditShow from './DetailEditShow'

export default function Distribution({
  payoutMods,
  ticketMods,
  total,
}: {
  payoutMods: PayoutMod[]
  ticketMods: TicketMod[]
  total?: BigNumber
}) {
  const { balanceInCurrency, owner, currentFC, projectId, currentPayoutMods } =
    useContext(ProjectContext)
  const [withdrawModalVisible, setWithdrawModalVisible] = useState<boolean>()
  const [DetailPayoutVisible, setDetailPayoutVisible] = useState<boolean>(false)
  const [editingPayoutMods, setEditingPayoutMods] = useState<PayoutMod[]>([])
  useLayoutEffect(() => {
    if (!payoutMods) return
    setEditingPayoutMods(payoutMods)
  }, [payoutMods])

  if (!currentFC) return null

  const untapped = currentFC.target.sub(currentFC.tapped)

  const baseTotal = total ?? amountSubFee(currentFC?.target, currentFC.fee)

  const modsTotal = currentPayoutMods?.reduce(
    (acc, curr) => acc + curr.percent,
    0,
  )
  const ownerPercent = 10000 - (modsTotal ?? 0)
  const lastMod = { beneficiary: owner, percent: ownerPercent }

  const withdrawable = balanceInCurrency
    ? balanceInCurrency.gt(untapped)
      ? untapped
      : balanceInCurrency
    : 0

  return (
    <div
      style={{
        width: '100%',
        marginTop: '20px',
      }}
      className="distribution-main"
    >
      <h2
        style={{
          marginBottom: '5px',
          marginRight: '10px',
          display: 'inline-block',
          fontSize: '19px',
          fontWeight: 'bold',
          fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
          color: '#1D1D1D',
        }}
      >
        Distribution
        <span className="editIcon" onClick={() => setDetailPayoutVisible(true)}>
          <DetailEditShow />
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
              <TooltipLabel
                label={
                  <div
                    style={{
                      color: '#2713E1',
                      fontWeight: 'bold',
                      fontSize: '19px',
                      marginBottom: '8px',
                      display: 'inline-block',
                      marginRight: '10px',
                      fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
                    }}
                  >
                    Available
                  </div>
                }
                tip="The funds available to withdraw for this funding
                    cycle after the 5% UTO fee is subtracted. This number
                    won't roll over to the next funding cycle, so funds
                    should be withdrawn before it ends."
              />
            </Space>
            <div
              style={{
                fontWeight: 'bold',
                marginBottom: '3px',
                fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
                fontSize: '16px',
              }}
            >
              Withdrawn
            </div>
            <div
              style={{
                fontWeight: 'bold',
                fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
                fontSize: '16px',
              }}
            >
              Owner balance
            </div>
          </Col>
          <Col span={10}>
            <div
              style={{
                fontWeight: 'bold',
                fontSize: '22px',
                marginBottom: '5px',
                color: '#303030',
                fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
              }}
            >
              <CurrencySymbol currency={0} />
              {formatWad(withdrawable, { decimals: 4 }) || '0'}{' '}
            </div>
            <div
              style={{
                fontSize: '16px',
              }}
            >
              <CurrencySymbol currency={0} />
              {formatWad(currentFC.tapped, { decimals: 4 }) || '0'}
              {hasFundingTarget(currentFC) && (
                <span>/{formatWad(currentFC.target, { decimals: 4 })} </span>
              )}{' '}
            </div>
            <div
              style={{
                fontSize: '16px',
              }}
            >
              <DetailBalance address={owner} />
            </div>
          </Col>
          <Col span={8}>
            <div
              className={'button-spec'}
              onClick={() => setWithdrawModalVisible(true)}
            >
              DISTRIBUTE
            </div>
          </Col>
        </Row>
        <div>
          <Space style={{ padding: '15px 20px' }}>
            <TooltipLabel
              label={
                <div
                  style={{
                    color: '#2713E1',
                    fontWeight: 'bold',
                    fontSize: '19px',
                    display: 'inline-block',
                    marginRight: '10px',
                    fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
                  }}
                >
                  Distribute to
                </div>
              }
              tip="Available funds are distributed according to any payouts below."
            />
          </Space>

          {currentPayoutMods?.length
            ? [...currentPayoutMods]
                .sort((a, b) => (a.percent < b.percent ? 1 : -1))
                .map((mod, i) => (
                  <div
                    style={{
                      padding: '0 20px',
                      height: '30px',
                      lineHeight: '30px',
                      ...(i % 2 === 0
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
                    <div
                      style={{
                        float: 'right',
                        width: '50%',
                        textAlign: 'right',
                      }}
                    >
                      {fromPermyriad(mod.percent)}%
                      {!currentFC.target.eq(constants.MaxUint256) && (
                        <>
                          {' '}
                          (
                          <CurrencySymbol currency={0} />
                          {formatWad(baseTotal?.mul(mod.percent).div(10000), {
                            decimals: currentFC.currency.eq(0) ? 4 : 0,
                            padEnd: true,
                          })}
                          )
                        </>
                      )}
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
                ...(currentPayoutMods?.length &&
                currentPayoutMods?.length % 2 === 0
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
                {fromPermyriad(ownerPercent)}%
                {!currentFC.target.eq(constants.MaxUint256) && (
                  <>
                    {' '}
                    (
                    <CurrencySymbol currency={0} />
                    {formatWad(baseTotal?.mul(ownerPercent).div(10000), {
                      decimals: currentFC.currency.eq(0) ? 4 : 0,
                      padEnd: true,
                    })}
                    )
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <DetailEditPayoutModal
        initialMods={editingPayoutMods}
        visible={DetailPayoutVisible}
        onSuccess={() => setDetailPayoutVisible(false)}
        onCancel={() => setDetailPayoutVisible(false)}
        projectId={projectId}
        ticketMods={ticketMods}
        // fundingCycle={currentFC}
      />
      <WithdrawModal
        visible={withdrawModalVisible}
        onCancel={() => setWithdrawModalVisible(false)}
        onConfirmed={() => setWithdrawModalVisible(false)}
      />
    </div>
  )
}
