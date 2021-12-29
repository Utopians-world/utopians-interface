import React, { useContext, useState } from 'react'
import { Space } from 'antd'

import { BigNumber } from '@ethersproject/bignumber'

import useContractReader from '../../hooks/ContractReader'

import { ContractName } from '../../models/contract-name'
import { bigNumbersDiff } from '../../utils/bigNumbersDiff'
import { ProjectContext } from '../../contexts/projectContext'
import { decodeFCMetadata, hasFundingTarget } from '../../utils/fundingCycle'
import { formatWad } from '../../utils/formatNumber'
import DetailEdit from '../icons/DetailEdit'
import DetailIncentivesModal from '../modals/DetailIncentivesModal'
import DetailIssueModal from '../modals/DetailIssueModal'
import { useEditingFundingCycleSelector } from '../../hooks/AppSelector'
import TooltipLabel from '../shared/TooltipLabel'

export default function JBXToken() {
  const { projectId, currentFC } = useContext(ProjectContext)
  const [DetailIssueVisible, setDetailIssueVisible] = useState<boolean>(false)
  const [DetailIncentiveVisible, setDetailIncentiveVisible] =
    useState<boolean>(false)

  const metadata = decodeFCMetadata(currentFC?.metadata)
  const editingFC = useEditingFundingCycleSelector()
  const reservedTicketBalance = useContractReader<BigNumber>({
    contract: ContractName.TerminalV1,
    functionName: 'reservedTicketBalanceOf',
    args:
      projectId && metadata?.reservedRate
        ? [projectId, metadata.reservedRate]
        : null,
    valueDidChange: bigNumbersDiff,
  })

  const totalSupply = useContractReader<BigNumber>({
    contract: ContractName.TicketBooth,
    functionName: 'totalSupplyOf',
    args: projectId ? [projectId?.toHexString()] : null,
    valueDidChange: bigNumbersDiff,
  })?.add(reservedTicketBalance ? reservedTicketBalance : BigNumber.from(0))

  return (
    <div
      style={{
        width: '100%',
        marginTop: '20px',
      }}
    >
      <Space>
        <TooltipLabel
          label={
            <div
              style={{
                display: 'inline-block',
                fontSize: '20px',
                marginRight: '10px',
                fontWeight: 'bold',
              }}
            >
              Token
            </div>
          }
          tip="Tokens are distributed to anyone who pays this
              project. If the project has set a funding target, tokens
              can be redeemed for a portion of the project's
              overflow whether or not they have been claimed yet."
        />
        <div className="editIcon" onClick={() => setDetailIssueVisible(true)}>
          <DetailEdit />
        </div>
      </Space>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          border: '1px solid #D3DCEE',
          borderRadius: '5px',
          padding: '15px 37px',
          marginTop: '10px',
        }}
      >
        <div
          style={{
            width: '25%',
          }}
        >
          <div>Address</div>
          <div>Total supply</div>
        </div>
        <div
          style={{
            width: '45%',
          }}
        >
          <div>0x9329582…..f3434242</div>
          <div>
            {formatWad(totalSupply, { decimals: 0 })}
            <span style={{ fontWeight: 'bold' }}> JBX</span>
          </div>
        </div>
        <div
          style={{
            width: '30%',
          }}
        >
          <div
            className={'button-spec'}
            onClick={() => setDetailIncentiveVisible(true)}
          >
            SHOW HOLDER
          </div>
        </div>
      </div>
      <DetailIncentivesModal
        // form={projectForm}
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
        visible={DetailIssueVisible}
        onSuccess={() => setDetailIssueVisible(false)}
        onCancel={() => setDetailIssueVisible(false)}
      />
      <DetailIssueModal
        visible={DetailIncentiveVisible}
        onSuccess={() => setDetailIncentiveVisible(false)}
        onCancel={() => setDetailIncentiveVisible(false)}
      />
    </div>
  )
}
