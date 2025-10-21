import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Settings } from 'lucide-react'

const FolderCard = ({ folder }) => {

    return (
        <div className='col-lg-3 col-sm-6 ps-0 pe-2 position-relative'>
            <Link to={`/vocabulary/folder/${folder.id}`} className="text-decoration-none">
                <div className="d-flex cursor-pointer gap-2 rounded border bg-light p-3">
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
                                {folder.name || "Unnamed Folder"}

                                <div>
                                    <span
                                        className="border rounded-4 bg-primary text-white py-1 px-3"
                                        style={{ fontSize: "11px" }}>
                                        {folder.totalDecks} Học Phần
                                    </span>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            </Link>
            <Link
                className="rounded-circle position-absolute top-0 end-0 mt-2 me-3 btn p-1 border-0"
                style={{ cursor: "pointer", transition: "all 0.3s" }}
                to={`/vocabulary/folder/${folder.id}/edit`}
            >
                <Settings size={21} />
            </Link>
        </div>

    )
}

export default FolderCard