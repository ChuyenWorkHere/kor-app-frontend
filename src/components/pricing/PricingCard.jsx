import React from 'react'

const PricingCard = ({pricing, onBuy}) => {
    return (
        <div className="card card-pricing">
            <div className="card-header">
                <h4 className="card-title">{pricing.name}</h4>
                <div className="card-price">
                    <span className="price">${pricing.price}</span>
                </div>
            </div>
            <div className="card-body">
                <ul className="specification-list">
                    <li>
                        <span className="name-specification">Mô tả</span>
                        <span className="status-specification">{pricing.description}</span>
                    </li>
                    <li>
                        <span className="name-specification">Số ngày</span>
                        <span className="status-specification">{pricing.durationDays || "Vĩnh viễn"}</span>
                    </li>
                </ul>
            </div>
            <div className="card-footer">
                <button className="btn btn-primary w-100" onClick={() => onBuy(pricing)}>
                    <b>Đăng ký</b>
                </button>
            </div>
        </div>
    )
}

export default PricingCard