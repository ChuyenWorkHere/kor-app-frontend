import { Lightbulb } from "lucide-react";
import React from "react";

const TipCard = ({ onClose }) => {
  return (
    <div
      className="mb-1 shadow-lg rounded-2 w-100 transition duration-300"
      style={{ overflow: "hidden" }}>
      {/* Header */}
      <div className="d-flex align-items-center bg-warning text-white p-3 opacity-75">
        <Lightbulb size={20} className="me-2" />
        <h5 className="mb-0 fw-bold">Mẹo luyện tập</h5>
        <button
          className="btn-md btn-light ms-auto rounded-circle"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="p-3">
        <div className="row gy-2">
          <div className="col-md-4 d-flex align-items-center">
            <span className="px-3 py-2 border-none bg-light-organge rounded-pill text-warning me-2 fw-bold">1</span>
            <span className="text-muted fs-6  fw-medium">
              Lắng nghe toàn bộ câu trước khi bắt đầu gõ
            </span>
          </div>
          <div className="col-md-4 d-flex align-items-center">
            <span className="px-3 py-2 border-none bg-light-organge rounded-pill text-warning me-2 fw-bold">2</span>
            <span className="text-muted fs-6 fw-medium">
              Điều chỉnh tốc độ phát khi cần thiết
            </span>
          </div>
          <div className="col-md-4 d-flex align-items-center">
            <span className="px-3 py-2 border-none bg-light-organge rounded-pill text-warning me-2 fw-bold">3</span>
            <span className="text-muted fs-6 fw-medium">
              Luyện tập đều đặn hàng ngày
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipCard;
