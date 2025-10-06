import React, { use } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { IoIosWarning } from "react-icons/io";


const Features = () => {

    const courses = useSelector((state) => state.courses.courses);
    const { loading, error } = useSelector((state) => state.courses);

    return (
        <div>
            <div className="mb-2 d-flex align-items-center justify-content-between">
                <h1 className="fw-bold fs-4 ms-sm-0">Features</h1>
            </div>
            {loading ? (
                <div className='d-flex align-items-center justify-content-center'>
                    <div className='d-flex align-items-center justify-content-center' style={{minHeight: "160px",}}>
                        <CircularProgress size={40} />
                    </div>
                </div>
            ) : error ? (
                <div className='d-flex align-items-center justify-content-center'>
                    <div className='d-flex align-items-center justify-content-center' style={{minHeight: "160px",}}>
                        <p className='fs-5'> <IoIosWarning size={20} /> Lỗi khi lấy dữ liệu bài học</p>
                    </div>
                </div>
                
            ) : (
                <ul className="d-flex align-items-center gap-3 pb-1 ps-0 flex-lg-nowrap overflow-lg-auto justify-content-start overflow-auto">
                    {courses.map((course, index) => (
                        <li
                            key={index}
                            className="d-flex flex-column align-items-center justify-content-center rounded p-2"
                            style={{
                                backgroundColor: "#9aabab47",
                                minHeight: "160px",
                                minWidth: "135px",
                                maxWidth: "135px",
                                cursor: "pointer"
                            }}
                        >
                            <Link to={`/${course.courseSlug}`} className="text-decoration-none">
                                <img src={course.imageUrl} alt={course.courseName} className="img-fluid mx-auto" loading="lazy" />
                                <h2 className="text-center fw-semibold fs-6 mt-2">{course.courseName}</h2>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Features