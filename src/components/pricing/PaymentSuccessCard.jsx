import React from 'react'
import { FaCheck } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const PaymentSuccessCard = () => {

    const navigate = useNavigate();

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className="card card-round shadow-sm border-success" style={{ maxWidth: "400px" }}>
                <div className="card-body text-center text-success">
                    <div className="card-opening fs-4 fw-bold mb-2">

                        <FaCheck color='white' className='bg-success rounded-circle p-1' /> Thanh toán thành công!
                    </div>
                    <div className="card-desc mb-3">
                        Gói dịch vụ của bạn đã được kích hoạt thành công. Hãy tận hưởng các tính năng cao cấp ngay bây giờ!
                    </div>
                    <div className="card-detail" onClick={() => navigate("/")}>
                        <button className="btn btn-success btn-rounded">Quay về trang chủ</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PaymentSuccessCard