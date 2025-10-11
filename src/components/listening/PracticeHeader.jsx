import { Zap } from 'lucide-react';
import React from 'react'

const PracticeHeader = ({content}) => {
  return (
    <div className="d-flex align-items-center justify-content-start bg-light border rounded-lg p-3 mb-4 shadow-sm">
      {/* Icon */}
      <div className="bg-primary rounded-circle p-2 me-3 d-flex justify-content-center align-items-center">
        <Zap size={16} fill='white' className='text-white' />
      </div>

      {/* Content */}
      <div>
        <h2 className="h6 fw-semibold text-primary m-0">
          Bài tập {content?.orderNo}: {content?.contentName}
        </h2>
        <p className="small text-muted m-0">
          {content?.contentDesc}
        </p>
      </div>
    </div>
  )
}

export default PracticeHeader