import CircularProgress from '@mui/material/CircularProgress';
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Deal = () => {

    const { info, loading, error } = useSelector(state => state.user);

    const isPremium = info?.premium;

    return (
        <>
            <div className="mb-2 d-flex align-items-center justify-content-between">
                <h1 className="fw-bold fs-4 ms-sm-0">
                    Deal
                </h1>
            </div>
            <div
                className="d-flex flex-column h-100 justify-content-center rounded px-2 py-4 bg-dark mb-3 position-relative"
                style={{
                    backgroundColor: "",
                    minWidth: "100%",
                    minHeight: "168px",
                    maxHeight: "158px"
                }}
            >
                {
                    loading ? (
                        <div>
                            <div className='d-flex align-items-center justify-content-center'>
                                <CircularProgress size={40} />
                            </div>
                        </div>
                    ) : (
                        !isPremium ? (
                            <>
                                <div className="text-center">
                                    <span className="d-block text-light fs-5">
                                        Trải nghiệm tất cả tính năng
                                    </span>
                                    <span className="d-block fw-bold fs-5 mb-3 text-light">
                                        Chỉ với 20.000đ
                                    </span>
                                    <Link to="/pricing" className="text-decoration-none">
                                        <button
                                            type="button"
                                            className="btn btn-danger px-4 py-2 transition-all"
                                            style={{ backgroundColor: "linear-gradient(to bottom right, #ec4899, #f97316)" }}
                                        >
                                            Buy Now!
                                        </button>
                                    </Link>
                                </div>
                                <div className="position-absolute bottom-0 end-0">
                                    <img src="/assets/img/store-work.BRybF744.svg" alt="Deal" className="img-fluid" style={{ maxWidth: "9rem" }} />
                                </div>
                            </>
                        ) : (
                            <div className='d-flex flex-column align-items-center justify-content-center'>
                                <div>
                                    <h4 className='text-warning'>Premium Member</h4>
                                </div>
                                <img src="/assets/img/premium.gif" alt="King" style={{ width: 70, height: 70 }} />
                            </div>
                        )
                    )
                }

            </div>
        </>
    )
}

export default Deal