import React from 'react'
import { Link } from 'react-router-dom'

const Book = () => {
  return (
    <>
      <div className="mb-1 d-flex align-items-center justify-content-between">
        <h1 className="fw-bold fs-4 ms-sm-0">
          Book
        </h1>
      </div>
      <div
        className="d-flex flex-column align-items-center justify-content-center rounded p-2 mb-3"
        style={{
          backgroundColor: "#9aabab47",
          minHeight: "160px",
          maxHeight: "160px",
          cursor: "pointer"
        }}
      >
        <Link to="/" className="d-flex flex-column align-items-center justify-content-center">
          <img src="/assets/img/google.png" alt="Book" className="img-fluid mx-auto w-25" loading="lazy" />
          <h2 className="text-center fw-semibold fs-6 mt-2">Book</h2>
        </Link>
      </div>
    </>

  )
}

export default Book