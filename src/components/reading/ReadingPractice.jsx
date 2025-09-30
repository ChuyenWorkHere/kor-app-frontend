import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Switch } from '@mui/material';
import Congrat from '../common/Congrat'
import { useUpdateProgress } from "../../hook/useUpdateProgress";
import { useCooldown } from "../../hook/useCooldown";
import toast from "react-hot-toast";

const ReadingPractice = ({ questions }) => {

  const navigate = useNavigate();

  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [showResult, setShowResult] = useState(false);

  //Highlight text
  const [highlightMode, setHighlightMode] = useState(false);

  //Khoảng cách giữa các lần kiểm tra đáp án
  const [lastCheckTime, setLastCheckTime] = useState(null);
  const [cooldown, setCooldown] = useState(0);

  const handleHighlight = () => {
    console.log(highlightMode);
    if (!highlightMode) return;
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      if (!range.collapsed) {
        const span = document.createElement("span");
        span.style.backgroundColor = "yellow";
        try {
          range.surroundContents(span);
          selection.removeAllRanges();
        } catch (err) {
          console.error("Không thể highlight:", err);
        }
      }
    }
  };

  const handleSelectAnswer = (questionId, answerId) => {
    setShowResult(false);
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const handleCheckResult = () => {

    const now = Date.now();
    if (lastCheckTime && now - lastCheckTime < 60000) {
      return;
    }

    let isAllCorrect = true;

    questions.map(question => {
      const correctAnswerId = question.answers.find(ans => ans.correct)?.answerId;

      const userAnswerId = answers[question.questionId];

      if (correctAnswerId === userAnswerId) {
        setResults(prev => ({
          ...prev, [question.questionId]: 1
        }))
      } else {
        isAllCorrect = false;
        setResults(prev => ({
          ...prev, [question.questionId]: 0
        }))
      }
    })
    if (!isAllCorrect) {
      setLastCheckTime(now);
      setCooldown(60);
      toast("Bạn đã làm rất tốt, hãy thử lại nhé!", {
        icon: <span style={{ fontSize: 24 }}>💪</span>,
        style: {
          borderRadius: '5px',
          background: '#333',
          color: '#fff',
        },
      });
    } else {
      toast("Chúc mừng, bạn đã hoàn thành bài tập này!!", {
        icon: <span style={{ fontSize: 24 }}>🎉</span>,
        style: {
          borderRadius: '5px',
          background: '#333',
          color: '#fff',
        },
      });
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    }
    setShowResult(true);

  }

  useCooldown(cooldown, setCooldown);

  useUpdateProgress(results, questions);

  return (
    <div className="container my-4">
      <div className="row g-4">
        {/* Left column - Letter */}
        <div className="col-xl-12">
          <div
            className="p-4 bg-light border rounded overflow-auto position-relative"
          >
            <div className="position-absolute end-0 me-4">
              <Switch checked={highlightMode} onChange={(e, checked) => setHighlightMode(checked)} />
              <span>Highlight nội dung</span>
            </div>
            <div onMouseUp={handleHighlight}>
              <p>Hi Lucia</p>
              <p>
                How are you? It was so nice to meet you last week in Sydney at the
                sales meeting. How was the rest of your trip? Did you see any
                kangaroos? I hope you got home to Mexico City OK.
              </p>
              <p>
                Anyway, I have the documents about the new Berlin offices. We're
                going to be open in three months. I moved here from London just
                last week. They are very nice offices, and the location is
                perfect. There are lots of restaurants, cafés and banks in the
                area. There's also public transport; we are next to an U-Bahn
                (that is the name for the metro here). Maybe you can come and see
                them one day? I would love to show you Berlin, especially in the
                winter. You said you have never seen snow – you will see lots
                here!
              </p>
              <p>
                Here's a photo of you and me at the restaurant in Sydney. That was
                a very fun night! Remember the singing Englishman? Crazy! Please
                send me any other photos you have of that night. Good memories.
              </p>
              <p>
                Please give me your email address and I will send you the
                documents.
              </p>
              <p>Bye for now</p>
              <p>Mikel</p>
            </div>

          </div>
        </div>

        {/* Right column - Questions */}
        <div
          className="col-xl-12"
        >
          <ul className="list-unstyled row">
            {questions.map((q) => (
              <li className="col-md-6 col-12" key={q.questionId}>
                <div className="d-flex align-items-start gap-2">
                  <button className={`btn ${showResult ? (results[q.questionId] ? "btn-success" : "btn-danger") : "btn-primary"} btn-sm rounded-circle fw-bold pe-none`}>
                    {q.orderNo}
                  </button>
                  <div>
                    <span>{q.questionText}</span>
                    <div className="mt-2">
                      {q.answers.map((ans, idx) => {
                        const isChecked = ans.answerId === answers[q.questionId];
                        const isCorrect = showResult && results[q.questionId];
                        const isWrong = showResult && isChecked && !isCorrect;
                        return (
                          <div className="form-check px-0" key={ans.answerId}>
                            <input
                              className="form-check-input"
                              type="radio"
                              name={q.questionId}
                              id={ans.answerId}
                              value={ans.answerText}
                              checked={isChecked || false}
                              onChange={() => handleSelectAnswer(q.questionId, ans.answerId)}
                            />
                            <label
                              className={`form-check-label ${isCorrect && isChecked ? "text-success" : ""} ${isWrong && isChecked ? "text-danger" : ""}`}
                              htmlFor={ans.answerId}
                            >
                              {ans.answerText}
                            </label>
                          </div>
                        )

                      })}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

        </div>

        {/* Buttons */}
        <div className="mt-4 d-flex justify-content-center gap-2">

          <button onClick={() => navigate(-1)} className="btn btn-primary fw-medium">Quay lại</button>
          <button onClick={handleCheckResult}
            className="btn btn-success fw-medium"
            disabled={cooldown > 0}>
            {cooldown > 0 ? `Chờ ${cooldown}s...` : "Kiểm tra"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default ReadingPractice;
