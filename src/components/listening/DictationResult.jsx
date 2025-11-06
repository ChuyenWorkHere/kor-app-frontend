import { ArrowUp, ChevronFirst, ChevronLast, ChevronsLeft, Zap } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";

export default function DictationResult({questions}) {

  const {courseSlug, lessonSlug} = useParams();

  const correctAnswersCount = questions.filter(q => q.progress.status === "COMPLETED").length;
  const accuracy = questions.length > 0 ? Math.round((correctAnswersCount / questions.length) * 100) : 0;
  const totalTime = questions.reduce((total, q) => total + (q.progress.timeSpent || 0), 0);

  return (
    <div className="dictation-exercise container my-1">
      <div className="bg-white rounded-4 shadow p-4 position-relative overflow-hidden">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="d-flex flex-column align-items-center justify-content-center mx-auto mb-3">
            <div className="position-relative mb-2">
              <div className="rounded-circle d-flex align-items-center justify-content-center shadow-lg"
                   style={{ width: "96px", height: "96px", background: "linear-gradient(to right, #60a5fa, #6366f1)" }}>
                <Zap size={56} color="white" fill="white" stroke="white" />
              </div>
              <div className="position-absolute bg-white rounded-circle p-1 shadow"
                   style={{ bottom: "-8px", right: "-8px" }}>
                <ArrowUp size={20} className='text-success' />
              </div>
            </div>
            <div className="fs-4 fw-bold text-danger">Tiến bộ tốt!</div>
          </div>
          <h2 className="fw-bold fs-3 mb-2">Bài tập hoàn thành!</h2>
          <p className="text-muted">Bạn đã hoàn thành bài tập dictation này. Dưới đây là kết quả của bạn.</p>
          <div className="d-flex justify-content-center align-items-center gap-2 small mb-4">
            <div className="px-3 py-1 bg-danger-subtle text-danger rounded-pill fw-medium d-flex align-items-center">
              <Zap strokeWidth={2} size={18} className="me-1" />
              Bạn đang làm rất tốt!
            </div>
            <div className="px-3 py-1 bg-success-subtle text-success rounded-pill fw-medium">+20 điểm</div>
          </div>
        </div>

        {/* Stats */}
        <div className="row gap-3 text-center w-100 mx-auto">
          <div className="col bg-danger-subtle p-3 rounded-3">
            <div className="fs-3 fw-bold text-danger">{correctAnswersCount}/{questions.length}</div>
            <div className="text-muted small">Câu đúng</div>
          </div>
          <div className="col bg-success-subtle p-3 rounded-3">
            <div className="fs-3 fw-bold text-success">{accuracy}%</div>
            <div className="text-muted small">Độ chính xác</div>
          </div>
          <div className="col bg-primary-subtle p-3 rounded-3">
            <div className="fs-3 fw-bold text-primary">{totalTime}s</div>
            <div className="text-muted small">Thời gian</div>
          </div>
        </div>

        {/* Details */}
        <div className="mt-4 border-top pt-4">
          <h3 className="fs-5 fw-semibold mb-3">Chi tiết từng câu</h3>
          <div className="d-flex flex-column gap-2">
            {questions.map((item) => (
              
              <div key={item.questionId}
                   className="d-flex align-items-center justify-content-between p-2 bg-light rounded-3">
                <div className="d-flex align-items-center">
                  <span className="d-flex align-items-center justify-content-center rounded-circle bg-danger-subtle text-danger fw-medium"
                        style={{ width: "32px", height: "32px" }}>
                    {item.orderNo}
                  </span>
                  <div className="ms-2">
                    <div className="fw-medium small">{item?.answers?.find(ans => ans.correct)?.answerText}</div>
                    <div className="text-muted fst-italic" style={{ fontSize: "12px" }}>
                      {item.progress.status === "NOT_STARTED" ? "Đã bỏ qua" : "0s"}
                    </div>
                  </div>
                </div>
                <div>
                    <div className="px-2 py-1 rounded bg-secondary-subtle text-secondary small fw-medium">
                      {item.progress.percentage}%
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Link
            to={`/courses/${courseSlug}/${lessonSlug}`}
            className="px-4 py-2 bg-light border rounded-3 text-muted fw-medium d-flex align-items-center text-decoration-none shadow-sm">
            <ChevronsLeft className="me-2" />
            Quay lại danh sách
          </Link>
        </div>
      </div>
    </div>
  );
}
