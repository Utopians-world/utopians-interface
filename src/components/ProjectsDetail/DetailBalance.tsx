import { useEthBalanceQuery } from 'hooks/EthBalance'
import { formatWad } from 'utils/formatNumber'

import CurrencySymbol from '../shared/CurrencySymbol'

export default function DetailBalance({
  address,
  showEthPrice,
}: {
  address: string | undefined
  showEthPrice?: boolean
}) {
  const { data: balance } = useEthBalanceQuery(address)

  return (
    <div>
      <CurrencySymbol currency={0} />
      {formatWad(balance, { decimals: 4 }) ?? '--'}
    </div>
  )
}
