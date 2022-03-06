import { CardSection } from 'components/shared/CardSection'
import { ProjectContext } from 'contexts/projectContext'
import { ThemeContext } from 'contexts/themeContext'
import { useContext } from 'react'
import { BigNumber } from '@ethersproject/bignumber'

import Paid from 'components/Dashboard/Paid'
import SmartRewards from 'components/Dashboard/SmartRewards'

import FundingCyclePreview from './FundingCyclePreview'
import ReservedTokens from '../Dashboard/ReservedTokens'
import Spending from '../Dashboard/Spending'
import SectionHeader from '../Dashboard/SectionHeader'

export default function CurrentFundingCycle({
  showCurrentDetail,
  totalOverflow,
}: {
  showCurrentDetail?: boolean
  totalOverflow: BigNumber | undefined
}) {
  const { projectId, currentFC, currentPayoutMods, currentTicketMods } =
    useContext(ProjectContext)

  const {
    theme: { colors },
  } = useContext(ThemeContext)

  if (!projectId) return null

  return (
    <div style={{ position: 'relative' }}>
      <CardSection style={{ border: '1px solid #9b9eff' }}>
        <FundingCyclePreview
          fundingCycle={currentFC}
          showDetail={showCurrentDetail}
        />
      </CardSection>
      <div style={{ marginBottom: 20 }}>
        <Paid />
      </div>
      <SmartRewards totalOverflow={totalOverflow} />
      <SectionHeader
        text="Funds Distribution"
        tip="Available funds are distributed to the owner and other payouts below"
        style={{
          margin: '20px 0 6px 20px',
          display: 'inline-block',
        }}
      />
      <CardSection>
        <Spending payoutMods={currentPayoutMods} />
      </CardSection>
      <SectionHeader
        text="Reserved token"
        style={{
          margin: '20px 0 6px 20px',
        }}
      />
      <CardSection>
        <ReservedTokens
          fundingCycle={currentFC}
          ticketMods={currentTicketMods}
        />
      </CardSection>
      <div
        style={{
          position: 'absolute',
          zIndex: -1,
          left: 10,
          right: -10,
          top: 10,
          bottom: 0,
          background: colors.background.l1,
        }}
      ></div>
    </div>
  )
}
