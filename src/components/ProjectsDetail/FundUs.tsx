import React, { useContext, useMemo, useState } from 'react'
import { Button, Tooltip } from 'antd'

import { parseEther } from 'ethers/lib/utils'

import { BigNumber } from '@ethersproject/bignumber'

import { CurrencyOption } from '../../models/currency-option'
import { ProjectContext } from '../../contexts/projectContext'
import { useCurrencyConverter } from '../../hooks/CurrencyConverter'
import { decodeFCMetadata } from '../../utils/fundingCycle'

import { formatWad } from '../../utils/formatNumber'
import { weightedRate } from '../../utils/math'
import { readNetwork } from '../../constants/networks'
import { NetworkName } from '../../models/network-name'
import FormattedNumberInput from '../shared/inputs/FormattedNumberInput'
import InputAccessoryButton from '../shared/InputAccessoryButton'
import { currencyName } from '../../utils/currency'
import CurrencySymbol from '../shared/CurrencySymbol'
import PayWarningModal from '../modals/PayWarningModal'
import ConfirmPayOwnerModal from '../modals/ConfirmPayOwnerModal'

export default function FundUs() {
  const [payIn, setPayIn] = useState<CurrencyOption>(0)
  const [payAmount, setPayAmount] = useState<string>()
  const [payModalVisible, setPayModalVisible] = useState<boolean>(false)
  const [payWarningModalVisible, setPayWarningModalVisible] =
    useState<boolean>(false)

  const { projectId, currentFC, metadata, tokenSymbol, isArchived } =
    useContext(ProjectContext)

  const converter = useCurrencyConverter()

  const fcMetadata = decodeFCMetadata(currentFC?.metadata)

  const weiPayAmt =
    payIn === 1 ? converter.usdToWei(payAmount) : parseEther(payAmount ?? '0')

  function pay() {
    setPayWarningModalVisible(true)
  }

  const formatReceivedTickets = (wei: BigNumber) =>
    formatWad(weightedRate(currentFC, wei, 'payer'), { decimals: 0 })

  const isConstitutionDAO =
    readNetwork.name === NetworkName.mainnet && projectId?.eq(36)

  const payButton = useMemo(() => {
    if (!metadata || !currentFC) return null

    const payButtonText = metadata.payButton?.length
      ? metadata.payButton
      : 'Pay'

    if (isArchived) {
      return (
        <Tooltip
          title="This project has been archived and cannot be paid."
          className="block"
        >
          <Button style={{ width: '100%' }} type="primary" disabled>
            {payButtonText}
          </Button>
        </Tooltip>
      )
    } else if (fcMetadata?.reservedRate === 200 || isConstitutionDAO) {
      return (
        <Tooltip
          title="Paying this project is currently disabled"
          className="block"
        >
          <Button style={{ width: '100%' }} type="primary" disabled>
            {payButtonText}
          </Button>
        </Tooltip>
      )
    } else {
      return (
        <Button
          style={{ width: '100%' }}
          type="primary"
          disabled={currentFC.configured.eq(0) || isArchived}
          onClick={weiPayAmt ? pay : undefined}
          className="payButton"
        >
          {payButtonText}
        </Button>
      )
    }
  }, [
    metadata,
    currentFC,
    isArchived,
    fcMetadata,
    isConstitutionDAO,
    weiPayAmt,
  ])

  if (!currentFC || !projectId || !metadata) return null

  return (
    <div>
      <div
        style={{
          width: '100%',
          background: '#ffffff',
          border: '1px solid #D3DCEE',
          padding: '15px',
          borderRadius: '3px',
        }}
      >
        <h3 style={{ color: '#1D1D1D' }}>Fund us</h3>
        <div className="fundUsStyle">
          <FormattedNumberInput
            placeholder="0"
            disabled={currentFC.configured.eq(0)}
            onChange={val => setPayAmount(val)}
            value={payAmount}
            min={0}
            accessory={
              <InputAccessoryButton
                // withArrow={true}
                content={currencyName(payIn)}
                onClick={() => setPayIn(0)}
              />
            }
          />

          <div style={{ fontSize: '.7rem', margin: '10px 0' }}>
            Receive{' '}
            {weiPayAmt?.gt(0) ? (
              formatReceivedTickets(weiPayAmt) + ' ' + (tokenSymbol ?? 'tokens')
            ) : (
              <span>
                {formatReceivedTickets(
                  (payIn === 0 ? parseEther('1') : converter.usdToWei('1')) ??
                    BigNumber.from(0),
                )}{' '}
                {tokenSymbol ?? 'tokens'}/
                <CurrencySymbol currency={payIn} />
              </span>
            )}
          </div>
        </div>

        <div style={{ textAlign: 'center', minWidth: 150 }}>{payButton}</div>
      </div>

      <PayWarningModal
        visible={payWarningModalVisible}
        onOk={() => {
          setPayWarningModalVisible(false)
          setPayModalVisible(true)
        }}
        onCancel={() => setPayWarningModalVisible(false)}
      />
      <ConfirmPayOwnerModal
        visible={payModalVisible}
        onSuccess={() => setPayModalVisible(false)}
        onCancel={() => setPayModalVisible(false)}
        weiAmount={weiPayAmt}
      />
    </div>
  )
}
