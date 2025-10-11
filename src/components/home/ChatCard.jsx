import React from 'react'
import { Link } from 'react-router-dom'

const ChatCard = () => {
    return (
        <div
            className="position-relative flex-grow-1 text-white shadow xl-block h-100 w-100 rounded d-flex flex-column justify-content-center align-items-center"
            style={{
                flexBasis: "20rem",
                backgroundColor: "#343a40",
            }}
        >
            <div className="position-absolute user-select-none top-0 w-100">
                <img
                    src="/assets/img/download.svg"
                    alt="New Feature Header"
                    className="img-fluid w-100 h-100 z-10"
                />
            </div>

            <div className="user-select-none text-center d-flex flex-column justify-content-center align-items-center z-10" style={{ zIndex: 20 }}>

                <h3 className="fw-semibold text-white">
                    Release Speaking
                </h3>

                <div className="d-flex align-items-center justify-content-between gap-2">
                    <div style={{ height: "2px", width: "2rem", backgroundColor: "#28B6BA" }}></div>
                    <p className="mb-0 fw-semibold text-white">
                        Chat with Mita
                    </p>
                    <div style={{ height: "2px", width: "2rem", backgroundColor: "#28B6BA" }}></div>
                </div>

                <div className="mx-auto mt-2" style={{ width: "5rem" }}>
                    <Link
                        to="/"
                        className="d-flex align-items-center justify-content-center"
                        style={{
                            color: "#28B6BA",
                            textDecoration: "none",
                        }}
                    >
                        See now!
                    </Link>
                </div>
            </div>

            <img
                src="/assets/img/home-new-year-cloud.BZjpAgOk.png"
                alt="Cloud"
                loading="lazy"
                className="position-absolute bottom-0 user-select-none w-100"
                style={{ pointerEvents: "none", zIndex: 10 }}
            />

            <img
                src="/assets/img/mita.XA4u_O7u.png"
                alt="Mita"
                loading="lazy"
                className="position-absolute bottom-0"
                style={{
                    pointerEvents: "none",
                    right: 0,
                    width: "5rem",
                    transform: "scaleX(-1)",
                    zIndex: 11,
                }}
            />
        </div>
    )
}

export default ChatCard