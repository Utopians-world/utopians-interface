import { LinkOutlined } from '@ant-design/icons'

import { NetworkName } from 'models/network-name'

import { readNetwork } from 'constants/networks'

export default function EtherscanLink({
  value,
  type,
}: {
  value: string | undefined
  type: 'tx' | 'address'
}) {
  if (!value) return null

  let subdomain = readNetwork.blockExplorer

  if (readNetwork.name !== NetworkName.mainnet) {
    subdomain = readNetwork.blockExplorer
  }

  return (
    <a
      className="quiet"
      href={`${subdomain}${type}/${value}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: '#00DAC5', marginLeft: '5px' }}
    >
      <LinkOutlined />
    </a>
  )
}
