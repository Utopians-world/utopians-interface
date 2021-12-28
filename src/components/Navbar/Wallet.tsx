import FormattedAddress from 'components/shared/FormattedAddress'
// import { ThemeContext } from 'contexts/themeContext'
// import { useContext } from 'react'
import React from 'react'

import WalletIcon from '../../assets/images/wallet.png'

export default function Wallet({ userAddress }: { userAddress: string }) {
  // const { colors } = useContext(ThemeContext).theme

  const height = 30

  return (
    <span
      style={{
        height,
        borderRadius: height / 2,
        padding: '0px 10px',
        display: 'flex',
        color: '#ffffff',
        alignItems: 'center',
        // background: colors.background.l2,
        cursor: 'default',
        userSelect: 'all',
      }}
    >
      <img src={WalletIcon} alt="WalletIcon" style={{ marginRight: '2px' }} />
      <FormattedAddress address={userAddress} />
    </span>
  )
}
