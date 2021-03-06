// import { CaretRightFilled, CheckCircleFilled } from '@ant-design/icons'
import { BigNumber } from '@ethersproject/bignumber'
import { Col, Row, Tabs, message } from 'antd'
import { Tabs as MobileTabs } from 'antd-mobile'
import { useForm } from 'antd/lib/form/Form'
import Modal from 'antd/lib/modal/Modal'
import Project from 'components/Dashboard/SmartProject'
import { NetworkContext } from 'contexts/networkContext'
import { ProjectContext, ProjectContextType } from 'contexts/projectContext'
// import { ThemeContext } from 'contexts/themeContext'
import { UserContext } from 'contexts/userContext'
import { constants, utils } from 'ethers'
import { useAppDispatch } from 'hooks/AppDispatch'
import {
  useAppSelector,
  useEditingFundingCycleSelector,
} from 'hooks/AppSelector'
import { CurrencyOption } from 'models/currency-option'
import { FCMetadata, FundingCycle } from 'models/funding-cycle'
import { FCProperties } from 'models/funding-cycle-properties'
import { PayoutMod, TicketMod } from 'models/mods'
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import { createGlobalStyle } from 'styled-components'
import { Prompt } from 'react-router-dom'
import { editingProjectActions } from 'redux/slices/editingProject'
import { fromPerbicent, fromPermille, fromWad } from 'utils/formatNumber'
import { encodeFCMetadata, hasFundingTarget } from 'utils/fundingCycle'
import {
  cidFromUrl,
  editMetadataForCid,
  logoNameForHandle,
  metadataNameForHandle,
  uploadProjectMetadata,
} from 'utils/ipfs'
import { feeForAmount } from 'utils/math'

import BudgetForm from './BudgetForm'
import ConfirmDeployProject from './ConfirmDeployProject'
import IncentivesForm from './IncentivesForm'
import PayModsForm from './PayModsForm'
import ProjectForm, { ProjectFormFields } from './ProjectForm'
import RulesForm from './RulesForm'
import TicketingForm, { TicketingFormFields } from './TicketingForm'

import './index.scss'

export default function Create() {
  const { TabPane } = Tabs
  const { transactor, contracts, adminFeePercent } = useContext(UserContext)
  const { signerNetwork, userAddress } = useContext(NetworkContext)
  // const { colors, radii } = useContext(ThemeContext).theme
  // const [currentStep, setCurrentStep] = useState<number>()
  // const [viewedSteps, setViewedSteps] = useState<number[]>([])
  const [tabKey, settabKey] = useState('1')
  const [payModsModalVisible, setPayModsFormModalVisible] =
    useState<boolean>(false)
  const [budgetFormModalVisible, setBudgetFormModalVisible] =
    useState<boolean>(false)
  const [projectFormModalVisible, setProjectFormModalVisible] =
    useState<boolean>(false)
  const [incentivesFormModalVisible, setIncentivesFormModalVisible] =
    useState<boolean>(false)
  const [ticketingFormModalVisible, setTicketingFormModalVisible] =
    useState<boolean>(false)
  const [rulesFormModalVisible, setRulesFormModalVisible] =
    useState<boolean>(false)
  const [deployProjectModalVisible, setDeployProjectModalVisible] =
    useState<boolean>(false)
  // const [continueModalVisible, setContinueModalVisible] =
  //   useState<boolean>(true)
  const [loadingCreate, setLoadingCreate] = useState<boolean>()
  const [projectForm] = useForm<ProjectFormFields>()
  const [ticketingForm] = useForm<TicketingFormFields>()
  const editingFC = useEditingFundingCycleSelector()
  const {
    info: editingProjectInfo,
    ticketMods: editingTicketMods,
    payoutMods: editingPayoutMods,
  } = useAppSelector(state => state.editingProject)
  const dispatch = useAppDispatch()

  const disableInfo = () => {
    message.info({
      content: 'Please fill and save all of the forms before deploy project',
      className: 'disableMesInfo',
      duration: 3,
    })
  }

  useEffect(() => {
    if (adminFeePercent) {
      dispatch(
        editingProjectActions.setFee(fromPerbicent(adminFeePercent).toString()),
      )
    }
  }, [adminFeePercent, dispatch])
  const [dirty, setDirty] = useState(false)
  useEffect(() => {
    window.onbeforeunload = dirty ? () => dirty : null
    return () => {
      window.onbeforeunload = () => null
    }
  }, [dirty])

  const resetProjectForm = useCallback(() => {
    projectForm.setFieldsValue({
      name: editingProjectInfo?.metadata.name ?? '',
      infoUri: editingProjectInfo?.metadata.infoUri ?? '',
      handle: editingProjectInfo?.handle ?? '',
      description: editingProjectInfo?.metadata.description ?? '',
      logoUri: editingProjectInfo?.metadata.logoUri ?? '',
      twitter: editingProjectInfo?.metadata.twitter ?? '',
      discord: editingProjectInfo?.metadata.discord ?? '',
      payButton: editingProjectInfo?.metadata.payButton ?? '',
      payDisclosure: editingProjectInfo?.metadata.payDisclosure ?? '',
    })
  }, [
    editingProjectInfo.handle,
    editingProjectInfo.metadata.description,
    editingProjectInfo.metadata.discord,
    editingProjectInfo.metadata.infoUri,
    editingProjectInfo.metadata.logoUri,
    editingProjectInfo.metadata.name,
    editingProjectInfo.metadata.payButton,
    editingProjectInfo.metadata.payDisclosure,
    editingProjectInfo.metadata.twitter,
    projectForm,
  ])

  const resetTicketingForm = useCallback(
    () =>
      ticketingForm.setFieldsValue({
        reserved: parseFloat(fromPerbicent(editingFC?.reserved)),
      }),
    [editingFC.reserved, ticketingForm],
  )

  useLayoutEffect(() => {
    dispatch(editingProjectActions.resetState())
    // Disable exhaustive-deps because we only need to reset the first time
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  useEffect(() => {
    resetProjectForm()
  }, [resetProjectForm])

  useEffect(() => {
    resetTicketingForm()
  }, [resetTicketingForm])

  const onPayModsFormSaved = (mods: PayoutMod[]) =>
    dispatch(editingProjectActions.setPayoutMods(mods))

  const onBudgetFormSaved = (
    currency: CurrencyOption,
    target: string,
    duration: string,
  ) => {
    dispatch(editingProjectActions.setTarget(target))
    dispatch(editingProjectActions.setDuration(duration))
    dispatch(editingProjectActions.setCurrency(currency))
  }

  const onProjectFormSaved = useCallback(() => {
    const fields = projectForm.getFieldsValue(true)
    dispatch(editingProjectActions.setName(fields.name))
    dispatch(editingProjectActions.setInfoUri(fields.infoUri))
    dispatch(editingProjectActions.setHandle(fields.handle))
    dispatch(editingProjectActions.setLogoUri(fields.logoUri))
    dispatch(editingProjectActions.setDescription(fields.description))
    dispatch(editingProjectActions.setTwitter(fields.twitter))
    dispatch(editingProjectActions.setDiscord(fields.discord))
    dispatch(editingProjectActions.setPayButton(fields.payButton))
    dispatch(editingProjectActions.setPayDisclosure(fields.payDisclosure))
  }, [dispatch, projectForm])

  const onTicketingFormSaved = (mods: TicketMod[]) => {
    const fields = ticketingForm.getFieldsValue(true)
    dispatch(editingProjectActions.setReserved(fields.reserved))
    dispatch(editingProjectActions.setTicketMods(mods))
  }

  const onRulesFormSaved = (ballot: string) => {
    dispatch(editingProjectActions.setBallot(ballot))
  }

  const onIncentivesFormSaved = (
    discountRate: string,
    bondingCurveRate: string,
  ) => {
    dispatch(editingProjectActions.setDiscountRate(discountRate))
    dispatch(editingProjectActions.setBondingCurveRate(bondingCurveRate))
  }

  const deployProject = useCallback(async () => {
    if (!transactor || !contracts || !editingFC) return

    setLoadingCreate(true)

    const uploadedMetadata = await uploadProjectMetadata(
      editingProjectInfo.metadata,
    )

    if (!uploadedMetadata.success) {
      setLoadingCreate(false)
      return
    }

    const fee = feeForAmount(editingFC.target, editingFC.fee)

    if (!fee) return

    // const targetWithFee = editingFC.target
    //   ?.add(hasFundingTarget(editingFC) ? fee : 0)
    //   .toHexString()

    const properties: Record<keyof FCProperties, any> = {
      target: editingFC.target.toHexString(),
      currency: hasFundingTarget(editingFC) ? editingFC.currency.toNumber() : 0,
      duration: editingFC.duration.toNumber(),
      discountRate: editingFC.duration.gt(0)
        ? editingFC.discountRate.toNumber()
        : 0,
      cycleLimit: editingFC.cycleLimit.toNumber(),
      ballot: editingFC.ballot,
    }

    const metadata: Omit<FCMetadata, 'version'> = {
      reservedRate: editingFC.reserved.toNumber(),
      bondingCurveRate: editingFC.bondingCurveRate.toNumber(),
      reconfigurationBondingCurveRate: editingFC.bondingCurveRate.toNumber(),
    }

    transactor(
      contracts.TerminalV1,
      'deploy',
      [
        userAddress,
        utils.formatBytes32String(editingProjectInfo.handle),
        uploadedMetadata.cid,
        properties,
        metadata,
        editingPayoutMods.map(m => ({
          preferUnstaked: false,
          percent: BigNumber.from(m.percent).toHexString(),
          lockedUntil: BigNumber.from(m.lockedUntil ?? 0).toHexString(),
          beneficiary: m.beneficiary || constants.AddressZero,
          projectId: m.projectId || BigNumber.from(0).toHexString(),
          allocator: constants.AddressZero,
        })),
        editingTicketMods.map(m => ({
          preferUnstaked: false,
          percent: BigNumber.from(m.percent).toHexString(),
          lockedUntil: BigNumber.from(m.lockedUntil ?? 0).toHexString(),
          beneficiary: m.beneficiary || constants.AddressZero,
          allocator: constants.AddressZero,
        })),
      ],
      {
        onDone: () => {
          setLoadingCreate(false)
        },
        onConfirmed: () => {
          setDeployProjectModalVisible(false)

          // Add project dependency to metadata and logo files
          editMetadataForCid(uploadedMetadata.cid, {
            name: metadataNameForHandle(editingProjectInfo.handle),
          })
          editMetadataForCid(cidFromUrl(editingProjectInfo.metadata.logoUri), {
            name: logoNameForHandle(editingProjectInfo.handle),
          })

          window.location.hash = '/congratulation/' + editingProjectInfo.handle
        },
      },
    )
  }, [
    contracts,
    editingFC,
    editingPayoutMods,
    editingProjectInfo.handle,
    editingProjectInfo.metadata,
    editingTicketMods,
    transactor,
    userAddress,
  ])

  // const spacing = 40

  const fundingCycle: FundingCycle = useMemo(
    () => ({
      ...editingFC,
      metadata: encodeFCMetadata(
        editingFC.reserved,
        editingFC.bondingCurveRate,
        1000,
      ),
    }),
    [editingFC],
  )
  const project = useMemo<ProjectContextType>(
    () => ({
      createdAt: new Date().valueOf() / 1000,
      projectType: 'standard',
      owner: userAddress,
      earned: BigNumber.from(0),
      currentFC: fundingCycle,
      currentPayoutMods: editingPayoutMods,
      currentTicketMods: editingTicketMods,
      metadata: editingProjectInfo.metadata,
      handle: editingProjectInfo.handle,
      projectId: BigNumber.from(0),
      queuedFC: undefined,
      queuedPayoutMods: undefined,
      queuedTicketMods: undefined,
      balance: BigNumber.from(0),
      balanceInCurrency: BigNumber.from(0),
      tokenSymbol: undefined,
      tokenAddress: constants.AddressZero,
      isPreviewMode: true,
      isArchived: false,
    }),
    [
      editingPayoutMods,
      editingProjectInfo.handle,
      editingProjectInfo.metadata,
      editingTicketMods,
      fundingCycle,
      userAddress,
    ],
  )

  const GutterMobile = window.innerWidth > 500 ? 80 : 36

  const GlobalStyle = createGlobalStyle`
    .appContent {
      background: #ffffff !important;
    }
  `

  const scrollToTop = () => {
    document.getElementById('createTop')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <ProjectContext.Provider value={project}>
      <GlobalStyle />
      <h1 className="createTitle" id="createTop">
        <div className="createTitleCon">
          CREATE A <span>NEW</span> PROJECT
        </div>
      </h1>
      <Row style={{ maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
        {window.innerWidth > 750 ? (
          <Tabs
            // centered
            defaultActiveKey="1"
            className="createTabs"
            tabPosition="top"
            activeKey={tabKey}
            onTabClick={params => {
              settabKey(params)
            }}
          >
            <TabPane
              tab={
                <div className="createTabPane">
                  <div>
                    <span className="createTabpaneNum">1</span>Appearance
                  </div>
                  {projectFormModalVisible ? (
                    <span className="createTabpaneRight"></span>
                  ) : (
                    <span className="createTabpaneArrow"></span>
                  )}
                </div>
              }
              key="1"
            >
              <Row gutter={GutterMobile} className="createTabWrapper">
                <Col xs={24} md={10}>
                  <ProjectForm
                    form={projectForm}
                    onSave={async () => {
                      await projectForm.validateFields()
                      setProjectFormModalVisible(true)
                      settabKey('2')
                      scrollToTop()
                      onProjectFormSaved()
                      if (!dirty) setDirty(true)
                    }}
                    onDeployBtn={() => {
                      if (
                        !editingProjectInfo?.metadata.name ||
                        !editingProjectInfo.handle
                      ) {
                        disableInfo()
                      } else {
                        setDirty(false)
                        setDeployProjectModalVisible(true)
                      }
                    }}
                    isDisable={false}
                  />
                </Col>
                <Col xs={24} md={14} className="hide-create-mobile">
                  <h3 className="smartPreviewTitle">Smart preview</h3>

                  <div className="smartPreviewWrapper">
                    <Project showCurrentDetail column />
                  </div>
                </Col>
              </Row>
            </TabPane>

            <TabPane
              tab={
                <div className="createTabPane">
                  <div>
                    <span className="createTabpaneNum">2</span>Funding
                  </div>

                  {budgetFormModalVisible ? (
                    <span className="createTabpaneRight"></span>
                  ) : (
                    <span className="createTabpaneArrow"></span>
                  )}
                </div>
              }
              key="2"
            >
              <Row gutter={GutterMobile} className="createTabWrapper">
                <Col xs={24} md={10}>
                  <BudgetForm
                    initialCurrency={
                      editingFC.currency.toNumber() as CurrencyOption
                    }
                    initialTarget={fromWad(editingFC.target)}
                    initialDuration={editingFC?.duration.toString()}
                    onSave={async (currency, target, duration) => {
                      onBudgetFormSaved(currency, target, duration)
                      setBudgetFormModalVisible(true)
                      settabKey('3')
                      scrollToTop()
                      if (!dirty) setDirty(true)
                    }}
                    onDeployBtn={() => {
                      if (
                        !editingProjectInfo?.metadata.name ||
                        !editingProjectInfo.handle
                      ) {
                        disableInfo()
                        settabKey('1')
                      } else {
                        setDirty(false)
                        setDeployProjectModalVisible(true)
                      }
                    }}
                    isDisable={false}
                  />
                </Col>
                <Col xs={24} md={14} className="hide-create-mobile">
                  <h3 className="smartPreviewTitle">Smart preview</h3>

                  <div className="smartPreviewWrapper">
                    <Project showCurrentDetail column />
                  </div>
                </Col>
              </Row>
            </TabPane>

            <TabPane
              tab={
                <div className="createTabPane">
                  <div>
                    <span className="createTabpaneNum">3</span>Distribution
                  </div>

                  {payModsModalVisible ? (
                    <span className="createTabpaneRight"></span>
                  ) : (
                    <span className="createTabpaneArrow"></span>
                  )}
                </div>
              }
              key="3"
            >
              <Row gutter={GutterMobile} className="createTabWrapper">
                <Col xs={24} md={10}>
                  <PayModsForm
                    initialMods={editingPayoutMods}
                    currency={editingFC.currency.toNumber() as CurrencyOption}
                    target={editingFC.target}
                    fee={editingFC.fee}
                    onSave={async mods => {
                      onPayModsFormSaved(mods)
                      setPayModsFormModalVisible(true)
                      settabKey('4')
                      scrollToTop()
                      if (!dirty) setDirty(true)
                    }}
                    onDeployBtn={() => {
                      if (
                        !editingProjectInfo?.metadata.name ||
                        !editingProjectInfo.handle
                      ) {
                        disableInfo()
                        settabKey('1')
                      } else {
                        setDirty(false)
                        setDeployProjectModalVisible(true)
                      }
                    }}
                    isDisable={false}
                  />
                </Col>
                <Col xs={24} md={14} className="hide-create-mobile">
                  <h3 className="smartPreviewTitle">Smart preview</h3>

                  <div className="smartPreviewWrapper">
                    <Project showCurrentDetail column />
                  </div>
                </Col>
              </Row>
            </TabPane>

            <TabPane
              tab={
                <div className="createTabPane">
                  <div>
                    <span className="createTabpaneNum">4</span>Reserved Tokens
                  </div>

                  {ticketingFormModalVisible ? (
                    <span className="createTabpaneRight"></span>
                  ) : (
                    <span className="createTabpaneArrow"></span>
                  )}
                </div>
              }
              key="4"
            >
              <Row gutter={GutterMobile} className="createTabWrapper">
                <Col xs={24} md={10}>
                  <TicketingForm
                    form={ticketingForm}
                    initialMods={editingTicketMods}
                    onSave={async mods => {
                      await ticketingForm.validateFields()
                      onTicketingFormSaved(mods)
                      setTicketingFormModalVisible(true)
                      settabKey('5')
                      scrollToTop()
                      if (!dirty) setDirty(true)
                    }}
                    onDeployBtn={() => {
                      if (
                        !editingProjectInfo?.metadata.name ||
                        !editingProjectInfo.handle
                      ) {
                        disableInfo()
                        settabKey('1')
                      } else {
                        setDirty(false)
                        setDeployProjectModalVisible(true)
                      }
                    }}
                    isDisable={false}
                  />
                </Col>
                <Col xs={24} md={14} className="hide-create-mobile">
                  <h3 className="smartPreviewTitle">Smart preview</h3>

                  <div className="smartPreviewWrapper">
                    <Project showCurrentDetail column />
                  </div>
                </Col>
              </Row>
            </TabPane>

            <TabPane
              tab={
                <div className="createTabPane">
                  <div>
                    <span className="createTabpaneNum">5</span>Reconfiguration
                  </div>

                  {rulesFormModalVisible ? (
                    <span className="createTabpaneRight"></span>
                  ) : (
                    <span className="createTabpaneArrow"></span>
                  )}
                </div>
              }
              key="5"
            >
              <Row gutter={GutterMobile} className="createTabWrapper">
                <Col xs={24} md={10}>
                  <RulesForm
                    initialBallot={editingFC.ballot}
                    onSave={(ballot: string) => {
                      onRulesFormSaved(ballot)
                      setRulesFormModalVisible(true)
                      settabKey('6')
                      if (!dirty) setDirty(true)
                    }}
                    onDeployBtn={() => {
                      if (
                        !editingProjectInfo?.metadata.name ||
                        !editingProjectInfo.handle
                      ) {
                        disableInfo()
                        settabKey('1')
                      } else {
                        setDirty(false)
                        setDeployProjectModalVisible(true)
                      }
                    }}
                    isDisable={false}
                  />
                </Col>
                <Col xs={24} md={14} className="hide-create-mobile">
                  <h3 className="smartPreviewTitle">Smart preview</h3>

                  <div className="smartPreviewWrapper">
                    <Project showCurrentDetail column />
                  </div>
                </Col>
              </Row>
            </TabPane>

            <TabPane
              tab={
                <div className="createTabPane">
                  <div>
                    <span className="createTabpaneNum">6</span>Incentives
                  </div>
                  {incentivesFormModalVisible ? (
                    <span className="createTabpaneRight"></span>
                  ) : (
                    <span className="createTabpaneArrow"></span>
                  )}
                </div>
              }
              key="6"
            >
              <Row gutter={GutterMobile} className="createTabWrapper">
                <Col xs={24} md={10}>
                  <IncentivesForm
                    initialDiscountRate={
                      editingFC.duration.eq(0)
                        ? '0'
                        : fromPermille(editingFC.discountRate)
                    }
                    initialBondingCurveRate={fromPerbicent(
                      editingFC.bondingCurveRate,
                    )}
                    disableDiscountRate={
                      editingFC.duration.eq(0)
                        ? 'Discount rate disabled while funding cycle duration is 0.'
                        : undefined
                    }
                    disableBondingCurve={
                      !hasFundingTarget(editingFC)
                        ? 'Bonding curve disabled while no funding target is set.'
                        : undefined
                    }
                    onSave={async (
                      discountRate: string,
                      bondingCurveRate: string,
                    ) => {
                      await ticketingForm.validateFields()
                      onIncentivesFormSaved(discountRate, bondingCurveRate)
                      setIncentivesFormModalVisible(true)
                      if (!dirty) setDirty(true)
                    }}
                    onDeployBtn={() => {
                      if (
                        !editingProjectInfo?.metadata.name ||
                        !editingProjectInfo.handle
                      ) {
                        disableInfo()
                        settabKey('1')
                      } else {
                        setDirty(false)
                        setDeployProjectModalVisible(true)
                      }
                    }}
                    isDisable={false}
                  />
                </Col>
                <Col xs={24} md={14} className="hide-create-mobile">
                  <h3 className="smartPreviewTitle">Smart preview</h3>

                  <div className="smartPreviewWrapper">
                    <Project showCurrentDetail column />
                  </div>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        ) : (
          <MobileTabs
            defaultActiveKey="1"
            className="createTabs"
            activeKey={tabKey}
            onChange={params => {
              settabKey(params)
            }}
          >
            <MobileTabs.Tab
              title={
                <div
                  className="createTabPane"
                  style={{
                    minWidth: projectFormModalVisible ? 'auto' : '112px',
                  }}
                >
                  <span className="createTabpaneNum">
                    <small>1</small>
                  </span>
                  <div className="createTabPaneMobileCon">
                    {projectFormModalVisible ? (
                      <span className="createTabpaneRight"></span>
                    ) : (
                      <>
                        <span className="createTabpaneInfo">Appearance</span>
                        <span className="createTabpaneArrow"></span>
                      </>
                    )}
                  </div>
                </div>
              }
              key="1"
            >
              <Row gutter={GutterMobile} className="createTabWrapper">
                <Col xs={24} md={10}>
                  <ProjectForm
                    form={projectForm}
                    onSave={async () => {
                      await projectForm.validateFields()
                      setProjectFormModalVisible(true)
                      settabKey('2')
                      scrollToTop()
                      onProjectFormSaved()
                      if (!dirty) setDirty(true)
                    }}
                    onDeployBtn={() => {
                      if (
                        !editingProjectInfo?.metadata.name ||
                        !editingProjectInfo.handle
                      ) {
                        disableInfo()
                      } else {
                        setDirty(false)
                        setDeployProjectModalVisible(true)
                      }
                    }}
                    isDisable={false}
                  />
                </Col>
                <Col xs={24} md={14} className="hide-create-mobile">
                  <h3 className="smartPreviewTitle">Smart preview</h3>

                  <div className="smartPreviewWrapper">
                    <Project showCurrentDetail column />
                  </div>
                </Col>
              </Row>
            </MobileTabs.Tab>

            <MobileTabs.Tab
              title={
                <div
                  className="createTabPane"
                  style={{
                    minWidth: budgetFormModalVisible ? 'auto' : '112px',
                  }}
                >
                  <span className="createTabpaneNum">
                    <small>2</small>
                  </span>
                  <div className="createTabPaneMobileCon">
                    {budgetFormModalVisible ? (
                      <span className="createTabpaneRight"></span>
                    ) : (
                      <>
                        <span className="createTabpaneInfo">Funding</span>
                        <span className="createTabpaneArrow"></span>
                      </>
                    )}
                  </div>
                </div>
              }
              key="2"
            >
              <Row gutter={GutterMobile} className="createTabWrapper">
                <Col xs={24} md={10}>
                  <BudgetForm
                    initialCurrency={
                      editingFC.currency.toNumber() as CurrencyOption
                    }
                    initialTarget={fromWad(editingFC.target)}
                    initialDuration={editingFC?.duration.toString()}
                    onSave={async (currency, target, duration) => {
                      onBudgetFormSaved(currency, target, duration)
                      setBudgetFormModalVisible(true)
                      settabKey('3')
                      scrollToTop()
                      if (!dirty) setDirty(true)
                    }}
                    onDeployBtn={() => {
                      if (
                        !editingProjectInfo?.metadata.name ||
                        !editingProjectInfo.handle
                      ) {
                        disableInfo()
                        settabKey('1')
                      } else {
                        setDirty(false)
                        setDeployProjectModalVisible(true)
                      }
                    }}
                    isDisable={false}
                  />
                </Col>
                <Col xs={24} md={14} className="hide-create-mobile">
                  <h3 className="smartPreviewTitle">Smart preview</h3>

                  <div className="smartPreviewWrapper">
                    <Project showCurrentDetail column />
                  </div>
                </Col>
              </Row>
            </MobileTabs.Tab>

            <MobileTabs.Tab
              title={
                <div
                  className="createTabPane"
                  style={{ minWidth: payModsModalVisible ? 'auto' : '112px' }}
                >
                  <span className="createTabpaneNum">
                    <small>3</small>
                  </span>
                  <div className="createTabPaneMobileCon">
                    {payModsModalVisible ? (
                      <span className="createTabpaneRight"></span>
                    ) : (
                      <>
                        <span className="createTabpaneInfo">Distribution</span>
                        <span className="createTabpaneArrow"></span>
                      </>
                    )}
                  </div>
                </div>
              }
              key="3"
            >
              <Row gutter={GutterMobile} className="createTabWrapper">
                <Col xs={24} md={10}>
                  <PayModsForm
                    initialMods={editingPayoutMods}
                    currency={editingFC.currency.toNumber() as CurrencyOption}
                    target={editingFC.target}
                    fee={editingFC.fee}
                    onSave={async mods => {
                      onPayModsFormSaved(mods)
                      setPayModsFormModalVisible(true)
                      settabKey('4')
                      scrollToTop()
                      if (!dirty) setDirty(true)
                    }}
                    onDeployBtn={() => {
                      if (
                        !editingProjectInfo?.metadata.name ||
                        !editingProjectInfo.handle
                      ) {
                        disableInfo()
                        settabKey('1')
                      } else {
                        setDirty(false)
                        setDeployProjectModalVisible(true)
                      }
                    }}
                    isDisable={false}
                  />
                </Col>
                <Col xs={24} md={14} className="hide-create-mobile">
                  <h3 className="smartPreviewTitle">Smart preview</h3>

                  <div className="smartPreviewWrapper">
                    <Project showCurrentDetail column />
                  </div>
                </Col>
              </Row>
            </MobileTabs.Tab>

            <MobileTabs.Tab
              title={
                <div
                  className="createTabPane"
                  style={{
                    minWidth: ticketingFormModalVisible ? 'auto' : '112px',
                  }}
                >
                  <span className="createTabpaneNum">
                    <small>4</small>
                  </span>
                  <div className="createTabPaneMobileCon">
                    {ticketingFormModalVisible ? (
                      <span className="createTabpaneRight"></span>
                    ) : (
                      <>
                        <span className="createTabpaneInfo">
                          Reserved Tokens
                        </span>
                        <span className="createTabpaneArrow"></span>
                      </>
                    )}
                  </div>
                </div>
              }
              key="4"
            >
              <Row gutter={GutterMobile} className="createTabWrapper">
                <Col xs={24} md={10}>
                  <TicketingForm
                    form={ticketingForm}
                    initialMods={editingTicketMods}
                    onSave={async mods => {
                      await ticketingForm.validateFields()
                      onTicketingFormSaved(mods)
                      setTicketingFormModalVisible(true)
                      settabKey('5')
                      scrollToTop()
                      if (!dirty) setDirty(true)
                    }}
                    onDeployBtn={() => {
                      if (
                        !editingProjectInfo?.metadata.name ||
                        !editingProjectInfo.handle
                      ) {
                        disableInfo()
                        settabKey('1')
                      } else {
                        setDirty(false)
                        setDeployProjectModalVisible(true)
                      }
                    }}
                    isDisable={false}
                  />
                </Col>
                <Col xs={24} md={14} className="hide-create-mobile">
                  <h3 className="smartPreviewTitle">Smart preview</h3>

                  <div className="smartPreviewWrapper">
                    <Project showCurrentDetail column />
                  </div>
                </Col>
              </Row>
            </MobileTabs.Tab>

            <MobileTabs.Tab
              title={
                <div
                  className="createTabPane"
                  style={{ minWidth: rulesFormModalVisible ? 'auto' : '112px' }}
                >
                  <span className="createTabpaneNum">
                    <small>5</small>
                  </span>
                  <div className="createTabPaneMobileCon">
                    {rulesFormModalVisible ? (
                      <span className="createTabpaneRight"></span>
                    ) : (
                      <>
                        <span className="createTabpaneInfo">
                          Reconfiguration
                        </span>
                        <span className="createTabpaneArrow"></span>
                      </>
                    )}
                  </div>
                </div>
              }
              key="5"
            >
              <Row gutter={GutterMobile} className="createTabWrapper">
                <Col xs={24} md={10}>
                  <RulesForm
                    initialBallot={editingFC.ballot}
                    onSave={(ballot: string) => {
                      onRulesFormSaved(ballot)
                      setRulesFormModalVisible(true)
                      settabKey('6')
                      if (!dirty) setDirty(true)
                    }}
                    onDeployBtn={() => {
                      if (
                        !editingProjectInfo?.metadata.name ||
                        !editingProjectInfo.handle
                      ) {
                        disableInfo()
                        settabKey('1')
                      } else {
                        setDirty(false)
                        setDeployProjectModalVisible(true)
                      }
                    }}
                    isDisable={false}
                  />
                </Col>
                <Col xs={24} md={14} className="hide-create-mobile">
                  <h3 className="smartPreviewTitle">Smart preview</h3>

                  <div className="smartPreviewWrapper">
                    <Project showCurrentDetail column />
                  </div>
                </Col>
              </Row>
            </MobileTabs.Tab>

            <MobileTabs.Tab
              title={
                <div
                  className="createTabPane"
                  style={{
                    minWidth: incentivesFormModalVisible ? 'auto' : '112px',
                  }}
                >
                  <span className="createTabpaneNum">
                    <small>6</small>
                  </span>
                  <div className="createTabPaneMobileCon">
                    {incentivesFormModalVisible ? (
                      <span className="createTabpaneRight"></span>
                    ) : (
                      <>
                        <span className="createTabpaneInfo">Incentives</span>
                        <span className="createTabpaneArrow"></span>
                      </>
                    )}
                  </div>
                </div>
              }
              key="6"
            >
              <Row gutter={GutterMobile} className="createTabWrapper">
                <Col xs={24} md={10}>
                  <IncentivesForm
                    initialDiscountRate={
                      editingFC.duration.eq(0)
                        ? '0'
                        : fromPermille(editingFC.discountRate)
                    }
                    initialBondingCurveRate={fromPerbicent(
                      editingFC.bondingCurveRate,
                    )}
                    disableDiscountRate={
                      editingFC.duration.eq(0)
                        ? 'Discount rate disabled while funding cycle duration is 0.'
                        : undefined
                    }
                    disableBondingCurve={
                      !hasFundingTarget(editingFC)
                        ? 'Bonding curve disabled while no funding target is set.'
                        : undefined
                    }
                    onSave={async (
                      discountRate: string,
                      bondingCurveRate: string,
                    ) => {
                      await ticketingForm.validateFields()
                      onIncentivesFormSaved(discountRate, bondingCurveRate)
                      setIncentivesFormModalVisible(true)
                      if (!dirty) setDirty(true)
                    }}
                    onDeployBtn={() => {
                      if (
                        !editingProjectInfo?.metadata.name ||
                        !editingProjectInfo.handle
                      ) {
                        disableInfo()
                        settabKey('1')
                      } else {
                        setDirty(false)
                        setDeployProjectModalVisible(true)
                      }
                    }}
                    isDisable={false}
                  />
                </Col>
                <Col xs={24} md={14} className="hide-create-mobile">
                  <h3 className="smartPreviewTitle">Smart preview</h3>

                  <div className="smartPreviewWrapper">
                    <Project showCurrentDetail column />
                  </div>
                </Col>
              </Row>
            </MobileTabs.Tab>
          </MobileTabs>
        )}
        <Modal
          className="createPreviewModal"
          visible={deployProjectModalVisible}
          okText={
            signerNetwork
              ? 'Deploy project on ' + signerNetwork
              : 'Deploy project'
          }
          onOk={deployProject}
          confirmLoading={loadingCreate}
          onCancel={() => {
            if (!dirty) setDirty(true)
            setDeployProjectModalVisible(false)
          }}
        >
          <ConfirmDeployProject />
        </Modal>
        <Prompt
          when={dirty}
          message={(location, action) => {
            return ' Leaving now may lose the information you have filled in. Are you sure you want to leave now?'
          }}
        />
      </Row>
    </ProjectContext.Provider>
  )
}
