import React, { useEffect, useState } from 'react'
import Congrat from '../common/Congrat'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { syncProgressBackEnd } from '../../services/progressService';
import { updateProgress } from '../../features/lessonSlice';
import { toast } from "react-hot-toast"


const GrammarPractice = ({ questions }) => {

    const { lessonSlug, exerciseId } = useParams();
    const dispatch = useDispatch();

    const { lessons } = useSelector(state => state.lesson);
    const currentLesson = lessons?.find(lesson => lesson?.lessonSlug === lessonSlug);
    const contents = currentLesson?.contents;
    const currentContent = contents?.find(content => content.contentId === Number(exerciseId));

    const [showCongrat, setShowCongrat] = useState(false);
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState({});
    const [showResult, setShowResult] = useState(false);

    const handleAnswerTyping = (questionId, value) => {
        setShowResult(false);
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    }

    useEffect(() => {
        
        const percentage = Math.round(Object.values(results).filter(r => r === 1).length / questions.length * 100);
        
        let status = "NOT_STARTED";
        if (percentage === 100) {
            status = "COMPLETED";
        } else if (percentage > 0) {
            status = "IN_PROGRESS";
        }

        //Update content progress ui
        dispatch(updateProgress({
            lessonId: currentLesson.lessonId,
            contentId: currentContent.contentId,
            contentProgress: { status, percentage }
        }));

        if (percentage === 100) {
            setShowCongrat(true);

            //update content progress backend
            syncProgressBackEnd({
                ...currentContent.myProgress,
                status,
                percentage
            }).catch(err => {
                toast.error(err.message || "Thất bại khi lưu tiến trình học tập");
            });

            setTimeout(() => {
                setShowCongrat(false);
            }, 2000)
        }
    }, [results]);

    const handleCheck = () => {

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
    }

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
                <button onClick={handleCheck} className="btn btn-primary fw-medium">Kiểm tra</button>
                <button className="btn btn-success fw-medium">Bài tiếp theo</button>
            </div>
        </div>
    )
}

export default GrammarPractice