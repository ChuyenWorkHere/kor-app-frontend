import React from 'react';
import { List, Lightbulb } from 'lucide-react';

import DictationResult from './DictationResult';
import TipCard from './TipCard';
import AudioPlayer from './AudioPlayer';
import NavigationButtons from './NavigationButton';
import ResultCard from './ResultCard';
import ProgressBar from '../common/ProgressBar';
import useDictationPractice from '../../hook/useDictationPractice';
import QuestionNavigation from './QuestionNavigation';
import AnswerInput from './AnswerInput';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PracticeContent = ({ questionList }) => {

  const { lessonSlug } = useParams();
  const currentLesson = useSelector(state => state.lesson.lessons.find(lesson => lesson.lessonSlug === lessonSlug));

  const {
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
    handleGoBack,
    handleCalDictationResult,
    canGoPrev,
    canGoNext,
    progress
  } = useDictationPractice(questionList, currentLesson);

  const [isTrickShown, setIsTrickShown] = React.useState(false);

  if (isDictationResultShown) {
    return <DictationResult questions={questionList} />;
  }

  return (
    <div className="bg-white rounded-3 shadow p-4 border border-custom w-100 mx-auto" style={{ maxWidth: "900px" }}>
      <div className="dictation-exercise position-relative">
        
        {/* Header */}
        <Header 
          isTrickShown={isTrickShown} 
          onToggleTrick={() => setIsTrickShown(!isTrickShown)} 
        />
        
        {isTrickShown && <TipCard onClose={() => setIsTrickShown(false)} />}

        {/* Progress */}
        <ProgressSection progress={progress} total={questionList.length} current={currentQuestionIndex + 1} />

        {/* Audio */}
        <AudioPlayer src={currentQuestion?.questionMedia} />

        {/* Answer Section */}
        <div className="bg-white rounded shadow-sm border p-3">
          <QuestionNavigation 
            canGoPrev={canGoPrev}
            canGoNext={canGoNext}
            onPrev={handlePrevQuestion}
            onNext={handleNextQuestion}
          />

          <AnswerInput
            userAnswer={userAnswer}
            onAnswerChange={handleAnswerTyping}
            showUserProgress={showUserProgress}
            currentQuestion={currentQuestion}
            isAnswerCorrect={isAnswerCorrect}
            handleNextQuestion={handleNextQuestion}
            handleCheckAnswer={handleCheckAnswer}
          />

          {(!isAnswerCorrect && !answerChecked) && (
            <NavigationButtons
              canGoPrev={canGoPrev}
              canGoNext={canGoNext}
              onPrev={handlePrevQuestion}
              onNext={handleNextQuestion}
              onSkip={handleNextQuestion}
              onCheck={handleCheckAnswer}
              userAnswer={userAnswer}
              answerChecked={answerChecked}
              isAnswerCorrect={isAnswerCorrect}
            />
          )}

          {(answerChecked || isAnswerCorrect) && (
            <ResultCard
              question={currentQuestion}
              userAnswer={userAnswer}
              isCorrect={isAnswerCorrect}
              handleGoBack={handleGoBack}
              handleNextQuestion={handleNextQuestion}
              correctProgress={correctProgress}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const Header = ({ isTrickShown, onToggleTrick }) => (
  <div className="d-flex flex-column justify-content-between align-items-start mb-4">
    <div className='d-flex justify-content-between align-items-center mb-4 w-100'>
      <button className="btn btn-primary d-flex align-items-center gap-2 shadow">
        <List size={18} />
        <span>Danh sách bài tập</span>
      </button>
      <button 
        className="btn bg-warning text-white d-flex align-items-center gap-2 shadow fw-medium"
        onClick={onToggleTrick}
      >
        <Lightbulb size={18} />
        <span>{isTrickShown ? "Ẩn mẹo" : "Hiện mẹo"}</span>
      </button>
    </div>
  </div>
);

const ProgressSection = ({ progress, total, current }) => (
  <div className="mb-4">
    <div className="d-flex justify-content-between small text-muted mb-1">
      <span>Tiến độ bài tập</span>
      <span>{current} / {total}</span>
    </div>
    <ProgressBar progress={progress} height="6px" bgColor="#0d6efd" />
  </div>
);

export default PracticeContent;