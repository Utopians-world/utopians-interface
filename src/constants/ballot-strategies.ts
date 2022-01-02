import { constants } from 'ethers'

export type Strategy = {
  address: string
  name: string
  description?: string
  unknown?: boolean
}

export const ballotStrategies: Strategy[] = [
  {
    name: 'No strategy',
    description:
      'Any reconfiguration to an upcoming funding cycle will take effect once the current cycle ends. A project with no strategy may be vulnerable to being rug-pulled by its owner.',
    address: constants.AddressZero,
  },
  {
    name: '7-day delay',
    description:
      'A reconfiguration to an upcoming funding cycle must be submitted at least 7 days before it starts.',
    address: '0x01bE2c1d3b5833DAdc6b21834C76657DeEE8cDfE',
  },
  {
    name: '3-day delay',
    description:
      'A reconfiguration to an upcoming funding cycle must be submitted at least 3 days before it starts.',
    address: '0x509058f8B9A49D399B64554b21E7018c3641a0cC',
  },
]

const customStrategy = (address: string): Strategy => ({
  address,
  name: 'Custom strategy',
  description: 'Unrecognized strategy contract. Make sure this is correct!',
  unknown: true,
})

export const getBallotStrategyByAddress = (address: string) =>
  ballotStrategies.find(
    s => s.address.toLowerCase() === address.toLowerCase(),
  ) ?? customStrategy(address)
