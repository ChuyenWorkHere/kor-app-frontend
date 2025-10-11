import React from "react";
import CheckCircle from "../icons/CheckCircle";

const CompletionCard = () => {
  return (
    <div className="position-relative overflow-hidden" >
      <div className="rounded-4 shadow-lg overflow-hidden" style={{ background: "linear-gradient(to right, #5F2EEA, #8A6AFB)" }}>
        <div className="position-relative p-3 p-md-4">
          
          <div className="d-flex align-items-center justify-content-between">
            
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center justify-content-center rounded-circle bg-white bg-opacity-25 backdrop-blur p-3">
                <CheckCircle color="white" size={28} />
              </div>
              <div>
                <h2 className="fs-3 fw-bold text-white mb-1">🎉 Chúc mừng!</h2>
                <p className="text-white-50 fs-5">
                  Bạn đã hoàn thành tất cả bài tập trong chủ đề này!
                </p>
              </div>
            </div>

            <div className="d-none d-md-block text-center">
              <div className="fs-1 fw-bold text-white mb-1">100%</div>
              <div className="text-white-50 small">Hoàn thành</div>
            </div>
          </div>

          <div className="bg-white rounded-circle position-absolute top-0 end-0 opacity-25" style={{ width: "8rem", height: "8rem", transform: "translate(2rem, -2rem)" }}></div>
          <div className="bg-white rounded-circle position-absolute opacity-25" style={{ width: "3rem", height: "3rem", bottom: "-3rem", left: "5rem", transform: "translate(1.5rem, -1.5rem)" }}></div>
          <div className="bg-white rounded-circle position-absolute opacity-25 top-50 start-50" style={{ width: "1rem", height: "1rem", transform: "translate(1.5rem, -1.5rem)" }}></div>
        </div>
      </div>
    </div>
  );
};

export default CompletionCard;
