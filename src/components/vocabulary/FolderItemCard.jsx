import React from 'react'
import { CiSettings } from 'react-icons/ci'
import { FaGrinHearts } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const FolderItemCard = () => {
    return (
        <div className='col-lg-3 col-sm-6 ps-0 pe-2'>
            <Link className="text-decoration-none">
                <div className="d-flex cursor-pointer gap-2 rounded border bg-light p-3 hover-shadow">
                    {/* Icon Folder */}
                    <div className="border-end border-secondary px-1 d-flex align-items-center">
                        <img
                            src="/assets/img/folder.png"
                            alt="folder icon"
                            className="my-auto mt-2"
                            style={{ width: "48px" }}
                        />
                    </div>

                    {/* Nội dung */}
                    <div className="d-flex flex-column flex-fill gap-2">
                        <div className="d-flex align-items-start justify-content-between gap-2">
                            <div className="d-flex flex-column gap-4" style={{ fontSize: "1.1rem" }}>
                                English
                                
                                <span
                                    className="border rounded-4 bg-primary text-white py-1 px-3"
                                 style={{fontSize: "11px"}}>
                                    1 Học Phần
                                </span>
                            </div>

                            <div
                                className="rounded-circle bg-light"
                                style={{ cursor: "pointer", transition: "all 0.3s" }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "#ccc")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "#f8f9fa")}
                            >
                                <CiSettings size={22} />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>

    )
}

export default FolderItemCard