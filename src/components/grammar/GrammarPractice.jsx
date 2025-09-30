import React, { useEffect, useState } from 'react'
import Congrat from '../common/Congrat'
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useUpdateProgress } from '../../hook/useUpdateProgress';
import { useCooldown } from '../../hook/useCooldown';
import { useNavigate } from 'react-router-dom';


const GrammarPractice = ({ questions }) => {

    const navigate = useNavigate();

    const currentContent = questions[0]?.content;

    const [showCongrat, setShowCongrat] = useState(false);
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState({});
    const [showResult, setShowResult] = useState(false);

    //Khoảng cách giữa các lần kiểm tra đáp án
    const [lastCheckTime, setLastCheckTime] = useState(null);
    const [cooldown, setCooldown] = useState(0);

    const handleAnswerTyping = (questionId, value) => {
        setShowResult(false);
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    }



    const handleCheck = () => {

        const now = Date.now();
        if (lastCheckTime && now - lastCheckTime < 60000) {
            return;
        }

        questions.map(question => {
            const correctAnswer = question.answers.find(ans => ans.correct)?.answerText;

            const userAnswer = answers[question.questionId];

            if (correctAnswer.trim() === userAnswer?.trim()) {
                setResults(prev => ({
                    ...prev, [question.questionId]: 1
                }))
            } else {
                setResults(prev => ({
                    ...prev, [question.questionId]: 0
                }))
            }
        })
        setShowResult(true);
        setLastCheckTime(now);
        setCooldown(60);
    }
    useCooldown(cooldown, setCooldown);
    useUpdateProgress(results, questions, setShowCongrat);

    return (
        <div className="p-2 position-relative">

            {showCongrat && <Congrat />}

            {/* Tiêu đề */}
            <div className="mb-2">
                <h2 className="h5 fw-medium text-dark">
                    {currentContent?.contentName || 'Luyện tập ngữ pháp'}
                </h2>
                <p className="text-muted">Cập nhật ngày 15/08/2024</p>
            </div>

            <span className="fw-semibold text-dark">
                Vận dụng kiến thức đã học ở bài trước và trả lời các câu hỏi
                sau:
            </span>

            {/* Danh sách câu hỏi */}
            <div className="mt-3">
                {questions.map((q, idx) => (
                    <div className="mb-3" key={q.questionId}>
                        <label className="me-2 fw-medium">{idx + 1}.</label>
                        <input
                            type="text"
                            className="form-control d-inline-block w-auto me-2"
                            value={answers[q.questionId] || ""}
                            onChange={(e) => handleAnswerTyping(q.questionId, e.target.value)}
                        />
                        <span className="fw-medium">{q.questionText}</span>
                        {
                            showResult &&
                            (results[q.questionId] ? <FaCheck className='ms-2' size={20} color='green' /> : <IoMdClose className='ms-2' size={20} color='red' />)
                        }

                    </div>
                ))}
            </div>

            {/* Buttons */}
            <div className="mt-4 d-flex justify-content-center gap-2">

                <button onClick={() => navigate(-1)} className="btn btn-primary fw-medium">Quay lại</button>
                <button onClick={handleCheck}
                    className="btn btn-success fw-medium"
                    disabled={cooldown > 0}>
                    {cooldown > 0 ? `Chờ ${cooldown}s...` : "Kiểm tra"}
                </button>

            </div>
        </div>
    )
}

export default GrammarPractice