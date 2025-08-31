import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const LessonCard = ({ type }) => {
  return (
    <div className='col-lg-4 col-sm-6'>
      <Link
        to={`/${type}/lesson`}
        className="text-decoration-none"
      >
        <div className="d-flex bg-white rounded-4 overflow-hidden shadow-sm hover-shadow p-0 card-lesson gap-2">
          {/* Image section */}
          <div className="position-relative flex-shrink-0" style={{ width: "8rem", height: "8rem" }}>
            <img
              src="/assets/img/card/1750311407644-gng6m96mfnj.webp"
              alt="Chào hỏi và Giới thiệu"
              className="w-100 h-100 object-fit-cover"
            />
            {/* Status icon */}
            <div className="position-absolute top-0 end-0 m-2">
              <div
                className="bg-success rounded-circle d-flex align-items-center justify-content-center shadow"
                style={{ width: "24px", height: "24px" }}
              >
                <FaCheck size={12} className='text-white' />
              </div>
            </div>
            {/* Progress bar */}
            <div className="position-absolute bottom-0 start-0 end-0 bg-light" style={{ height: "4px" }}>
              <div className="bg-primary h-100" style={{ width: "50%" }}></div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-grow-1 p-3">
            <h3 className="h6 fw-bold text-dark mb-1">
              Chào hỏi và Giới thiệu
            </h3>
            <p className="text-muted small mb-3">
              Bài tập Dictation về Chào hỏi và Giới thiệu
            </p>

            {/* Tags */}
            <div className="d-flex flex-wrap gap-2 mb-3">
              <div className="border hashtag rounded px-2 py-1">Giới thiệu</div>
              <div className="border hashtag rounded px-2 py-1">Gặp gỡ</div>
              <div className="border hashtag rounded px-2 py-1">+1</div>
            </div>

            {/* Footer info */}
            <div className="d-flex justify-content-between small">
              <div className="d-flex align-items-center text-muted">
                <i className='far fa-clock me-2'></i>
                <span>180</span>
              </div>
              <span className="fw-medium text-primary">0/6 bài học</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default LessonCard