import { useEthBalanceQuery } from 'hooks/EthBalance'
import { formatWad } from 'utils/formatNumber'

export default function DetailBalance({
  address,
  showEthPrice,
}: {
  address: string | undefined
  showEthPrice?: boolean
}) {
  const { data: balance } = useEthBalanceQuery(address)

  return <div>{formatWad(balance, { decimals: 4 }) ?? '--'}</div>
}
