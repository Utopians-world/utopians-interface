import { RightOutlined } from '@ant-design/icons'
import { BigNumber } from '@ethersproject/bignumber'
import { Progress, Tooltip } from 'antd'
import CurrencySymbol from 'components/shared/CurrencySymbol'
import EtherscanLink from 'components/shared/EtherscanLink'
import ProjectTokenBalance from 'components/shared/ProjectTokenBalance'
import TooltipLabel from 'components/shared/TooltipLabel'

import { ProjectContext } from 'contexts/projectContext'
import { ThemeContext } from 'contexts/themeContext'
import useContractReader from 'hooks/ContractReader'
import { useCurrencyConverter } from 'hooks/CurrencyConverter'
import { useEthBalanceQuery } from 'hooks/EthBalance'
import { ContractName } from 'models/contract-name'
import { CurrencyOption } from 'models/currency-option'
import { NetworkName } from 'models/network-name'
import { CSSProperties, useContext, useMemo, useState } from 'react'
import { bigNumbersDiff } from 'utils/bigNumbersDiff'
import { formatWad, fracDiv, fromWad, parseWad } from 'utils/formatNumber'
import { hasFundingTarget } from 'utils/fundingCycle'

import { readNetwork } from 'constants/networks'

import BalancesModal from '../modals/BalancesModal'
import SectionHeader from '../Dashboard/SectionHeader'

export default function Paid() {
  const [balancesModalVisible, setBalancesModalVisible] = useState<boolean>()
  const {
    theme: { colors },
  } = useContext(ThemeContext)

  const { projectId, currentFC, balanceInCurrency, balance, owner, earned } =
    useContext(ProjectContext)

  const converter = useCurrencyConverter()

  const totalOverflow = useContractReader<BigNumber>({
    contract: ContractName.TerminalV1,
    functionName: 'currentOverflowOf',
    args: projectId ? [projectId.toHexString()] : null,
    valueDidChange: bigNumbersDiff,
    updateOn: useMemo(
      () =>
        projectId
          ? [
              {
                contract: ContractName.TerminalV1,
                eventName: 'Pay',
                topics: [[], projectId.toHexString()],
              },
              {
                contract: ContractName.TerminalV1,
                eventName: 'Tap',
                topics: [[], projectId.toHexString()],
              },
            ]
          : undefined,
      [projectId],
    ),
  })

  const overflowInCurrency = converter.wadToCurrency(
    totalOverflow ?? 0,
    currentFC?.currency.toNumber() as CurrencyOption,
    0,
  )

  const { data: ownerBalance } = useEthBalanceQuery(owner)

  const percentPaid = useMemo(
    () =>
      balanceInCurrency && currentFC?.target
        ? fracDiv(balanceInCurrency.toString(), currentFC.target.toString()) *
          100
        : 0,
    [balanceInCurrency, currentFC],
  )

  // Percent overflow of target
  const percentOverflow = fracDiv(
    (overflowInCurrency?.sub(currentFC?.target ?? 0) ?? 0).toString(),
    (currentFC?.target ?? 0).toString(),
  )

  const primaryTextStyle: CSSProperties = {
    fontWeight: 400,
    fontSize: '19px',
    lineHeight: '23px',
    fontFamily: 'GoodTimesRg-Regular, GoodTimesRg',
    color: '#00dac5',
    textShadow: '0px 4px 5px #9efff1',
  }

  const secondaryTextStyle: CSSProperties = {
    // textTransform: 'uppercase',
    fontSize: '13px',
    fontWeight: 600,
    fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
    color: '#3F3D3D',
    lineHeight: '20px',
  }
  const thirdTextStyle: CSSProperties = {
    fontSize: '13px',
    fontWeight: 600,
    fontFamily: 'GoodTimesW00-Bold, GoodTimesW00',
    color: '#717171',
    lineHeight: '15px',
  }
  const linkTextStyle: CSSProperties = {
    fontSize: '11px',
    fontWeight: 400,
    fontFamily: 'TeXGyreAdventor-Regular, TeXGyreAdventor',
    color: '#6B75FF',
    lineHeight: '18px',
  }

  if (!currentFC) return null

  // const spacing =
  //   hasFundingTarget(currentFC) && currentFC.target.gt(0) ? 15 : 10

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
              <CurrencySymbol currency={1} />
              {formatWad(amt, { decimals: 2, padEnd: true })}
            </Tooltip>
          </span>
        ) : (
          <span>
            <CurrencySymbol currency={0} />
            {formatWad(amt, { decimals: 2, padEnd: true })}
          </span>
        )}
      </>
    ) : null

  const isConstitutionDAO =
    readNetwork.name === NetworkName.mainnet && projectId?.eq(36)

  return (
    <div className="fundovervieWrapper">
      <SectionHeader
        text="Funding Information"
        style={{
          margin: '14px 0 6px',
        }}
      />
      <div className="fundoverviewCon">
        <div className="fundoverviewConTop">
          <div className="fundoverviewConTopCon">
            <span style={secondaryTextStyle}>
              <TooltipLabel
                label="Total Rasied"
                tip="The total amount received by this project through Utopians since it was created."
              />
            </span>
            <span style={primaryTextStyle}>
              {isConstitutionDAO && (
                <span style={secondaryTextStyle}>
                  <CurrencySymbol currency={1} />
                  {formatWad(converter.wadToCurrency(earned, 1, 0), {
                    decimals: 2,
                    padEnd: true,
                  })}{' '}
                </span>
              )}
              <span
              // style={{
              //   color: isConstitutionDAO
              //     ? colors.text.brand.primary
              //     : colors.text.primary,
              // }}
              >
                <CurrencySymbol currency={0} />
                {earned?.lt(parseWad('1')) && earned.gt(0)
                  ? '<1'
                  : formatWad(earned, { decimals: 0 })}
              </span>
            </span>
          </div>

          <div
            className="fundoverviewConTopCon"
            style={{ paddingLeft: 20, borderLeft: '1px solid #C3D0F9' }}
          >
            <div style={secondaryTextStyle}>
              <TooltipLabel
                label="Reserved in Project Vault"
                tip="The balance of this project in the Utopians contract."
              />
            </div>

            <div
              style={{
                ...primaryTextStyle,
                // color: '#717171',
              }}
            >
              {currentFC.currency.eq(1) ? (
                <span>
                  <CurrencySymbol currency={0} />
                  {formatWad(balance, { decimals: 2, padEnd: true })}{' '}
                </span>
              ) : (
                ''
              )}
              {/* {formatCurrencyAmount(balanceInCurrency)} */}
            </div>
          </div>

          <div
            className="fundoverviewConTopCon"
            style={{ paddingLeft: 20, borderLeft: '1px solid #C3D0F9' }}
          >
            <span style={secondaryTextStyle}>
              <TooltipLabel
                label="In Owner's Wallet"
                tip={
                  <div>
                    <p>
                      The balance of the wallet that owns this Utopians project.
                    </p>
                    <span style={{ userSelect: 'all' }}>{owner}</span>{' '}
                    <EtherscanLink value={owner} type="address" />
                  </div>
                }
              />
            </span>
            <span>
              <span style={primaryTextStyle}>
                <CurrencySymbol currency={0} />
                {formatWad(ownerBalance, { decimals: 2, padEnd: true })}
              </span>
              <span style={thirdTextStyle}>
                {' '}
                +{' '}
                <ProjectTokenBalance
                  style={{ ...thirdTextStyle, display: 'inline-block' }}
                  wallet={owner}
                  projectId={BigNumber.from(
                    process.env.REACT_APP_UTOPIANS_GOV_PROJECT_ID ?? '0x01',
                  )}
                  hideHandle
                />
              </span>
            </span>
          </div>

          <div
            style={{
              textAlign: 'right',
            }}
          >
            <span
              style={{ ...linkTextStyle, cursor: 'pointer' }}
              onClick={() => setBalancesModalVisible(true)}
            >
              All assets <RightOutlined />
            </span>
          </div>
        </div>

        {hasFundingTarget(currentFC) &&
          (currentFC.target.gt(0) ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexFlow: 'column wrap',
                alignItems: 'baseline',
                padding: '20px 22px 0',
                borderTop: '1px solid #C3D0F9',
              }}
            >
              <div style={secondaryTextStyle}>
                <TooltipLabel
                  label="Current Funding Cycle Progress(0%)"
                  tip="The amount that has been distributed from the Utopians balance in this funding cycle, out of the current funding target. 
                  No more than the funding target can be distributed in a single funding cycle—any remaining METIS in Utopians is overflow, until the next cycle begins."
                />
              </div>

              <div className="fundAmount">
                {formatCurrencyAmount(currentFC.tapped)} /{' '}
                {formatCurrencyAmount(currentFC.target)}
              </div>
            </div>
          ) : (
            <div
              style={{
                ...secondaryTextStyle,
                textAlign: 'right',
              }}
            >
              <TooltipLabel
                tip="The target for this funding cycle is 0, meaning all funds in Utopians are currently considered overflow. Overflow can be redeemed by token holders, but not distributed."
                label="100% overflow"
              />
            </div>
          ))}

        {hasFundingTarget(currentFC) &&
          currentFC.target.gt(0) &&
          false &&
          (totalOverflow?.gt(0) ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                maxWidth: 322,
                marginLeft: 22,
              }}
            >
              <Progress
                style={{
                  width: (1 - percentOverflow) * 100 + '%',
                  minWidth: 10,
                }}
                percent={100}
                showInfo={false}
                strokeColor={'#665FAC'}
              />
              <div
                style={{
                  minWidth: 4,
                  height: 15,
                  borderRadius: 2,
                  background: colors.text.primary,
                  marginLeft: 5,
                  marginRight: 5,
                  marginTop: 3,
                }}
              ></div>
              <Progress
                style={{
                  width: percentOverflow * 100 + '%',
                  minWidth: 10,
                }}
                percent={100}
                showInfo={false}
                strokeColor={'#665FAC'}
              />
            </div>
          ) : (
            <div
              style={{
                maxWidth: 322,
                marginLeft: 22,
              }}
            >
              <Progress
                percent={percentPaid ? Math.max(percentPaid, 1) : 0}
                showInfo={false}
                strokeColor={'#665FAC'}
              />
            </div>
          ))}

        <BalancesModal
          visible={balancesModalVisible}
          onCancel={() => setBalancesModalVisible(false)}
        />
      </div>
    </div>
  )
}
