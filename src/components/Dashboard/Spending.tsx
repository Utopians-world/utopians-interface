// import { CrownFilled } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import WithdrawModal from 'components/modals/WithdrawModal'
import Balance from 'components/Navbar/Balance'
import CurrencySymbol from 'components/shared/CurrencySymbol'
import TooltipLabel from 'components/shared/TooltipLabel'
import { ProjectContext } from 'contexts/projectContext'
// import { ThemeContext } from 'contexts/themeContext'
import { CurrencyOption } from 'models/currency-option'
import { PayoutMod } from 'models/mods'
import { CSSProperties, useContext, useState } from 'react'
import { formatWad, fromPerbicent } from 'utils/formatNumber'
import { hasFundingTarget } from 'utils/fundingCycle'

import PayoutModsList from '../shared/PayoutModsList'

export default function Spending({
  payoutMods,
}: {
  payoutMods: PayoutMod[] | undefined
}) {
  // const {
  //   theme: { colors },
  // } = useContext(ThemeContext)

  const { balanceInCurrency, projectId, owner, currentFC, isPreviewMode } =
    useContext(ProjectContext)

  const [withdrawModalVisible, setWithdrawModalVisible] = useState<boolean>()

  if (!currentFC) return null

  const untapped = currentFC.target.sub(currentFC.tapped)

  const withdrawable = balanceInCurrency?.gt(untapped)
    ? untapped
    : balanceInCurrency

  const smallHeaderStyle: CSSProperties = {
    fontSize: '15px',
    fontWeight: 500,
    cursor: 'default',
    fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
    color: '#2713E1',
    lineHeight: '24px',
  }

  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div
          style={{
            padding: '0 22px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <div>
              <TooltipLabel
                style={{ minWidth: 112, display: 'inline-block' }}
                label={
                  <h4 style={{ ...smallHeaderStyle, display: 'inline-block' }}>
                    Available
                  </h4>
                }
                tip={`The funds available to withdraw for this funding cycle after the ${fromPerbicent(
                  currentFC.fee,
                )}% UTO fee is subtracted. This number won't roll over to the next funding cycle, so funds should be withdrawn before it ends.`}
              />
              <span
                style={{
                  fontSize: '1rem',
                  fontWeight: 500,
                }}
              >
                <CurrencySymbol
                  currency={currentFC.currency.toNumber() as CurrencyOption}
                />
                {formatWad(withdrawable, { decimals: 4 }) || '0'}{' '}
              </span>
            </div>
            <Button
              className="defaultBtn"
              type="ghost"
              size="small"
              onClick={() => setWithdrawModalVisible(true)}
              disabled={isPreviewMode}
            >
              Distribute
            </Button>
          </div>
          <div style={{ ...smallHeaderStyle, color: '#3F3D3D' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  color: '#3F3D3D',
                  display: 'inline-block',
                  minWidth: 112,
                }}
              >
                Withdrawn
              </span>{' '}
              <CurrencySymbol
                currency={currentFC.currency.toNumber() as CurrencyOption}
              />
              {formatWad(currentFC.tapped, { decimals: 4 }) || '0'}
              {hasFundingTarget(currentFC) && (
                <span>/{formatWad(currentFC.target, { decimals: 4 })} </span>
              )}
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Tooltip title="Project owner balance">
                <Space>
                  <span
                    style={{
                      ...smallHeaderStyle,
                      fontSize: 13,
                      display: 'inline-block',
                      color: '#3F3D3D',
                      minWidth: 104,
                    }}
                  >
                    Owner balance
                  </span>
                  <Balance address={owner} />
                </Space>
              </Tooltip>
            </div>
          </div>
        </div>

        {currentFC.target.gt(0) && (
          <div style={{ borderTop: '1px dashed #665FAC', paddingTop: '21px' }}>
            <TooltipLabel
              label={
                <h4
                  style={{
                    ...smallHeaderStyle,
                    display: 'inline-block',
                    paddingLeft: '22px',
                  }}
                >
                  Distribution
                </h4>
              }
              tip="Available funds are distributed according to any payouts below."
            />
            <PayoutModsList
              mods={payoutMods}
              fundingCycle={currentFC}
              projectId={projectId}
              fee={currentFC.fee}
            />
          </div>
        )}
      </Space>

      <WithdrawModal
        visible={withdrawModalVisible}
        onCancel={() => setWithdrawModalVisible(false)}
        onConfirmed={() => setWithdrawModalVisible(false)}
      />
    </div>
  )
}
