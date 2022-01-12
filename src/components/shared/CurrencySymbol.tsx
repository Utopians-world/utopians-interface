import { CurrencyOption } from 'models/currency-option'
import { CSSProperties } from 'react'
import MetisLogo from 'components/icons/MetisLogo'
import { currencyStyle, currencySymbol } from 'utils/currency'

export default function CurrencySymbol({
  currency,
  style,
  size,
}: {
  currency: CurrencyOption
  style?: CSSProperties
  size?: number
}) {
  return (
    <span
      style={{
        ...style,
        ...currencyStyle(currency),
      }}
    >
      {currencySymbol(currency) === 'M' ? (
        <MetisLogo size={size} />
      ) : (
        currencySymbol(currency)
      )}
    </span>
  )
}
