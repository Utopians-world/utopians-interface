import { Button, Space } from 'antd'
import ReconfigureFCModal from 'components/modals/ReconfigureFCModal'
import { CardSection } from 'components/shared/CardSection'
import { ProjectContext } from 'contexts/projectContext'
import { ThemeContext } from 'contexts/themeContext'
import { OperatorPermission, useHasPermission } from 'hooks/HasPermission'
import { useContext, useState } from 'react'

import CurrentFundingCycle from '../FundingCycle/CurrentFundingCycle'
import QueuedFundingCycle from '../FundingCycle/QueuedFundingCycle'
import FundingHistory from './FundingHistory'
import SectionHeader from './SectionHeader'

type TabOption = 'current' | 'upcoming' | 'history'

export default function FundingCycles({
  showCurrentDetail,
}: {
  showCurrentDetail?: boolean
}) {
  const [selectedTab, setSelectedTab] = useState<TabOption>('current')
  const [reconfigureModalVisible, setReconfigureModalVisible] =
    useState<boolean>(false)
  const [hoverTab, setHoverTab] = useState<TabOption>()

  const {
    projectId,
    currentFC,
    queuedFC,
    queuedPayoutMods,
    queuedTicketMods,
    currentPayoutMods,
    currentTicketMods,
    isPreviewMode,
  } = useContext(ProjectContext)

  const {
    theme: { colors },
  } = useContext(ThemeContext)

  const tab = (option: TabOption) => (
    <div
      className="fundingWrapperTab"
      style={{
        textTransform: 'uppercase',
        cursor: 'pointer',
        borderBottom: '2px solid transparent',
        ...(option === selectedTab
          ? {
              color: colors.text.secondary,
              fontWeight: 600,
              borderImageSource:
                'linear-gradient(90deg, #06E6DA 0%, #3297DA 30%, #B5A8EE 62%, #FFFFFF 100%)',
              borderImageSlice: 1,
            }
          : {
              color: colors.text.tertiary,
              fontWeight: 500,
              borderColor: 'transparent',
            }),
        ...(option === hoverTab ? { color: colors.text.secondary } : {}),
      }}
      onClick={() => setSelectedTab(option)}
      onMouseEnter={() => setHoverTab(option)}
      onMouseLeave={() => setHoverTab(undefined)}
    >
      {option}
    </div>
  )

  let tabContent: JSX.Element

  switch (selectedTab) {
    case 'current':
      tabContent = <CurrentFundingCycle showCurrentDetail={showCurrentDetail} />
      break
    case 'upcoming':
      tabContent = <QueuedFundingCycle />
      break
    case 'history':
      tabContent = (
        <CardSection>
          <FundingHistory startId={currentFC?.basedOn} />
        </CardSection>
      )
      break
  }

  const canReconfigure = useHasPermission(OperatorPermission.Configure)

  if (!projectId) return null

  return (
    <div className="fundingWrapper">
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          padding: '0 20px',
          justifyContent: 'space-between',
          borderBottom: '2px solid #dfe7ff',
          marginBottom: '12px',
        }}
      >
        <SectionHeader
          text="Funding cycle"
          tip="A project's lifetime is defined in funding cycles. If a funding target is set, the project can withdraw no more than the target for the duration of the cycle."
          style={{
            marginBottom: 12,
          }}
        />
        <Space style={{ fontSize: '.8rem', marginBottom: 12 }} size="middle">
          {tab('current')}
          {currentFC?.duration.gt(0) ? tab('upcoming') : null}
          {tab('history')}
        </Space>
      </div>
      <div>{tabContent}</div>

      {canReconfigure && (
        <Button
          className="defaultBtn"
          style={{ marginTop: 20, marginLeft: 20 }}
          onClick={() => setReconfigureModalVisible(true)}
          size="small"
          disabled={isPreviewMode}
        >
          Reconfigure funding
        </Button>
      )}

      <ReconfigureFCModal
        visible={reconfigureModalVisible}
        fundingCycle={queuedFC?.number.gt(0) ? queuedFC : currentFC}
        payoutMods={
          queuedFC?.number.gt(0) ? queuedPayoutMods : currentPayoutMods
        }
        ticketMods={
          queuedFC?.number.gt(0) ? queuedTicketMods : currentTicketMods
        }
        projectId={projectId}
        onDone={() => setReconfigureModalVisible(false)}
      />
    </div>
  )
}
