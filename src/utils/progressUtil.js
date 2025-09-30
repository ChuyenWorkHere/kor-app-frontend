//Ở Listening
export const calculateContentProgress = (questions, currentQuestion, correctProgress) => {

  const updatedQuestions = questions.map(q =>
    q.questionId === currentQuestion.questionId
      ? {
        ...q,
        progress: {
          status:
            correctProgress === 100
              ? "COMPLETED"
              : correctProgress > 0
                ? "IN_PROGRESS"
                : "NOT_STARTED",
          percentage: correctProgress,
          timeSpent: 0,
        },
      }
      : q
  );

  const completeQuestions = updatedQuestions.filter(
    q => q.progress.status === "COMPLETED"
  ).length;
  const totalQuestions = updatedQuestions.length;

  const percentage = totalQuestions > 0 ? (completeQuestions / totalQuestions) * 100 : 0;
  const status =
    percentage === 100
      ? "COMPLETED"
      : percentage > 0
        ? "IN_PROGRESS"
        : "NOT_STARTED";

  return { updatedQuestions, percentage: Math.round(percentage), status };
};

export const calculateLessonProgress = (contents) => {
  const completed = contents.filter(c => c?.myProgress?.status === "COMPLETED").length;

  const total = contents.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const status =
    percentage === 100
      ? "COMPLETED"
      : percentage > 0
        ? "IN_PROGRESS"
        : "NOT_STARTED";

  return {percentage, status};
}