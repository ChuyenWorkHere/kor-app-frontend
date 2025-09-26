import React, { use, useEffect, useState } from 'react'
import CompletionCard from '../common/CompletionCard'
import LessonBanner from './LessonBanner'
import ExerciseList from '../exercise/ExerciseList'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-hot-toast"

const LessonDetail = () => {

  const { lessonSlug } = useParams();
     
  const currentLesson = useSelector(state =>
    state.lesson.lessons.find(lesson => lesson.lessonSlug === lessonSlug)
  );

  return (
    <>
      {currentLesson?.myProgress?.status === "COMPLETED" && <CompletionCard />}
      <LessonBanner currentLesson={currentLesson} />
      <ExerciseList />
    </>
  )
}

export default LessonDetail