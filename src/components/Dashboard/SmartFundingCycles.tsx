import { Button, Space } from 'antd'
import ReconfigureFCModal from 'components/modals/ReconfigureFCModal'
import { CardSection } from 'components/shared/CardSection'
import { ProjectContext } from 'contexts/projectContext'
import { ThemeContext } from 'contexts/themeContext'
import { OperatorPermission, useHasPermission } from 'hooks/HasPermission'
import { useContext, useState } from 'react'
import { BigNumber } from '@ethersproject/bignumber'

import SmartCurrentFundingCycle from '../FundingCycle/SmartCurrentFundingCycle'
import QueuedFundingCycle from '../FundingCycle/QueuedFundingCycle'
import FundingHistory from './FundingHistory'
import SectionHeader from './SectionHeader'

type TabOption = 'inprogress' | 'upcoming' | 'history'

export default function FundingCycles({
  showCurrentDetail,
  totalOverflow,
}: {
  showCurrentDetail?: boolean
  totalOverflow: BigNumber | undefined
}) {
  const [selectedTab, setSelectedTab] = useState<TabOption>('inprogress')
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
              borderImageSlice: '0 0 1 0',
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
    case 'inprogress':
      tabContent = (
        <SmartCurrentFundingCycle
          showCurrentDetail={showCurrentDetail}
          totalOverflow={totalOverflow}
        />
      )
      break
    case 'upcoming':
      tabContent = (
        <CardSection>
          <QueuedFundingCycle />
        </CardSection>
      )
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
            marginBottom: 6,
          }}
        />
        <Space style={{ fontSize: '.8rem' }} size="middle">
          {tab('inprogress')}
          {currentFC?.duration.gt(0) ? tab('upcoming') : null}
          {tab('history')}
        </Space>
      </div>
      <div>{tabContent}</div>

      {!showCurrentDetail && canReconfigure && (
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
