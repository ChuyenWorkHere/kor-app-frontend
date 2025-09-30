import React, { useState } from 'react'
import { BsFillLightningChargeFill } from 'react-icons/bs'
import { FaLightbulb, FaList } from 'react-icons/fa'
import { FaCheck } from "react-icons/fa6";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import AudioPlayer from './AudioPlayer';
import AccuracyResult from './AccuracyResult';
import TipCard from './TipCard';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ResultCard from './ResultCard';
import ProgressBar from '../common/ProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuestion } from '../../features/questionSlice';
import DictationResult from './DictationResult';
import { updateProgress } from '../../features/lessonSlice';
import { syncProgressBackEnd } from '../../services/progressService';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { calculateContentProgress, calculateLessonProgress } from '../../utils/progressUtil';

const PracticeContent = ({ currentQuestionIndex, setCurrentQuestionIndex, questionList }) => {

  const dispatch = useDispatch();
  const { lessonSlug } = useParams();
  const { lessons } = useSelector(state => state.lesson);
  const currentLesson = lessons?.find(lesson => lesson?.lessonSlug === lessonSlug)
  const contents = currentLesson?.contents;
  const currentQuestion = questionList[currentQuestionIndex];
  const currentContent = contents.find(content => content.contentId === currentQuestion?.content.contentId);

  const [isTrickShown, setIsTrickShown] = useState(false);

  const [userAnswer, setUserAnswer] = useState("");
  const [showUserProgress, setShowUserProgress] = useState(false);
  const [answerChecked, setAnswerChecked] = useState(false);
  const [isDictationResultShown, setIsDictationResultShown] = useState(false);

  const correctAnswer = currentQuestion?.answers?.find(ans => ans.correct)?.answerText;
  const isAnswerCorrect = userAnswer.trim() === correctAnswer?.trim();
  const correctProgress = correctAnswer ? (userAnswer.split("").filter((char, idx) => char === correctAnswer[idx]).length / correctAnswer.length) * 100 : 0;

  const updateQuestionProgress = () => {
    let status = "NOT_STARTED";
    if (correctProgress === 100) {
      status = "COMPLETED";
    } else if (correctProgress > 0) {
      status = "IN_PROGRESS";
    }
    dispatch(updateQuestion({
      questionId: currentQuestion.questionId,
      progress: { status, percentage: correctProgress, timeSpent: 0 }
    }));
  }

  const handleAnswerTyping = (e) => {
    setShowUserProgress(true);
    setUserAnswer(e.target.value);
  };

  const handleCheckAnswer = () => {
    setAnswerChecked(true);
  }

  const handleNextQuestion = () => {
    updateQuestionProgress();
    if (currentQuestionIndex < questionList.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentQuestionIndex === questionList.length - 1) {
      handleCalDictationResult();
    }
    setUserAnswer("");
    setShowUserProgress(false);
    setAnswerChecked(false);
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
    setUserAnswer("");
    setShowUserProgress(false);
    setAnswerChecked(false);
  }

  const handleGoBack = () => {
    setCurrentQuestionIndex(currentQuestionIndex);
    setUserAnswer("");
    setShowUserProgress(false);
    setAnswerChecked(false);
  }

  const handleCalDictationResult = () => {

    updateQuestionProgress();

    //Tạo progress giả để không cần đợi redux cập nhật
    const { percentage, status } = calculateContentProgress(questionList, currentQuestion, correctProgress);
    
    //Update content progress ui
    dispatch(updateProgress({
      lessonId: currentLesson.lessonId,
      contentId: currentContent.contentId,
      contentProgress: { status, percentage }
    }));

    //update content progress backend
    syncProgressBackEnd({
      ...currentContent.myProgress,
      status,
      percentage
    }).catch(err => {
      toast.error(err.message || "Thất bại khi lưu tiến trình học tập");
    });

    setIsDictationResultShown(true);
  }

  return (
    <div className="bg-white rounded-3 shadow p-4 border border-custom w-100 mx-auto" style={{ maxWidth: "900px" }}>
      {!isDictationResultShown ? (
        <div className="dictation-exercise position-relative">

          {/* Header buttons */}
          <div className="d-flex flex-column justify-content-between align-items-start mb-4">
            <div className='d-flex justify-content-between align-items-center mb-4 w-100'>
              <button className="btn btn-primary d-flex align-items-center gap-2 shadow">
                <FaList />
                <span>Danh sách bài tập</span>
              </button>
              <button className="btn bg-warning text-white d-flex align-items-center gap-2 shadow fw-medium"
                onClick={() => setIsTrickShown(!isTrickShown)}>
                <FaLightbulb />
                <span>{isTrickShown ? "Ẩn mẹo" : "Hiện mẹo"}</span>
              </button>
            </div>
            {isTrickShown && <TipCard onClose={() => setIsTrickShown(!isTrickShown)} />}
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="d-flex justify-content-between small text-muted mb-1">
              <span>Tiến độ bài tập</span>
              <span>{currentQuestionIndex + 1} / {questionList.length}</span>
            </div>
            <ProgressBar progress={(currentQuestionIndex + 1) / questionList.length * 100} height="6px" bgColor="#0d6efd" />
          </div>

          {/* Audio player */}
          <AudioPlayer src={currentQuestion?.questionMedia} />

          {/* Input answer */}
          <div className="bg-white rounded shadow-sm border p-3">

            {/* Navigation */}
            <div className="d-flex justify-content-start gap-2 my-2">
              <button className="btn btn-secondary d-flex align-items-center"
                disabled={currentQuestionIndex === 0}
                onClick={handlePrevQuestion}>
                <IoIosArrowBack className="me-1" /> Câu trước
              </button>
              <button className="btn btn-outline-primary d-flex align-items-center"
                disabled={currentQuestionIndex === questionList.length - 1}
                onClick={handleNextQuestion}>
                Câu tiếp <IoIosArrowForward className="ms-1" />
              </button>
            </div>

            <label htmlFor="userAnswer" className="fw-bold text-muted">
              Trả lời
            </label>
            <div className="mb-3">
              <input
                autoFocus
                id="userAnswer"
                type="text"
                className="form-control text-center fs-5 fw-semibold py-2"
                value={userAnswer}
                onChange={handleAnswerTyping}
                onKeyDown={e => {
                  if (e.key === "Enter" && isAnswerCorrect) {
                    handleNextQuestion();
                  } else if (e.key === "Enter") {
                    handleCheckAnswer();
                  }
                }}
              />
              <div className="form-text text-center mt-2 fs-6 mt-1 text-muted">
                <BsFillLightningChargeFill className="text-warning me-1" />
                Nhấn <strong>Enter</strong> để kiểm tra
              </div>
            </div>

            {showUserProgress && <AccuracyResult question={currentQuestion} userAnswer={userAnswer} />}

            {!isAnswerCorrect && (
              <div className="d-flex gap-3">
                <button className="btn border-custom flex-grow-1 d-flex justify-content-center align-items-center fw-medium fs-5"
                  onClick={handleNextQuestion}
                >
                  <MdKeyboardDoubleArrowRight size={20} className='me-2' /> Bỏ qua
                </button>
                <button className="btn btn-primary flex-grow-1 d-flex justify-content-center align-items-center py-3 fw-medium fs-5"
                  disabled={!userAnswer.trim()}
                  onClick={handleCheckAnswer}
                >
                  <FaCheck size={20} className='me-2' /> Kiểm tra
                </button>

              </div>
            )}

            {(answerChecked || isAnswerCorrect) && <ResultCard
              question={currentQuestion}
              userAnswer={userAnswer}
              isCorrect={isAnswerCorrect}
              handleNextQuestion={handleNextQuestion}
              handleGoBack={handleGoBack} />}
          </div>

        </div>
      ) : <DictationResult questions={questionList} />}
    </div>
  )
}

export default PracticeContent