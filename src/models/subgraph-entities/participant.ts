import { BigNumber } from 'ethers'

export interface Participant {
  id: string
  wallet: string
  totalPaid?: BigNumber
  project?: BigNumber
  tokenBalance?: BigNumber
  lastPaidTimestamp?: number
}

export type ParticipantJson = Record<keyof Participant, string>

export const parseParticipantJson = (json: ParticipantJson): Participant => ({
  ...json,
  totalPaid: json.totalPaid ? BigNumber.from(json.totalPaid) : undefined,
  project: json.project ? BigNumber.from(json.project) : undefined,
  tokenBalance: json.tokenBalance
    ? BigNumber.from(json.tokenBalance)
    : undefined,
  lastPaidTimestamp: json.lastPaidTimestamp
    ? parseInt(json.lastPaidTimestamp)
    : undefined,
})
