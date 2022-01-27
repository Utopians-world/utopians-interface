import { CSSProperties, useContext, useLayoutEffect, useState } from 'react'
import { Modal, Space } from 'antd'

import { CheckCircleFilled } from '@ant-design/icons'
import { constants } from 'ethers'

import { BigNumber } from '@ethersproject/bignumber'

import ModalTab from '../ProjectsDetail/ModalTab'
import { ballotStrategies } from '../../constants/ballot-strategies'
import { useEditingFundingCycleSelector } from '../../hooks/AppSelector'
import { UserContext } from '../../contexts/userContext'
import { useAppDispatch } from '../../hooks/AppDispatch'
import { editingProjectActions } from '../../redux/slices/editingProject'
import { FCProperties } from '../../models/funding-cycle-properties'
import { FCMetadata } from '../../models/funding-cycle'
import { PayoutMod, TicketMod } from '../../models/mods'

// import {FundingCycleTitle} from "../../models/funding-cycle";

export default function DetailEditRuleMobileModal({
  visible,
  onSuccess,
  onCancel,
  projectId,
  payoutMods,
  ticketMods,
}: // fundingCycle
{
  visible?: boolean
  onSuccess?: VoidFunction
  onCancel: VoidFunction
  projectId?: BigNumber
  payoutMods: PayoutMod[]
  ticketMods: TicketMod[]

  // fundingCycle?: FundingCycleTitle | undefined
}) {
  const editingFC = useEditingFundingCycleSelector()
  const initialBallot = editingFC.ballot
  const [selectedIndex, setSelectedIndex] = useState<number>()
  const [customStrategyAddress, setCustomStrategyAddress] = useState<string>()

  const { transactor, contracts } = useContext(UserContext)
  const [loading, setLoading] = useState<boolean>()
  const dispatch = useAppDispatch()
  const onRulesFormSaved = (ballot: string) => {
    dispatch(editingProjectActions.setBallot(ballot))
  }

  async function updateRule(ballot: string) {
    if (!transactor || !contracts?.TerminalV1 || !projectId) return
    setLoading(true)

    const properties: Record<keyof FCProperties, string> = {
      target: editingFC.target.toHexString(),
      currency: editingFC.currency.toHexString(),
      duration: editingFC.duration.toHexString(),
      discountRate: editingFC.discountRate.toHexString(),
      cycleLimit: BigNumber.from(0).toHexString(),
      ballot: ballot,
    }

    const metadata: Omit<FCMetadata, 'version'> = {
      reservedRate: editingFC.reserved.toNumber(),
      bondingCurveRate: editingFC.bondingCurveRate.toNumber(),
      reconfigurationBondingCurveRate: editingFC.bondingCurveRate.toNumber(),
    }

    transactor(
      contracts.TerminalV1,
      'configure',
      [
        projectId.toHexString(),
        properties,
        metadata,
        payoutMods.map(m => ({
          preferUnstaked: false,
          percent: BigNumber.from(m.percent).toHexString(),
          lockedUntil: BigNumber.from(m.lockedUntil ?? 0).toHexString(),
          beneficiary: m.beneficiary || constants.AddressZero,
          projectId: m.projectId || BigNumber.from(0).toHexString(),
          allocator: constants.AddressZero,
        })),
        ticketMods.map(m => ({
          preferUnstaked: false,
          percent: BigNumber.from(m.percent).toHexString(),
          lockedUntil: BigNumber.from(m.lockedUntil ?? 0).toHexString(),
          beneficiary: m.beneficiary || constants.AddressZero,
          allocator: constants.AddressZero,
        })),
      ],
      {
        onDone: () => {
          onRulesFormSaved(ballot)
          setLoading(false)
          onCancel()
        },
      },
    )
  }

  useLayoutEffect(() => {
    const index = ballotStrategies.findIndex(
      s => s.address.toLowerCase() === initialBallot.toLowerCase(),
    )
    if (index > -1) setSelectedIndex(index)
    else {
      setSelectedIndex(ballotStrategies.length)
      setCustomStrategyAddress(initialBallot)
    }
  }, [initialBallot])
  const SecondDivStyle: CSSProperties = {
    width: '15%',
    textAlign: 'center',
    lineHeight: '190px',
  }
  // console.log(fundingCycle)

  return (
    <Modal
      title={'Edit reconfiguration strategy'}
      visible={visible}
      onCancel={onCancel}
      confirmLoading={loading}
      width={670}
      centered={true}
      cancelText={'CANCEL'}
      okText={'SAVE CHANGES'}
      onOk={() => {
        updateRule(
          selectedIndex !== undefined && selectedIndex < ballotStrategies.length
            ? ballotStrategies[selectedIndex].address
            : customStrategyAddress ?? constants.AddressZero,
        )
      }}
      className="projectModal"
    >
      <Space
        direction="vertical"
        size="large"
        style={{ gap: '20px!important' }}
      >
        <ModalTab
          textFirst={'Changes will be applied to the'}
          textSecond={' upcoming '}
          textLast={'funding cycle.'}
        />
        <div
          style={{
            ...(selectedIndex === 0 ? { border: '2px solid #3A1FF5' } : {}),
            height: '190px',
          }}
          onClick={() => setSelectedIndex(0)}
          key={0}
          className="editRule"
        >
          <div style={{ width: '85%', fontSize: '12px', padding: '10px 20px' }}>
            <div
              style={{
                fontSize: '18px',
                fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
                fontWeight: 'bold',
              }}
            >
              NO strategy
            </div>
            <p>
              Any reconfiguration to an upcoming funding cycle will take effect
              once the current cycle ends. A project with no strategy may be
              vulnerable to being rug-pulled by its owner.
            </p>
            <div
              style={{
                marginTop: '10px',
                color: '#9092A7',
                fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
                fontWeight: 'bold',
              }}
            >
              Contract Address 0X0003034304930493049304930493403493049343049304
            </div>
          </div>
          <div style={SecondDivStyle}>
            {0 === selectedIndex ? (
              <CheckCircleFilled
                style={{ fontSize: '22px', color: '#3A1FF5' }}
              />
            ) : (
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '10px',
                  border: '2px solid #D3DCEE',
                  margin: '82px auto',
                }}
              >
                {' '}
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            ...(selectedIndex === 1 ? { border: '2px solid #3A1FF5' } : {}),
            height: '190px',
          }}
          onClick={() => setSelectedIndex(1)}
          key={1}
          className="editRule"
        >
          <div style={{ width: '85%', fontSize: '12px', padding: '10px 20px' }}>
            <div
              style={{
                fontSize: '18px',
                fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
                fontWeight: 'bold',
              }}
            >
              7-day delay
            </div>
            <p>
              A reconfiguration to an upcoming funding cycle must be submitted
              at least 7 days before it starts.
            </p>
            <div
              style={{
                marginTop: '25px',
                color: '#9092A7',
                fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
                fontWeight: 'bold',
              }}
            >
              Contract Address 0x01bE2c1d3b5833DAdc6b21834C76657DeEE8cDfE
            </div>
          </div>
          <div style={SecondDivStyle}>
            {1 === selectedIndex ? (
              <CheckCircleFilled
                style={{ fontSize: '22px', color: '#3A1FF5' }}
              />
            ) : (
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '10px',
                  border: '2px solid #D3DCEE',
                  margin: '82px auto',
                }}
              >
                {' '}
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            height: '190px',
            ...(selectedIndex === 2 ? { border: '2px solid #3A1FF5' } : {}),
          }}
          onClick={() => setSelectedIndex(2)}
          key={2}
          className="editRule"
        >
          <div style={{ width: '85%', fontSize: '12px', padding: '10px 20px' }}>
            <div
              style={{
                fontSize: '18px',
                fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
                fontWeight: 'bold',
              }}
            >
              3-day delay
            </div>
            <p>
              A reconfiguration to an upcoming funding cycle must be submitted
              at least 3 days before it starts.
            </p>
            <div
              style={{
                marginTop: '25px',
                color: '#9092A7',
                fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
                fontWeight: 'bold',
              }}
            >
              Contract Address 0x509058f8B9A49D399B64554b21E7018c3641a0cC
            </div>
          </div>
          <div style={SecondDivStyle}>
            {2 === selectedIndex ? (
              <CheckCircleFilled
                style={{ fontSize: '22px', color: '#3A1FF5' }}
              />
            ) : (
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '10px',
                  border: '2px solid #D3DCEE',
                  margin: '82px auto',
                }}
              >
                {' '}
              </div>
            )}
          </div>
        </div>
        {/*<div*/}
        {/*  style={{*/}
        {/*    ...(selectedIndex === 3 ? { border: '2px solid #3A1FF5' } : {}),*/}
        {/*  }}*/}
        {/*  onClick={() => setSelectedIndex(3)}*/}
        {/*  key={3}*/}
        {/*  className="editRule"*/}
        {/*>*/}
        {/*  <div style={{ width: '85%', fontSize: '12px', padding: '10px 20px' }}>*/}
        {/*    <div style={{ fontSize: '18px' }}>Custom strategy</div>*/}
        {/*    <div>*/}
        {/*      <Input*/}
        {/*        style={InputStyle}*/}
        {/*        value={customStrategyAddress}*/}
        {/*        placeholder={constants.AddressZero}*/}
        {/*        onChange={e =>*/}
        {/*          setCustomStrategyAddress(e.target.value.toLowerCase())*/}
        {/*        }*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*    <div>*/}
        {/*      The address of any smart contract deployed on {signerNetwork}*/}
        {/*      <a*/}
        {/*        style={{ color: '#3A1FF5' }}*/}
        {/*        href="https://github.com/upt-protocol/juice-contracts-v1/blob/05828d57e3a27580437fc258fe9041b2401fc044/contracts/FundingCycles.sol"*/}
        {/*        target="_blank"*/}
        {/*        rel="noopener noreferrer"*/}
        {/*      >*/}
        {/*        this interface*/}
        {/*      </a>*/}
        {/*      .*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div style={SecondDivStyle}>*/}
        {/*    {3 === selectedIndex ? (*/}
        {/*      <CheckCircleFilled*/}
        {/*        style={{ fontSize: '22px', color: '#3A1FF5' }}*/}
        {/*      />*/}
        {/*    ) : (*/}
        {/*      <div*/}
        {/*        style={{*/}
        {/*          width: '20px',*/}
        {/*          height: '20px',*/}
        {/*          borderRadius: '10px',*/}
        {/*          border: '2px solid #D3DCEE',*/}
        {/*          margin: '55px auto',*/}
        {/*        }}*/}
        {/*      >*/}
        {/*        {' '}*/}
        {/*      </div>*/}
        {/*    )}*/}
        {/*  </div>*/}
        {/*</div>*/}
      </Space>
    </Modal>
  )
}
