import React, { useContext } from 'react'

import DetailEdit from '../icons/DetailEdit'
import { NetworkContext } from '../../contexts/networkContext'
import { ProjectContext } from '../../contexts/projectContext'

export default function DetailEditShowMobile() {
  const { signingProvider, userAddress } = useContext(NetworkContext)
  const { owner } = useContext(ProjectContext)
  return (
    <span>
      {signingProvider &&
      userAddress &&
      owner &&
      userAddress.toUpperCase() === owner.toUpperCase() ? (
        <DetailEdit size={20} />
      ) : (
        <span> </span>
      )}
    </span>
  )
}
