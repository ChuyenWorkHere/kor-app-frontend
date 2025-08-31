import React from 'react'
import { BsFillLightningChargeFill } from "react-icons/bs";

const PracticeHeader = () => {
  return (
    <div className="d-flex align-items-center justify-content-start bg-light border rounded-lg p-3 mb-4 shadow-sm">
      {/* Icon */}
      <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3 d-flex justify-content-center align-items-center">
        <BsFillLightningChargeFill className='text-white' />
      </div>

      {/* Content */}
      <div>
        <h2 className="h6 fw-semibold text-primary m-0">
          Bài tập 1: Chào hỏi và giới thiệu tên
        </h2>
        <p className="small text-muted m-0">
          Học cách chào hỏi và giới thiệu tên của mình
        </p>
      </div>
    </div>
  )
}

export default PracticeHeader