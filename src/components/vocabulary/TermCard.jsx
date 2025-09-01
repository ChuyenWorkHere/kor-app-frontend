import React from 'react'
import { CiSettings } from "react-icons/ci";
import { Link } from 'react-router-dom';

const TermCard = () => {
  return (
    <div className='col-lg-3 col-sm-6 ps-0 pe-2'>
      <Link className="text-decoration-none">
        <div className="d-flex flex-column gap-2 border rounded p-2 bg-light cursor-pointer shadow-sm hover-shadow">
          {/* Tiêu đề + nút setting */}
          <div className="d-flex align-items-center justify-content-between gap-2">
            <h3 className="text-truncate mb-0 fs-5 fw-medium text-dark">House</h3>
            <div className="rounded-circle bg-light p-2">
              <CiSettings size={23} />
            </div>
          </div>

          {/* Nhãn */}
          <span className="badge rounded-pill me-auto ms-0 bg-primary text-white">
            1 Thuật Ngữ
          </span>

          {/* Avatar + tên */}
          <div className="d-flex align-items-center gap-1">
            <img
              src="https://lh3.googleusercontent.com/a/ACg8ocIobgJ0XCzNlL3cicEdHsrU6JWxwjSALB955A77gucFuKxk=s96-c"
              alt="avatar"
              className="rounded-circle"
              style={{ width: "2.2rem", height: "2.2rem" }}
            />
            <span className="fw-medium text-dark">Naruto Lee</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default TermCard