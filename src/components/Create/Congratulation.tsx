import React from 'react'
import { useParams } from 'react-router-dom'
import './index.scss'

const Congratulation = () => {
  const { handle }: { handle?: string } = useParams()
  return (
    <div className="congratulationWrapper">
      <h2>
        <span>Congratulation</span>!
      </h2>
      <p>
        You have own your project in Utopians world. Let operate your project on
        Powered public smart contracts!
      </p>
      <button
        onClick={() => (window.location.hash = '/p/' + handle)}
        className="goToMyPro"
      >
        VIew my project
      </button>
    </div>
  )
}

export default Congratulation
