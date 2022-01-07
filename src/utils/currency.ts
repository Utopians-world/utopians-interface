import { CurrencyOption } from 'models/currency-option'
import { CSSProperties } from 'react'

const currencies: Record<
  CurrencyOption,
  { name: 'METIS' | 'USD'; symbol: 'M' | '$'; style?: CSSProperties }
> = {
  '0': {
    name: 'METIS',
    symbol: 'M',
    style: {
      fontFamily: 'sans-serif',
    },
  },
  '1': {
    name: 'USD',
    symbol: '$',
  },
}

export const currencyName = (
  currency?: CurrencyOption,
): typeof currencies[keyof typeof currencies]['name'] | undefined =>
  currency !== undefined ? currencies[currency].name : undefined

export const currencySymbol = (currency?: CurrencyOption) =>
  currency !== undefined ? currencies[currency].symbol : undefined

export const currencyStyle = (currency?: CurrencyOption) =>
  currency !== undefined ? currencies[currency].style : undefined
