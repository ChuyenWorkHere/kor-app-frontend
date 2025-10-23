import { ArrowRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import api from '../../config/axiosConfig'
import toast from 'react-hot-toast'
import { checkAuth } from '../../utils/authUtils'

const UPDATE_MINUTE = 5 * 60 * 1000;

const ProcessCard = () => {

    const isAuthenticated = checkAuth();
    const [dailyTime, setDailyTime] = useState(0);
    const [monthlyTime, setMonthlyTime] = useState(0);

    const updateDailyTime = async () => {
        try {
            const response = await api.get("/users/session/daily");
            setDailyTime(response.data.data);
        } catch (error) {
            toast.error('Lỗi khi lấy thời gian học tập hàng ngày:', error);
        }
    };

    const updateMonthlyTime = async () => {
        try {
            const response = await api.get("/users/session/monthly");
            setMonthlyTime(response.data.data);
        } catch (error) {
            toast.error('Lỗi khi lấy thời gian học tập hàng tháng:', error);
        }
    };
    useEffect(() => {
        if(!isAuthenticated)
            return;

        const update = () => {
            updateDailyTime();
            updateMonthlyTime();
        };
        update();
        const intervalDaily = setInterval(update, UPDATE_MINUTE);
        return () => {
            clearInterval(intervalDaily);
        }
    }, []);


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
                        {dailyTime || 0} minutes
                    </span>
                </div>
                <div>
                    <p className="mb-0 fs-6">This Month</p>
                    <span className="fw-bold small" style={{ color: "#ffc107" }}>
                        {Math.floor(monthlyTime / 60) || 0} hours {monthlyTime % 60 || 0} mins
                    </span>
                </div>
            </div>


            <div className="mt-4 d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
                <Link
                    className="mb-0 fw-semibold fs-6 user-select-none text-white transition-all"
                >
                    View Details <ArrowRight size={16} className='ms-1'></ArrowRight>
                </Link>
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