import React, { useEffect } from 'react';
import GrammarPractice from '../grammar/GrammarPractice';
import ListeningPractice from '../listening/ListeningPractice';
import ReadingPractice from '../reading/ReadingPractice';
import NotFound from '../common/NotFound';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllQuestionsInContent } from '../../features/questionSlice';
import { useBreadCrumb } from '../../hook/useBreadCrumb';

const practiceComponents = {
  grammar: GrammarPractice,
  listening: ListeningPractice,
  reading: ReadingPractice,
};

const BasePractice = () => {
  const { courseSlug, lessonSlug, exerciseId } = useParams();
  const PracticeComponent = practiceComponents[courseSlug];
  
  useBreadCrumb();
  
  const dispatch = useDispatch();
  const { questions, loading, error } = useSelector((state) => state.question);

  useEffect(() => {
    if (exerciseId) {
      dispatch(fetchAllQuestionsInContent(exerciseId));
    }
  }, [dispatch, exerciseId]);

  return PracticeComponent
    ? <PracticeComponent questions={questions} />
    : <NotFound />;
};

export default BasePractice;