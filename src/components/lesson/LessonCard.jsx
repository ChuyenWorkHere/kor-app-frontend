import React from 'react'
import { FaCheck, FaClock } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { AiFillExclamationCircle } from "react-icons/ai";

const LessonCard = ({ lesson }) => {

  return (
    <div className='col-lg-4 col-sm-6'>
      <Link
        to={`/${lesson.course.courseSlug}/${lesson.lessonSlug}`}
        className="text-decoration-none"
      >
        <div className="d-flex bg-white rounded-4 overflow-hidden shadow-sm hover-shadow p-0 card-lesson gap-2">
          {/* Image section */}
          <div className="position-relative flex-shrink-0" style={{ width: "8rem", height: "8rem" }}>
            <img
              src={lesson.lessonThumbnail}
              alt={lesson.lessonTitle}
              className="w-100 h-100 object-fit-cover"
            />
            {/* Status icon */}
            <div className="position-absolute top-0 end-0 m-2">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center shadow"
                style={{ width: "24px", height: "24px",
                   backgroundColor: 
                    lesson.myProgress.status === "COMPLETED" ?
                    "#28a745" :
                    lesson.myProgress.status === "IN_PROGRESS" ?
                    "#ffc107" :
                    "#6c757d" }}
              >
                {
                  lesson.myProgress.status === "COMPLETED" ? (
                    <FaCheck size={12} className='text-white' />
                  ) : lesson.myProgress.status === "IN_PROGRESS" ? (
                    <FaClock size={12} className='text-white' />
                  ) : (
                    <AiFillExclamationCircle size={12} className='text-white' />
                  )
                }
              </div>
            </div>
            {/* Progress bar */}
            <div className="position-absolute bottom-0 start-0 end-0 bg-light" style={{ height: "4px" }}>
              <div className="bg-primary h-100" style={{ width: `${lesson.myProgress.percentage}%` }}></div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-grow-1 p-3">
            <h3 className="h6 fw-bold text-dark mb-1 lesson-title">
              {lesson.lessonTitle}
            </h3>
            <p className="text-muted small mb-3 lesson-desc">
              {lesson.lessonDesc}
            </p>

            {/* Tags */}
            <div className="d-flex flex-wrap gap-2 mb-3">
              {lesson.tags.map(tag => (
                <div key={tag.tagId} className="border hashtag rounded px-2 py-1">{tag.tagName}</div>
              ))}
              
            </div>

            {/* Footer info */}
            <div className="d-flex justify-content-between small">
              <div className="d-flex align-items-center text-muted">
                <i className='far fa-clock me-2'></i>
                <span>{lesson.requiredMinute}</span>
              </div>
              <span className="fw-medium text-primary">{lesson?.contents?.length * lesson?.myProgress?.percentage / 100}/{lesson?.contents?.length || 0} bài học</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default LessonCard