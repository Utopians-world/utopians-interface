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
      <p>Your project in Utopians is ready!</p>
      <button
        onClick={() => (window.location.hash = '/p/' + handle)}
        className="goToMyPro"
      >
        View my project
      </button>
    </div>
  )
}

export default Congratulation
