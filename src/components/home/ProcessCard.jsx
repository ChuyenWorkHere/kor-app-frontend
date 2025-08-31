import React from 'react'

const ProcessCard = () => {
    return (
        <div
            className="position-relative h-100 w-100 flex-shrink-0 flex-grow-0 rounded-2 px-4 py-4 overflow-lg-visible"
            style={{
                flexBasis: "20rem",
                backgroundColor: "#343a40", // xám đậm
                color: "white",
            }}
        >
            {/* Tiêu đề */}
            <h1 className="mb-3 fw-bold fs-4">My Process</h1>

            {/* Thông tin thời gian */}
            <div className="d-flex align-items-center gap-4">
                <div>
                    <p className="mb-0 fs-6">Today</p>
                    <span className="fw-bold small" style={{ color: "#ffc107" }}>
                        0 minutes
                    </span>
                </div>
                <div>
                    <p className="mb-0 fs-6">This Month</p>
                    <span className="fw-bold small" style={{ color: "#ffc107" }}>
                        0 minutes
                    </span>
                </div>
            </div>

            
            <div className="mt-4 d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
                <p
                    className="mb-0 fw-semibold fs-6 user-select-none"
                    style={{
                        transition: "color 0.3s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#ffc107")}
                    onMouseLeave={(e) => (e.target.style.color = "white")}
                >
                    View Details
                    
                </p>
                <i className='fas fa-arrow-right'></i>
            </div>

            <img
                src="/assets/img/sakura_3.D_oD-HFP.png"
                alt="Plant"
                className="position-absolute opacity-75 user-select-none"
                style={{ right: "-1rem", bottom: "-0.25rem", width: "7rem" }}
                loading="lazy"
            />
            <img
                src="/assets/img/sakura_1.spwFXMOx.png"
                alt="Bells"
                className="position-absolute user-select-none"
                style={{
                    right: "0.25rem",
                    top: "0",
                    width: "8rem",
                    transform: "rotate(12deg)",
                }}
                loading="lazy"
            />
        </div>
    )
}

export default ProcessCard