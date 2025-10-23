import React from 'react';
import { Zap } from 'lucide-react';
import AccuracyResult from './AccuracyResult';

const AnswerInput = ({
  userAnswer,
  onAnswerChange,
  showUserProgress,
  currentQuestion,
  isAnswerCorrect,
  handleNextQuestion,
  handleCheckAnswer,
}) => (
  <div className="bg-white rounded shadow-sm border p-3 mt-3">
    <label htmlFor="userAnswer" className="fw-bold text-muted mb-2 d-block">
      Trả lời
    </label>

    <input
      autoFocus
      id="userAnswer"
      type="text"
      className="form-control text-center fs-5 fw-semibold py-2"
      value={userAnswer}
      onChange={(e) => onAnswerChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          if (isAnswerCorrect) {
            handleNextQuestion();
          } else {
            handleCheckAnswer();
          }
        }
      }}
    />

    <div className="form-text text-center mt-2 fs-6 text-muted">
      <Zap size={15} className="text-warning me-1" />
      Nhấn <strong>Enter</strong> để kiểm tra
    </div>

    {showUserProgress && (
      <AccuracyResult question={currentQuestion} userAnswer={userAnswer} />
    )}
  </div>
);

export default AnswerInput;