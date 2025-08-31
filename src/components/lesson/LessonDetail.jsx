import React from 'react'
import CompletionCard from '../common/CompletionCard'
import LessonBanner from './LessonBanner'
import ExerciseList from '../exercise/ExerciseList'
import { useLocation } from 'react-router-dom'

const LessonDetail = () => {

  const location = useLocation();

  const type = location.pathname.split('/')[1];

  return (
    <>
        <CompletionCard />
        <LessonBanner />
        <ExerciseList type={type} />
    </>
  )
}

export default LessonDetail