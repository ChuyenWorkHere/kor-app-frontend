import React, { use } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ClockLoader } from "react-spinners";

const Features = () => {

    const courses = useSelector((state) => state.courses.courses);
    const { loading, error } = useSelector((state) => state.courses);

    return (
        <>
            <div className="mb-2 d-flex align-items-center justify-content-between">
                <h1 className="fw-bold fs-4 ms-5 ms-sm-0">Top Features</h1>
            </div>
            {loading ? (
                <div className='w-100 h-100 d-flex align-items-center justify-content-between'>
                    <ClockLoader color="#0bc817" size={50} />
                </div>
            ) : error ? (
                <div className="text-danger w-100 h-100 text-center py-4">
                    Đã xảy ra lỗi: {error}
                </div>
            ) : (
                <ul className="d-flex align-items-center gap-3 pb-1 ps-0 flex-wrap flex-lg-nowrap overflow-lg-auto justify-content-center justify-content-md-start overflow-auto">
                    {courses.map((course, index) => (
                        <li
                            key={index}
                            className="d-flex flex-column align-items-center justify-content-center rounded p-2"
                            style={{
                                backgroundColor: "#9aabab47",
                                minHeight: "158px",
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
        </>
    )
}

export default Features