import React from 'react'

const Deal = () => {
    return (
        <>
            <div className="mb-2 d-flex align-items-center justify-content-between">
                <h1 className="fw-bold fs-4 ms-5 mt-5 mt-sm-0 ms-sm-0">
                    Deal
                </h1>
            </div>

            <div
                className="position-relative d-flex flex-column h-100 justify-content-center rounded px-2 py-4 bg-warning"
                style={{
                    maxHeight: "167px",
                    minHeight: "157px",
                    minWidth: "100%"
                }}
            >

                <div
                    className="position-absolute rounded-circle"
                    style={{
                        top: "-2rem",
                        right: "-2rem",
                        width: "5rem",
                        height: "5rem",
                        backgroundColor: "rgba(255, 255, 255, 0.3)"
                    }}
                ></div>
                <div
                    className="position-absolute rounded-circle"
                    style={{
                        bottom: "-2rem",
                        left: "-2rem",
                        width: "5rem",
                        height: "5rem",
                        backgroundColor: "rgba(255, 255, 255, 0.3)"
                    }}
                ></div>


                <div className="text-center">
                    <span className="d-block text-dark fs-5">
                        Trải nghiệm tất cả tính năng
                    </span>
                    <span className="d-block fw-bold fs-5 mb-3 text-dark">
                        Chỉ với 20.000đ
                    </span>
                    <a href="/pricing" className="text-decoration-none">
                        <button
                            type="button"
                            className="btn btn-danger px-4 py-2"
                            style={{ background: "linear-gradient(to bottom right, #ec4899, #f97316)" }}
                        >
                            Buy Now!
                        </button>
                    </a>
                </div>


                <div className="position-absolute bottom-0 end-0">
                    <img src="/assets/img/store-work.BRybF744.svg" alt="Deal" className="img-fluid" style={{ maxWidth: "9rem" }} />
                </div>
            </div>
        </>
    )
}

export default Deal