import React, { useCallback, useContext, useMemo, useState } from 'react'
import { Button, Modal, Space } from 'antd'

import { BigNumber } from '@ethersproject/bignumber'
import { constants } from 'ethers'

import { OperatorPermission, useHasPermission } from 'hooks/HasPermission'

import RedeemModal from '../modals/RedeemModal'
import ConfirmUnstakeTokensModal from '../modals/ConfirmUnstakeTokensModal'
import ParticipantsModal from '../modals/ParticipantsModal'
import { ProjectContext } from '../../contexts/projectContext'
import useContractReader, { ContractUpdateOn } from '../../hooks/ContractReader'

import { ContractName } from '../../models/contract-name'
import { bigNumbersDiff } from '../../utils/bigNumbersDiff'
import { NetworkContext } from '../../contexts/networkContext'
import { useErc20Contract } from '../../hooks/Erc20Contract'
import { decodeFCMetadata } from '../../utils/fundingCycle'
import { formatWad, formatPercent } from '../../utils/formatNumber'

import IssueTicketsMobile from '../ProjectsDetailMobile/IssueTicketsMobile'

export default function YourBalance() {
  const [manageTokensModalVisible, setManageTokensModalVisible] =
    useState<boolean>()
  const [unstakeModalVisible, setUnstakeModalVisible] = useState<boolean>()
  const [participantsModalVisible, setParticipantsModalVisible] =
    useState<boolean>(false)
  const { projectId, tokenAddress, tokenSymbol, currentFC } =
    useContext(ProjectContext)
  const { userAddress } = useContext(NetworkContext)
  const [redeemModalVisible, setRedeemModalVisible] = useState<boolean>(false)
  const closeParticipantsModal = useCallback(
    () => setParticipantsModalVisible(false),
    [],
  )

  const stakedTokenBalance = useContractReader<BigNumber>({
    contract: ContractName.TicketBooth,
    functionName: 'stakedBalanceOf',
    args:
      userAddress && projectId ? [userAddress, projectId.toHexString()] : null,
    valueDidChange: bigNumbersDiff,
  })

  const ticketContract = useErc20Contract(tokenAddress)
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

  const ticketsUpdateOn: ContractUpdateOn = useMemo(
    () => [
      {
        contract: ContractName.TerminalV1,
        eventName: 'Pay',
        topics: projectId ? [[], projectId.toHexString()] : undefined,
      },
      {
        contract: ContractName.TerminalV1,
        eventName: 'PrintPreminedTickets',
        topics: projectId ? [projectId.toHexString()] : undefined,
      },
      {
        contract: ContractName.TicketBooth,
        eventName: 'Redeem',
        topics: projectId ? [projectId.toHexString()] : undefined,
      },
      {
        contract: ContractName.TicketBooth,
        eventName: 'Convert',
        topics:
          userAddress && projectId
            ? [userAddress, projectId.toHexString()]
            : undefined,
      },
    ],
    [projectId, userAddress],
  )
  const metadata = decodeFCMetadata(currentFC?.metadata)
  const reservedTicketBalance = useContractReader<BigNumber>({
    contract: ContractName.TerminalV1,
    functionName: 'reservedTicketBalanceOf',
    args:
      projectId && metadata?.reservedRate
        ? [projectId, metadata.reservedRate]
        : null,
    valueDidChange: bigNumbersDiff,
  })
  const ticketsBalance = useContractReader<BigNumber>({
    contract: ticketContract,
    functionName: 'balanceOf',
    args: ticketContract && userAddress ? [userAddress] : null,
    valueDidChange: bigNumbersDiff,
    updateOn: ticketsUpdateOn,
  })
  const iouBalance = useContractReader<BigNumber>({
    contract: ContractName.TicketBooth,
    functionName: 'stakedBalanceOf',
    args:
      userAddress && projectId ? [userAddress, projectId.toHexString()] : null,
    valueDidChange: bigNumbersDiff,
    updateOn: ticketsUpdateOn,
  })
  const totalSupply = useContractReader<BigNumber>({
    contract: ContractName.TicketBooth,
    functionName: 'totalSupplyOf',
    args: projectId ? [projectId?.toHexString()] : null,
    valueDidChange: bigNumbersDiff,
  })?.add(reservedTicketBalance ? reservedTicketBalance : BigNumber.from(0))

  const totalBalance = iouBalance?.add(ticketsBalance ?? 0)
  const share = formatPercent(totalBalance, totalSupply)
  const redeemDisabled = !totalOverflow || totalOverflow.eq(0)

  const ticketsIssued = tokenAddress
    ? tokenAddress !== constants.AddressZero
    : false
  const hasIssueTicketsPermission = useHasPermission(OperatorPermission.Issue)
  return (
    <div
      style={{
        width: '100%',
        background: '#ffffff',
        border: '1px solid #D3DCEE',
        padding: '15px',
        borderRadius: '3px',
        marginTop: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          borderBottom: '1px dashed #665FAC',
          paddingBottom: 5,
        }}
      >
        <h3
          style={{
            display: 'inline-block',
            fontSize: '16px',
            fontWeight: 'bold',
            fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
            color: '#1D1D1D',
            marginBottom: 0,
            width: '52%',
          }}
        >
          Your Balance
        </h3>
        {!ticketsIssued && hasIssueTicketsPermission && (
          <IssueTicketsMobile projectId={projectId} />
        )}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '60%',
            fontFamily: 'TeXGyreAdventor-Bold, TeXGyreAdventor',
            fontWeight: 'bold',
          }}
        >
          <div
            style={{ height: '40px', lineHeight: '40px', fontWeight: 'bold' }}
          >
            {formatWad(stakedTokenBalance, { decimals: 0 })} Tokens
          </div>
          <div style={{ fontWeight: 'bold' }}>
            {formatWad(iouBalance ?? 0, { decimals: 0 })}
            {ticketsIssued && <> Claimable</>}
          </div>
          <div style={{ fontSize: 12, color: '#9092A7' }}>
            {share || 0}% of supply
          </div>
        </div>
        <div
          style={{
            width: '40%',
          }}
        >
          <div
            className={'button-spec'}
            style={{ marginTop: '45px' }}
            onClick={() => setManageTokensModalVisible(true)}
          >
            MANAGE
          </div>
        </div>
      </div>

      <Modal
        title={`Manage ${tokenSymbol ? tokenSymbol + ' ' : ''}tokens`}
        visible={manageTokensModalVisible}
        onCancel={() => setManageTokensModalVisible(false)}
        okButtonProps={{ hidden: true }}
        centered
        footer={null}
        className="projectModal"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button
            className="defaultBtn"
            onClick={() => setRedeemModalVisible(true)}
            block
          >
            Return my METIS
          </Button>
          <Button
            className="defaultBtn"
            onClick={() => setUnstakeModalVisible(true)}
            block
          >
            Claim {tokenSymbol || 'tokens'} as ERC20
          </Button>
        </Space>
      </Modal>
      <RedeemModal
        visible={redeemModalVisible}
        redeemDisabled={redeemDisabled}
        totalBalance={totalBalance}
        totalSupply={totalSupply}
        onOk={() => {
          setRedeemModalVisible(false)
        }}
        onCancel={() => {
          setRedeemModalVisible(false)
        }}
      />
      <ConfirmUnstakeTokensModal
        visible={unstakeModalVisible}
        onCancel={() => setUnstakeModalVisible(false)}
      />
      <ParticipantsModal
        visible={participantsModalVisible}
        onCancel={closeParticipantsModal}
      />
    </div>
  )
}
