import { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import { CurrencyOption } from 'models/currency-option'

import { parseWad } from './formatNumber'

export class CurrencyUtils {
  // Define non-fractional conversion units
  usdPerEth: number | undefined = undefined
  weiPerUsd: number | undefined = undefined
  //原本逻辑返回的1usd兑eth的价格,和新增的合约不同,新增合约是返回1metis兑usd的价格,所以精度不能再是1e18,要切换成对应的usd精度(1e8)
  //变量不再做调整,新增该注释
  usdWei = 1e8
  constructor(usdPerEth: number | undefined) {
    if (!usdPerEth) {
      console.info(
        'Failed to construct CurrencyUtils, received a usdPerEth value of',
        usdPerEth,
      )
      return
    }

    this.usdPerEth = usdPerEth
    this.weiPerUsd = Math.round((1 / usdPerEth) * this.usdWei)
  }

  weiToUsd = (wei: BigNumberish | undefined) => {
    if (!wei || !this.weiPerUsd) return BigNumber.from(0)
    // return this.usdPerEth
    try {
      const w = BigNumber.from(wei)
      const wpu = BigNumber.from(this.weiPerUsd)
      return w.div(wpu)
    } catch (e) {
      console.log("Couldn't convert wei amount", wei.toString(), 'to USD', e)
    }
  }

  usdToWei = (amount: number | string | undefined, precision = 8) => {
    if (!amount || !this.usdPerEth) return BigNumber.from(0)

    try {
      return parseWad(
        (
          (typeof amount === 'string' ? parseFloat(amount) : amount) /
          this.usdPerEth
        ).toFixed(precision),
      )
    } catch (e) {
      console.log("Couldn't convert USD amount", amount.toString(), 'to wei', e)
    }
  }

  wadToCurrency = (
    amount: BigNumberish | undefined,
    targetCurrency: CurrencyOption | undefined,
    sourceCurrency: CurrencyOption | undefined,
  ) => {
    if (targetCurrency === undefined || sourceCurrency === undefined) return
    if (targetCurrency === sourceCurrency) return BigNumber.from(amount)
    if (targetCurrency === 1) return parseWad(this.weiToUsd(amount)?.toString())
    if (targetCurrency === 0 && this.usdPerEth !== undefined)
      return BigNumber.from(amount)
        .div(this.usdPerEth * 100)
        .mul(100)
  }
}
