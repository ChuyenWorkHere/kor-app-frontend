import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const QuestionNavigation = ({ 
  canGoPrev, 
  canGoNext, 
  onPrev, 
  onNext 
}) => (
  <div className="d-flex justify-content-start gap-2 my-2">
    <button 
      className="btn btn-secondary d-flex align-items-center"
      disabled={!canGoPrev}
      onClick={onPrev}
    >
      <ChevronLeft size={18} className="me-1" /> Câu trước
    </button>
    
    <button 
      className="btn btn-outline-primary d-flex align-items-center"
      disabled={!canGoNext}
      onClick={onNext}
    >
      Câu tiếp <ChevronRight size={18} className="ms-1" />
    </button>
  </div>
);

export default QuestionNavigation;