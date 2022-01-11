import React, {
  CSSProperties,
  useContext,
  useLayoutEffect,
  useState,
} from 'react'
import { Row, Col } from 'antd'

import FundOverview from './FundOverview'
import JBXToken from './JBXToken'
import Distribution from './Distribution'
import Reserved from './Reserved'
import FundUs from './FundUs'
import YourBalance from './YourBalance'
import Activity from './Activity'
import '../../styles/overrides/modal.scss'
import FundingCycleTitle from './FundingCycleTitle'
import ProjectTitle from './ProjectTitle'
import { ProjectContext } from '../../contexts/projectContext'
import BalanceTimeline from '../Dashboard/BalanceTimeline'
import { PayoutMod, TicketMod } from '../../models/mods'
import { decodeFCMetadata } from '../../utils/fundingCycle'
import { editingProjectActions } from '../../redux/slices/editingProject'
import { serializeFundingCycle } from '../../utils/serializers'
import { BigNumber } from '@ethersproject/bignumber'
import { fromPerbicent } from '../../utils/formatNumber'
import { useAppDispatch } from '../../hooks/AppDispatch'
import { useForm } from 'antd/lib/form/Form'
import { TicketingFormFields } from '../Create/TicketingForm'

export default function ProjectsDetail() {
  const MainLayout: CSSProperties = {
    maxWidth: '1420px',
    width: '100%',
    margin: '40px auto',
    paddingLeft: '20px',
    zIndex: 2,
  }
  const LeftLayout: CSSProperties = {
    minHeight: '1000px',
    background: '#ffffff',
    marginRight: '3%',
    padding: '20px',
    borderRadius: '3px',
    border: '1px solid #D3DCEE',
    zIndex: 2,
  }

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
    <Row gutter={20} style={MainLayout} className="mainLayout">
      <Col span={17} style={LeftLayout}>
        <ProjectTitle />
        <FundingCycleTitle
          payoutMods={editingPayoutMods}
          ticketMods={editingTicketMods}
        />
        <FundOverview
          payoutMods={editingPayoutMods}
          ticketMods={editingTicketMods}
        />
        <div style={{ marginTop: '20px' }} className="chartsStyle">
          <BalanceTimeline height={240} />
        </div>
        <JBXToken
          payoutMods={editingPayoutMods}
          ticketMods={editingTicketMods}
          fundingCycle={fundingCycle}
        />
        <Distribution
          payoutMods={editingPayoutMods}
          ticketMods={editingTicketMods}
        />
        <Reserved
          payoutMods={editingPayoutMods}
          ticketMods={editingTicketMods}
          fundingCycle={queuedFC?.number.gt(0) ? queuedFC : currentFC}
        />
      </Col>
      <Col span={6} style={{ zIndex: 2 }}>
        <FundUs />
        <YourBalance />
        <Activity />
      </Col>
      <div className="indexBackground"> </div>
    </Row>
  )
}
