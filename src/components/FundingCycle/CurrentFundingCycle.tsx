import { CardSection } from 'components/shared/CardSection'
import { ProjectContext } from 'contexts/projectContext'
import { ThemeContext } from 'contexts/themeContext'
import { useContext } from 'react'

import FundingCyclePreview from './FundingCyclePreview'
import ReservedTokens from '../Dashboard/ReservedTokens'
import Spending from '../Dashboard/Spending'
import SectionHeader from '../Dashboard/SectionHeader'

export default function CurrentFundingCycle({
  showCurrentDetail,
}: {
  showCurrentDetail?: boolean
}) {
  const { projectId, currentFC, currentPayoutMods, currentTicketMods } =
    useContext(ProjectContext)

  const {
    theme: { colors },
  } = useContext(ThemeContext)

  if (!projectId) return null

  return (
    <div style={{ position: 'relative' }}>
      <CardSection>
        <FundingCyclePreview
          fundingCycle={currentFC}
          showDetail={showCurrentDetail}
        />
      </CardSection>
      <SectionHeader
        text="Distribution"
        style={{
          margin: '20px 0 6px 20px',
        }}
      />
      <CardSection>
        <Spending payoutMods={currentPayoutMods} />
      </CardSection>
      <SectionHeader
        text="Reserved UTO"
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
