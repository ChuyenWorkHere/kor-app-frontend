import React, { useState } from 'react'
import PracticeHeader from './PracticeHeader'
import PracticeContent from './PracticeContent'

const ListeningPractice = ({questions}) => {
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <PracticeHeader content={currentQuestion?.content} />
      <PracticeContent currentQuestionIndex={currentQuestionIndex} setCurrentQuestionIndex={setCurrentQuestionIndex} questionList={questions} />
    </>
  )
}

export default ListeningPractice