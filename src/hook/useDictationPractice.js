import { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { updateQuestion } from '../features/questionSlice';
import { updateProgress } from '../features/lessonSlice';
import { syncProgressBackEnd } from '../services/progressService';
import { calculateContentProgress } from '../utils/progressUtil';
import { useParams } from 'react-router-dom';

const useDictationPractice = (questionList, currentLesson) => {

    const dispatch = useDispatch();
    const { exerciseId } = useParams();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [showUserProgress, setShowUserProgress] = useState(false);
    const [answerChecked, setAnswerChecked] = useState(false);
    const [isDictationResultShown, setIsDictationResultShown] = useState(false);

    const currentContent = useMemo(() => currentLesson?.contents?.find(content => content.contentId === Number(exerciseId)), [exerciseId, currentLesson]);
    const currentQuestion = useMemo(() => questionList[currentQuestionIndex], [questionList, currentQuestionIndex]);
    
    const correctAnswer = useMemo(() =>
        currentQuestion?.answers?.find(ans => ans.correct)?.answerText, [currentQuestion]
    );
    const isAnswerCorrect = useMemo(() =>
        userAnswer.trim() === correctAnswer?.trim(), [userAnswer, correctAnswer]
    );
    const correctProgress = useMemo(() =>
        correctAnswer ? Math.round((userAnswer.split("").filter((char, idx) => char === correctAnswer[idx]).length / correctAnswer.length) * 100) : 0,
        [userAnswer, correctAnswer]
    );

    const handleAnswerTyping = (value) => {
        setShowUserProgress(true);
        setUserAnswer(value);
    };

    const handleCheckAnswer = () => setAnswerChecked(true);

    const updateQuestionProgress = () => {
        const status = correctProgress === 100 ? "COMPLETED" :
            correctProgress > 0 ? "IN_PROGRESS" : "NOT_STARTED";

        dispatch(updateQuestion({
            questionId: currentQuestion.questionId,
            progress: { status, percentage: correctProgress, timeSpent: 0 }
        }));
    };

    const handleNextQuestion = () => {
        updateQuestionProgress();

        if (currentQuestionIndex < questionList.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            handleCalDictationResult();
        }

        resetAnswerState();
    };

    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
        resetAnswerState();
    };

    const resetAnswerState = () => {
        setUserAnswer("");
        setShowUserProgress(false);
        setAnswerChecked(false);
    };

    const handleCalDictationResult = async () => {
        updateQuestionProgress();

        const { percentage, status } = calculateContentProgress(questionList, currentQuestion, correctProgress);

        // Update Redux
        dispatch(updateProgress({
            lessonId: currentLesson.lessonId,
            contentId: currentQuestion.content.contentId,
            contentProgress: { status, percentage }
        }));

        
        // Sync backend
        try {
            console.log(percentage);
            await syncProgressBackEnd({
                ...currentContent.myProgress,
                status,
                percentage
            });
        } catch (err) {
            toast.error(err.message || "Thất bại khi lưu tiến trình học tập");
        }

        setIsDictationResultShown(true);
    };

    const handleGoBack = () => {
        setCurrentQuestionIndex(currentQuestionIndex);
        resetAnswerState();
    };

    return {
        currentQuestionIndex,
        currentQuestion,
        userAnswer,
        showUserProgress,
        answerChecked,
        isDictationResultShown,
        isAnswerCorrect,
        correctProgress,
        handleAnswerTyping,
        handleCheckAnswer,
        handleNextQuestion,
        handlePrevQuestion,
        handleCalDictationResult,
        handleGoBack,
        canGoPrev: currentQuestionIndex > 0,
        canGoNext: currentQuestionIndex < questionList.length - 1,
        progress: ((currentQuestionIndex + 1) / questionList.length) * 100
    };
};

export default useDictationPractice;