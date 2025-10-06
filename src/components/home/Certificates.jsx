import React from 'react'
import { Link } from 'react-router-dom'

const Certificates = () => {
    return (
        <>
            <div className="mb-1 d-flex align-items-center justify-content-between">
                <h1 className="fw-bold fs-4 ms-sm-0">
                    Certificates
                </h1>
            </div>

            <div className="row mb-3">
                <div className="col-12 col-sm-6">
                    <Link to="/" className='d-block'>
                        <img
                            src="https://media.fluentez.com/uploads/uploads/KSSTcfbk5brmShiZRXh2Y.webp"
                            alt="Ielts"
                            className="d-block mx-auto h-100 w-100 rounded object-fit-cover"
                            loading="lazy"
                            style={{
                                maxHeight: "167px",
                                minHeight: "157px",
                                minWidth: "100%"
                            }}
                        />
                    </Link>
                </div>

                <div className="col-12 col-sm-6">
                    <Link to="/" className='d-block'>
                        <img
                            src="https://media.fluentez.com/uploads/uploads/3jGc8bBtoRvOE-BAu32nk.webp"
                            alt="Ielts"
                            className="d-block mx-auto h-100 w-100 rounded object-fit-cover"
                            loading="lazy"
                            style={{
                                maxHeight: "167px",
                                minHeight: "157px",
                                minWidth: "100%"
                            }}
                        />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Certificates