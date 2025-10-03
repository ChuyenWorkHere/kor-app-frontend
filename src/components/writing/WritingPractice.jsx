import React, { useEffect, useState } from 'react'
import SplitterComponent from './SplitterComponent'
import { useNavigate, useParams } from 'react-router-dom'
import { diffWords } from "diff";
import { useDispatch, useSelector } from 'react-redux';
import { updateProgress } from '../../features/lessonSlice';
import { syncProgressBackEnd } from '../../services/progressService';
import toast from 'react-hot-toast';

const WritingPractice = ({ questions }) => {

    const { lessonSlug, exerciseId } = useParams();
    const dispatch = useDispatch();
    const { lessons } = useSelector(state => state.lesson);
    const currentLesson = lessons?.find(lesson => lesson?.lessonSlug === lessonSlug);
    const contents = currentLesson?.contents;
    const currentContent = contents.find(content => content.contentId === Number(exerciseId));
    const navigate = useNavigate();

    const [showAnswer, setShowAnswer] = useState(false);
    const [userAnswers, setUserAnswers] = useState({});
    const [averagePercentage, setAveragePercentage] = useState({});

    const handleInputChange = (id, value) => {
        setUserAnswers(prev => ({ ...prev, [id]: value }));
    };

    const handleCheck = () => {
        if (showAnswer) {
            setUserAnswers({});
        }
        setShowAnswer(prev => !prev);
    };

    useEffect(() => {
        const values = Object.values(averagePercentage);

        if (values.length === 0) return;

        const avg = values.reduce((sum, val) => sum + val, 0)/values.length;
        if (avg >= 80) {
            //Update content progress ui
            dispatch(updateProgress({
                lessonId: currentLesson.lessonId,
                contentId: currentContent.contentId,
                contentProgress: { status: "COMPLETED", percentage: 100 }
            }));

            syncProgressBackEnd({
                ...currentContent.myProgress,
                status: "COMPLETED",
                percentage: 100
            }).catch(err => {
                toast.error(err.message || "Thất bại khi lưu tiến trình học tập");
            });

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
        } else {
            toast("Bạn đã làm rất tốt, hãy thử lại nhé!", {
                icon: <span style={{ fontSize: 24 }}>💪</span>,
                style: {
                    borderRadius: '5px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }, [averagePercentage]);

    return (
        <>
            {questions.map(q => (
                <SplitterComponent
                    key={q.questionId}
                    question={q}
                    showAnswer={showAnswer}
                    diffWords={diffWords}
                    userAnswer={userAnswers[q.questionId] || ''}
                    onChangeAnswer={value => handleInputChange(q.questionId, value)}
                    setPercentage={setAveragePercentage}
                />
            ))}
            {/* Buttons */}
            <div className="mt-4 d-flex justify-content-center gap-2">

                <button onClick={() => navigate(-1)} className="btn btn-primary fw-medium">Quay lại</button>
                <button
                    className="btn btn-success fw-medium"
                    onClick={handleCheck}
                >
                    {showAnswer ? "Làm lại" : "Kiểm tra"}
                </button>
            </div>
        </>
    )
}

export default WritingPractice