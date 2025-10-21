import React, { useState } from 'react'
import PracticeHeader from './PracticeHeader'
import PracticeContent from './PracticeContent'

const ListeningPractice = ({questions}) => {
  
  return (
    <>
      <PracticeHeader content={questions[0]?.content} />
      <PracticeContent questionList={questions} />
    </>
  )
}

export default ListeningPractice