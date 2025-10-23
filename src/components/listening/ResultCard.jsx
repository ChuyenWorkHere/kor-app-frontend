import ProgressBar from "../common/ProgressBar";
import { ChevronLeft, ChevronRight, CircleCheck, Info } from "lucide-react";

export default function ResultCard({ question, userAnswer, isCorrect, handleNextQuestion, handleGoBack, correctProgress }) {

  const correctAnswer = question?.answers?.find(ans => ans.correct)?.answerText || "";
  
  return (
    <div className="mt-4 p-4 border-2 rounded shadow-sm text-dark"
    style={{backgroundColor: `${isCorrect ? "#f0fdf4" : "#fff4e5"}`,
            borderColor: `${isCorrect ? "#86efac" : "#f97316"}`}}>
      {
        isCorrect ? (
          <div className="d-flex flex-column align-items-center text-center">
            <div className="d-flex align-items-center justify-content-center rounded-circle bg-success opacity-10 mb-2" style={{ width: "64px", height: "64px" }}>
              <CircleCheck className="text-white" size={40} />
            </div>

            <div className="fs-5 fw-bold text-success mb-1">
              Chính xác 100%!
            </div>

            <div className="text-muted small mb-3">
              Tuyệt vời! Bạn đã nghe và ghi lại chính xác nội dung.
            </div>

            <ProgressBar progress={100} height={10} bgColor="#31ce36" />
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle bg-light me-3"
                  style={{ width: "40px", height: "40px" }}
                >
                  <Info size={20} className="text-secondary" />
                </div>
                <div>
                  <div className="fw-bold">Kết quả kiểm tra</div>
                  <div className="text-muted small">
                    Tiếp tục luyện tập để cải thiện
                  </div>
                </div>
              </div>
              <div className="px-3 py-1 rounded bg-success bg-opacity-10 text-white fw-bold fs-5">
                {correctProgress}%
              </div>
            </div>
            <ProgressBar progress={correctProgress} height={10} bgColor="#31ce36" />
            {/* So sánh input & đáp án */}
            <div className="row g-3 my-3">
              <div className="col text-center">
                <div className="text-muted small">Bạn đã nhập</div>
                <div className="fw-medium bg-white p-2 rounded border mt-1"
                  style={{ minHeight: "35px" }}>{userAnswer}</div>
              </div>
              <div className="col text-center">
                <div className="text-muted small">Đáp án chính xác</div>
                <div className="fw-medium bg-white p-2 rounded border mt-1"
                  style={{ minHeight: "35px" }}>
                  {correctAnswer}
                </div>
              </div>
            </div>
            {/* Phân tích chi tiết */}
            <div className="mb-3">
              <div className="fw-bold small mb-2">Phân tích chi tiết:</div>
              <div className="table-responsive">
                <table className="table table-sm table-bordered align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Vị trí</th>
                      <th>Bạn viết</th>
                      <th>Đáp án</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{question.orderNo}</td>
                      <td className="fw-medium">{userAnswer}</td>
                      <td>{correctAnswer}</td>
                      <td>
                        <span className={`py-2 px-3 rounded-4 text-white ${isCorrect ? "bg-success" : "bg-danger"}`}>
                          {isCorrect ? "Đúng" : "Sai"}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )
      }

      {/* Nghĩa */}
      <div className="mb-3">
        <div className="fw-bold small mb-1">Giải thích:</div>
        <div className="bg-white p-2 rounded border small">{question.questionExplain}</div>
      </div>

      {/* Phiên âm */}
      <div className="mb-3">
        <div className="fw-bold small mb-1">Phiên âm:</div>
        <div className="bg-white p-2 rounded border fst-italic small">
          Annyeonghaseyo?
        </div>
      </div>

      {/* Buttons */}
      <div className="d-flex gap-2 pt-2">
        { !isCorrect && 
        <button className="btn btn-light flex-fill border d-flex align-items-center justify-content-center"
        onClick={handleGoBack}>
          <ChevronLeft size={16} className="me-1" /> Quay lại chỉnh sửa
        </button>}
        
        <button
          className="btn rounded-3 flex-fill d-flex align-items-center justify-content-center text-white fw-bold"
          style={{backgroundColor: "#9333ea"}}
          disabled = {!isCorrect}
          onKeyDown={(e) => {
            if (e.key === "Enter" && isCorrect) {
              handleNextQuestion();
            }
          }}
          onClick={handleNextQuestion}
        >
          <ChevronRight size={22} /> Câu tiếp theo
        </button>
      </div>
    </div>
  );
}
