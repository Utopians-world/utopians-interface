import React, { CSSProperties, useContext, useState } from 'react'
import { Space, Tooltip } from 'antd'

import { BigNumber } from '@ethersproject/bignumber'

import { constants } from 'ethers'

import { ProjectContext } from '../../contexts/projectContext'
import { formatWad, fromWad, parseWad } from '../../utils/formatNumber'

import CurrencySymbol from '../shared/CurrencySymbol'
import { useCurrencyConverter } from '../../hooks/CurrencyConverter'
import { useEthBalanceQuery } from '../../hooks/EthBalance'
import DetailEditFundingModal from '../modals/DetailEditFundingModal'
import TooltipLabel from '../shared/TooltipLabel'
import ProjectTokenBalance from '../shared/ProjectTokenBalance'
import MetisLogo from '../icons/MetisLogo'
import { CurrencyOption } from '../../models/currency-option'
import { useEditingFundingCycleSelector } from '../../hooks/AppSelector'
import BalancesModal from '../modals/BalancesModal'
import { PayoutMod, TicketMod } from '../../models/mods'
import { DitributionLoad } from './DitributionLoad'
import DetailEditShow from './DetailEditShow'

export default function FundOverview({
  payoutMods,
  ticketMods,
}: {
  payoutMods: PayoutMod[]
  ticketMods: TicketMod[]
}) {
  const { projectId, currentFC, balance, owner, earned } =
    useContext(ProjectContext)
  const [DetailEditFundingVisible, setDetailEditFundingVisible] =
    useState<boolean>(false)
  const [balancesModalVisible, setBalancesModalVisible] = useState<boolean>()
  const editingFC = useEditingFundingCycleSelector()
  const converter = useCurrencyConverter()
  const { data: ownerBalance } = useEthBalanceQuery(owner)

  if (!currentFC) return null
  const formatCurrencyAmount = (amt: BigNumber | undefined) =>
    amt ? (
      <>
        {currentFC.currency.eq(1) ? (
          <span>
            <Tooltip
              title={
                <span>
                  <CurrencySymbol currency={0} />
                  {formatWad(converter.usdToWei(fromWad(amt)), {
                    decimals: 2,
                    padEnd: true,
                  })}
                </span>
              }
            >
              {formatWad(amt, { decimals: 2, padEnd: true })}
            </Tooltip>
          </span>
        ) : (
          <span>{formatWad(amt, { decimals: 2, padEnd: true })}</span>
        )}
      </>
    ) : null

  const NumberTotal: CSSProperties = {
    color: '#00DAC5',
    textShadow: '0px 5px 6px #9EFFF1',
    fontFamily: 'GoodTimesRg-Regular',
    margin: 0,
    lineHeight: '20px',
  }
  if (!projectId) return null
  // const inputValue = 1
  return (
    <div
      style={{
        width: '100%',
        marginTop: '20px',
      }}
    >
      <h2
        style={{
          display: 'inline-block',
          fontSize: '19px',
          marginBottom: '5px',
          fontWeight: 'bold',
          fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
          color: '#1D1D1D',
        }}
      >
        Fund Overview
        <span
          className="editIcon"
          onClick={() => setDetailEditFundingVisible(true)}
        >
          <DetailEditShow />
        </span>
      </h2>
      <div
        style={{
          background: '#edf1f9',
          padding: '20px',
        }}
      >
        <div
          style={{
            height: '60px',
            display: 'flex',
            justifyContent: 'left',
            marginBottom:
              constants.MaxUint256.toHexString() !==
              currentFC.target.toHexString()
                ? '20px'
                : 0,
          }}
        >
          <div
            style={{
              width: '30%',
              paddingLeft: '30px',
              borderRight: '1.5px solid #C3D0F9',
            }}
          >
            <Space style={{ fontSize: '12px' }}>
              <TooltipLabel
                label={
                  <div
                    style={{
                      fontWeight: 'bold',
                      marginBottom: '5px',
                      display: 'inline-block',
                      marginRight: '10px',
                      fontSize: '15px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
                        fontWeight: 'bold',
                        fontSize: '16px',
                      }}
                    >
                      Volume
                    </span>
                  </div>
                }
                tip="The total amount received by this project through Utopians since it was created."
              />
            </Space>
            <h2 style={NumberTotal}>
              <MetisLogo size={18} />
              {earned?.lt(parseWad('1')) && earned.gt(0)
                ? '<1'
                : formatWad(earned, { decimals: 0 })}
            </h2>
          </div>
          <div
            style={{
              width: '30%',
              paddingLeft: '30px',
              borderRight: '1.5px solid #C3D0F9',
            }}
          >
            <TooltipLabel
              label={
                <div
                  style={{
                    fontWeight: 'bold',
                    marginBottom: '5px',
                    display: 'inline-block',
                    marginRight: '10px',
                    fontSize: '15px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
                      fontWeight: 'bold',
                      fontSize: '16px',
                    }}
                  >
                    In Utopians
                  </span>
                </div>
              }
              tip="The balance of this project in the Utopians contract."
            />
            <h2 style={NumberTotal}>
              <MetisLogo size={18} />
              {formatWad(balance, { decimals: 2, padEnd: true })}
            </h2>
            {/*<h4 style={{ color: '#9092A7' }}>*/}
            {/*  <MetisLogo size={18} size={12} />*/}
            {/*  {formatCurrencyAmount(balanceInCurrency)}*/}
            {/*</h4>*/}
          </div>
          <div style={{ paddingLeft: '30px' }}>
            <div style={{ height: '29px' }}>
              <TooltipLabel
                label={
                  <div
                    style={{
                      fontWeight: 'bold',
                      marginBottom: '5px',
                      display: 'inline-block',
                      marginRight: '10px',
                      fontSize: '15px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
                        fontWeight: 'bold',
                        fontSize: '16px',
                      }}
                    >
                      In wallet
                    </span>
                  </div>
                }
                tip={
                  'The balance of the wallet that owns this Utopians project. + ' +
                  owner
                }
              />
            </div>
            <div style={{ height: '40px' }}>
              <h2
                style={{
                  color: '#00DAC5',
                  textShadow: '0px 5px 6px #9EFFF1',
                  fontFamily: 'GoodTimesRg-Regular',
                  margin: 0,
                  float: 'left',
                  lineHeight: '20px',
                }}
              >
                <MetisLogo size={18} />
                {formatWad(ownerBalance, { decimals: 2, padEnd: true })}
              </h2>
            </div>
          </div>
          <div style={{ paddingLeft: '15px' }}>
            <div
              style={{ color: '#3A1FF5', cursor: 'pointer' }}
              onClick={() => setBalancesModalVisible(true)}
            >
              All Asset &gt;
            </div>
            <div
              style={{
                color: '#717171',
                fontWeight: 'bold',
                marginTop: '5px',
                display: 'flex',
                justifyContent: 'left',
              }}
            >
              <div
                style={{
                  fontSize: '16px',
                  fontFamily: 'GoodTimesRg-Regular, GoodTimesW00',
                  marginRight: '5px',
                }}
              >
                +
              </div>
              <ProjectTokenBalance
                style={{
                  display: 'inline-block',
                  fontWeight: 'bold',
                  fontFamily: 'GoodTimesW00-Bold, GoodTimesW00;',
                }}
                wallet={owner}
                projectId={BigNumber.from(
                  process.env.REACT_APP_UTOPIANS_GOV_PROJECT_ID ?? '0x01',
                )}
                hideHandle
              />
            </div>
          </div>
        </div>
        {constants.MaxUint256.toHexString() !==
        currentFC.target.toHexString() ? (
          <div
            style={{
              height: '90px',
              borderTop: '1.5px solid #C3D0F9',
              paddingLeft: '30px',
              paddingTop: '20px',
            }}
          >
            <Space style={{ fontSize: '12px' }}>
              <TooltipLabel
                label={
                  <div
                    style={{
                      fontWeight: 'bold',
                      marginBottom: '5px',
                      display: 'inline-block',
                      marginRight: '10px',
                      fontSize: '15px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
                        fontWeight: 'bold',
                        fontSize: '16px',
                      }}
                    >
                      Distributed
                    </span>
                  </div>
                }
                tip="The amount that has been distributed from the Utopians balance in this funding cycle,
                         out of the current funding target. No more than the funding target can be distributed in
                          a single funding cycle—any remaining METIS in Utopians is overflow, until the next cycle begins."
              />
            </Space>
            <h2
              style={{
                color: '#3A1FF5',
                textShadow: '0px 5px 6px #C4BAE1',
                fontFamily: 'GoodTimesRg-Regular',
                margin: 0,
                lineHeight: '20px',
              }}
            >
              <MetisLogo size={18} />
              {formatCurrencyAmount(earned)} / <MetisLogo size={18} />
              {formatCurrencyAmount(currentFC.target)}
            </h2>

            <DitributionLoad />
          </div>
        ) : (
          ''
        )}
      </div>
      <DetailEditFundingModal
        initialCurrency={editingFC.currency.toNumber() as CurrencyOption}
        initialTarget={fromWad(editingFC.target)}
        initialDuration={editingFC.duration.toString()}
        visible={DetailEditFundingVisible}
        projectId={projectId}
        onSuccess={() => setDetailEditFundingVisible(false)}
        onCancel={() => setDetailEditFundingVisible(false)}
        payoutMods={payoutMods}
        ticketMods={ticketMods}
      />
      <BalancesModal
        visible={balancesModalVisible}
        onCancel={() => setBalancesModalVisible(false)}
      />
    </div>
  )
}
