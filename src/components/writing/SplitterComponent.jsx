import React, { useEffect, useState } from "react";
import { checkMatchPercentage } from "../../utils/stringUtils";

const SplitterComponent = ({ question, showAnswer, diffWords, userAnswer, onChangeAnswer, setPercentage }) => {

  const correctAnswer = question.answers.find(ans => ans.correct)?.answerText;
  const [matchPercentage, setMatchPercentage] = useState(0);
  const [diff, setDiff] = useState([]);
  const targetMatch = 80;

  useEffect(() => {
    if (showAnswer) {
      const d = diffWords(correctAnswer, userAnswer || '');
      const percent = Math.round(checkMatchPercentage(correctAnswer, userAnswer));
      setDiff(d);
      setMatchPercentage(percent);

      setPercentage(prev => ({ ...prev, [question.questionId]: percent }));
    } else {
      
      setDiff([]);
      setMatchPercentage(0);
    }
  }, [showAnswer, userAnswer, correctAnswer, question.questionId, diffWords, setPercentage]);

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex gap-2">
          <p className="badge bg-primary text-white p-2">Task {question.orderNo}</p>
          {showAnswer && <div className={`badge ${matchPercentage >= targetMatch ? "bg-success" : "bg-danger"} p-2`}>Match: {matchPercentage}%</div>}
          {showAnswer && <div className="badge bg-success p-2">Target: {targetMatch}%</div>}
        </div>
        {
          showAnswer &&
            <div className="d-flex gap-2">
              <div className="d-flex">
                <div className="badge bg-danger px-3 py-2 fw-medium">Sai/Thừa</div>
              </div>
              <div className="d-flex">
                <div className="badge bg-success px-3 py-2 fw-medium">Đúng</div>
              </div>
            </div>
        }

      </div>

      <div
        className="d-flex border rounded shadow-sm"
        style={{ height: "300px" }}
      >
        {/* Panel trái */}
        <div className="w-50 p-3 border-end overflow-auto">
          <p className="text-secondary fs-6 lh-lg">
            {!showAnswer ? question.questionText : diff.map((part, index) => {
              if (part.removed) {
                return (
                  <span key={index} style={{ backgroundColor: "lightgreen" }}>
                    {part.value}
                  </span>
                );
              }
              if (!part.added) {
                return <span key={index}>{part.value}</span>;
              }
              return null;
            })}
          </p>
        </div>

        {/* Panel phải */}
        <div className="w-50 p-2 d-flex">
          {
            !showAnswer ?
              <textarea
                className="form-control flex-grow-1 text-secondary fs-6 lh-lg"
                value={userAnswer}
                placeholder="Write your essay..."
                style={{ resize: "none", height: "100%" }}
                onChange={(e) => onChangeAnswer(e.target.value)}
              ></textarea>
              :
              <p>
                {diff.map((part, index) => {
                  if (part.added) {
                    return (
                      <span key={index} style={{ backgroundColor: "salmon" }}>
                        {part.value}
                      </span>
                    );
                  }
                  if (!part.removed) {
                    return <span key={index}>{part.value}</span>;
                  }
                  return null;
                })}
              </p>
          }
        </div>
      </div>
    </div>
  );
};

export default SplitterComponent;
