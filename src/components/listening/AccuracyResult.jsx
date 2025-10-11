import React from "react";

export default function AccuracyResult({ question, userAnswer }) {

  const correctAnswer = question?.answers?.find(ans => ans.correct)?.answerText;
  const correctProgress = correctAnswer ? 
            Math.round((userAnswer.split("").filter((char, idx) => char === correctAnswer[idx]).length / correctAnswer.length) * 100) : 0;

  return (  
    <div className="mb-4 py-3">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="text-muted fs-6 fw-bold">Độ chính xác:</span>
        <div className="d-flex align-items-center gap-2">
          {/* Progress bar */}
          <div className="progress" style={{ height: "8px", minWidth: "80px" }}>
            <div className="progress-bar bg-success" style={{ width: `${correctProgress}%` }}></div>
          </div>
          <span className="fw-medium small text-success">{correctProgress}%</span>
        </div>
      </div>

      {/* Content Box */}
      <div className="p-3 border border-custom rounded bg-white">
        {/* Characters */}
        <div className="d-flex flex-wrap gap-1 justify-content-center mb-2">
          {correctAnswer?.split("").map((char, idx) => (
            <span
              key={idx}
              className={`d-inline-flex align-items-center justify-content-center border rounded text-dark
                ${userAnswer[idx] ? (userAnswer[idx] === char ? "border-success char-box-success" : "border-danger char-box-danger") : "border-secondary char-box-secondary"}`}
              title={`Ký tự đúng: ${char}`}
            >
              {userAnswer[idx] ?  (userAnswer[idx] === char ? char : char) : "*"}
            </span>
          ))}
        </div>

        {/* Legend */}
        <div className="d-flex justify-content-center gap-3 small mt-1">
          <div className="d-flex align-items-center">
            <span className="d-inline-block rounded-circle me-1" style={{ width: "0.5rem", height: "0.5rem", backgroundColor: "#22c55e" }} />
            <span className="text-muted">Đúng</span>
          </div>
          <div className="d-flex align-items-center">
            <span className="d-inline-block rounded-circle me-1" style={{ width: "0.5rem", height: "0.5rem", backgroundColor: "#ef4444" }} />
            <span className="text-muted">Sai/Chưa nhập</span>
          </div>
          <div className="d-flex align-items-center">
            <span className="d-inline-block rounded-circle me-1" style={{ width: "0.5rem", height: "0.5rem", backgroundColor: "#d1d5db" }} />
            <span className="text-muted">Chưa hiển thị</span>
          </div>
        </div>
      </div>
    </div>
  );
}
