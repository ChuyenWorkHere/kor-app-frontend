import React from 'react'
import GrammarTheory from '../grammar/GrammarTheory';
import { useParams } from 'react-router-dom';

const theoryComponents = {
  grammar: GrammarTheory,
};

const BaseTheory = () => {
  const { courseSlug, lessonSlug, exerciseId } = useParams();
  const TheoryComponent = theoryComponents[courseSlug];

  return TheoryComponent
    ? <TheoryComponent lessonSlug={lessonSlug} exerciseId={exerciseId} />
    : <div>Không tìm thấy bài luyện tập phù hợp.</div>;
};

export default BaseTheory