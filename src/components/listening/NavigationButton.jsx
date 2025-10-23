import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsRight, Check } from 'lucide-react';

const NavigationButtons = ({
  canGoPrev,
  canGoNext,
  onPrev,
  onNext,
  onSkip,
  onCheck,
  userAnswer,
  answerChecked,
  isAnswerCorrect
}) => (
  <div className="d-flex gap-3 mt-4">
    <button 
      className="btn border-custom flex-grow-1 d-flex justify-content-center align-items-center fw-medium fs-5"
      onClick={onSkip}
      disabled={isAnswerCorrect}
    >
      <ChevronsRight size={20} className="me-2" /> Bỏ qua
    </button>
    
    <button 
      className="btn btn-primary flex-grow-1 d-flex justify-content-center align-items-center py-3 fw-medium fs-5"
      disabled={!userAnswer.trim()}
      onClick={onCheck}
    >
      <Check size={20} className="me-2" /> Kiểm tra
    </button>
  </div>
);

export default NavigationButtons;