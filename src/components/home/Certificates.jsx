import React from 'react'

const Certificates = () => {
    return (
        <>
            <div className="mb-2 d-flex align-items-center justify-content-between">
                <h1 className="fw-bold fs-4 ms-5 ms-sm-0">
                    Certificates
                </h1>
            </div>

            <div className="row h-100 m-2">
                <div className="col-12 col-sm-6 p-1">
                    <a href="/ielts" className='d-block'>
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
                    </a>
                </div>

                <div className="col-12 col-sm-6 p-1">
                    <a href="/ielts" className='d-block'>
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
                    </a>
                </div>
            </div>
        </>
    )
}

export default Certificates