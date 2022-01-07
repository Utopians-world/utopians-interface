import { CurrencyOption } from 'models/currency-option'
import { CSSProperties } from 'react'
import MetisLogo from 'components/icons/MetisLogo'
import { currencyStyle, currencySymbol } from 'utils/currency'

export default function CurrencySymbol({
  currency,
  style,
}: {
  currency: CurrencyOption
  style?: CSSProperties
}) {
  return (
    <span
      style={{
        ...style,
        ...currencyStyle(currency),
      }}
    >
      {currencySymbol(currency) === 'M' ? (
        <MetisLogo />
      ) : (
        currencySymbol(currency)
      )}
    </span>
  )
}
