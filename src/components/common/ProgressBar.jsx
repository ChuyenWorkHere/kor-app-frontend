import React from 'react'

const ProgressBar = ({ progress, height, bgColor }) => {
  return (
    <div className="progress" style={{ height }}>
      <div className="progress-bar" role="progressbar" style={{ width: `${progress}%`, backgroundColor: bgColor }} />
    </div>
  )
}

export default ProgressBar