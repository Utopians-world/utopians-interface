import React, {
  CSSProperties,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'
import { Row, Col } from 'antd'

import { BigNumber } from '@ethersproject/bignumber'

import { useForm } from 'antd/lib/form/Form'

import '../../styles/overrides/modal.scss'
import { ProjectContext } from '../../contexts/projectContext'
import { PayoutMod, TicketMod } from '../../models/mods'
import { decodeFCMetadata } from '../../utils/fundingCycle'
import { editingProjectActions } from '../../redux/slices/editingProject'
import { serializeFundingCycle } from '../../utils/serializers'

import { fromPerbicent } from '../../utils/formatNumber'
import { useAppDispatch } from '../../hooks/AppDispatch'

import { TicketingFormFields } from '../Create/TicketingForm'
import ProjectTitleMobile from './ProjectTitleMobile'
import FundingCycleTitleMobile from './FundingCycleTitleMobile'
import FundOverviewMobile from './FundOverviewMobile'
import UTOTokenMobile from './UTOTokenMobile'
import DistributionMobile from './DistributionMobile'
import ReservedMobile from './ReservedMobile'
import YourBalanceMobile from './YourBalanceMobile'
import ActivityMobile from './ActivityMobile'
import FundUsMobile from './FundUsMobile'
import BalanceTimelineMobile from './BalanceTimelineMobile'

export default function ProjectsDetailMobile() {
  const MainLayout: CSSProperties = {
    width: '100%',
    zIndex: 2,
    background: '#ffffff',
  }
  const LeftLayout: CSSProperties = {
    minHeight: '1000px',
    padding: '5px 20px',
    zIndex: 2,
  }
  const [stateVisible, setStateVisible] = useState<boolean>(false)
  useEffect(() => {
    window.addEventListener('scroll', () => setStateVisible(true))
    setTimeout(() => {
      if (stateVisible) setStateVisible(false)
    }, 1000)
    return () => {
      // 卸载组件时解除对事件的绑定
      window.removeEventListener('scroll', () => setStateVisible(true))
    }
  })

  const {
    queuedFC,
    queuedPayoutMods,
    currentPayoutMods,
    queuedTicketMods,
    currentTicketMods,
    currentFC,
  } = useContext(ProjectContext)
  const [ticketingForm] = useForm<TicketingFormFields>()
  const dispatch = useAppDispatch()
  const fundingCycle = queuedFC?.number.gt(0) ? queuedFC : currentFC
  const payoutMods = queuedFC?.number.gt(0)
    ? queuedPayoutMods
    : currentPayoutMods
  const ticketMods = queuedFC?.number.gt(0)
    ? queuedTicketMods
    : currentTicketMods

  const [editingPayoutMods, setEditingPayoutMods] = useState<PayoutMod[]>([])
  const [editingTicketMods, setEditingTicketMods] = useState<TicketMod[]>([])

  useLayoutEffect(() => {
    if (!fundingCycle || !ticketMods || !payoutMods) return
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
    setEditingTicketMods(ticketMods)
    setEditingPayoutMods(payoutMods)
    ticketingForm.setFieldsValue({
      reserved: parseFloat(fromPerbicent(metadata.reservedRate)),
    })
  }, [dispatch, fundingCycle, payoutMods, ticketMods, ticketingForm])

  return (
    <Row style={MainLayout} className="mainLayout">
      {!stateVisible ? <FundUsMobile /> : ' '}
      <Col span={24} style={LeftLayout}>
        <ProjectTitleMobile />
        <FundingCycleTitleMobile
          payoutMods={editingPayoutMods}
          ticketMods={editingTicketMods}
        />
        <FundOverviewMobile
          payoutMods={editingPayoutMods}
          ticketMods={editingTicketMods}
        />
        <div style={{ marginTop: '20px' }} className="chartsStyle">
          <BalanceTimelineMobile height={240} />
        </div>
        <UTOTokenMobile
          payoutMods={editingPayoutMods}
          ticketMods={editingTicketMods}
          fundingCycle={fundingCycle}
        />
        <DistributionMobile
          payoutMods={editingPayoutMods}
          ticketMods={editingTicketMods}
        />
        <ReservedMobile
          payoutMods={editingPayoutMods}
          ticketMods={editingTicketMods}
          fundingCycle={queuedFC?.number.gt(0) ? queuedFC : currentFC}
        />
        <YourBalanceMobile />
        <ActivityMobile />
      </Col>
    </Row>
  )
}
