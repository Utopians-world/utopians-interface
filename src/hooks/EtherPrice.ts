import { BigNumber } from '@ethersproject/bignumber'
import { ContractName } from 'models/contract-name'
import { useCallback, useState } from 'react'
import { fromWad } from 'utils/formatNumber'

import useContractReader from './ContractReader'

export function useEtherPrice() {
  const [price, setPrice] = useState<number>()

  useContractReader({
    contract: ContractName.MetisPrice,
    functionName: 'getValue',
    args: ['Metis/USD'], // USD
    callback: useCallback(
      (val?: BigNumber[]) => {
        if (!val) return 0
        console.log('number ' + BigNumber.from(val[0]))
        console.log(val)
        setPrice(parseFloat(fromWad(val[0])))
      },
      [setPrice],
    ),
  })

  return price
}
