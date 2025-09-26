import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ReadingPractice = ({ questions }) => {

  const { lessonSlug, exerciseId } = useParams();
  const dispatch = useDispatch();

  const { lessons } = useSelector(state => state.lesson);
  const currentLesson = lessons?.find(lesson => lesson?.lessonSlug === lessonSlug);
  const contents = currentLesson?.contents;
  const currentContent = contents?.find(content => content.contentId === Number(exerciseId));

  const [showCongrat, setShowCongrat] = useState(false);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [showResult, setShowResult] = useState(false);

  return (
    <div className="container my-4">
      <div className="row g-4">
        {/* Left column - Letter */}
        <div className="col-xl-7 p-0">
          <div
            className="p-4 bg-light border rounded overflow-auto max-h-lg-600"
          >
            <p>Hi Lucia</p>
            <p>
              How are you? It was so nice to meet you last week in Sydney at the
              sales meeting. How was the rest of your trip? Did you see any
              kangaroos? I hope you got home to Mexico City OK.
            </p>
            <p>
              Anyway, I have the documents about the new Berlin offices. We're
              going to be open in three months. I moved here from London just
              last week. They are very nice offices, and the location is
              perfect. There are lots of restaurants, cafés and banks in the
              area. There's also public transport; we are next to an U-Bahn
              (that is the name for the metro here). Maybe you can come and see
              them one day? I would love to show you Berlin, especially in the
              winter. You said you have never seen snow – you will see lots
              here!
            </p>
            <p>
              Here's a photo of you and me at the restaurant in Sydney. That was
              a very fun night! Remember the singing Englishman? Crazy! Please
              send me any other photos you have of that night. Good memories.
            </p>
            <p>
              Please give me your email address and I will send you the
              documents.
            </p>
            <p>Bye for now</p>
            <p>Mikel</p>
          </div>
        </div>

        {/* Right column - Questions */}
        <div
          className="col-xl-5 overflow-lg-auto overflow-none max-h-lg-600"
        >
          <ul className="list-unstyled d-flex flex-column gap-4">
            {questions.map((q) => (
              <li key={q.questionId}>
                <div className="d-flex align-items-start gap-2">
                  <button className="btn btn-primary btn-sm rounded-circle fw-bold">
                    {q.questionId}
                  </button>
                  <div>
                    <span>{q.questionText}</span>
                    <div className="mt-2">
                      {q.answers.map((ans, idx) => (
                        <div className="form-check" key={ans.answerId}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name={q.questionId}
                            id={ans.answerId}
                            value={ans.answerText}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={q.questionId}
                          >
                            {String.fromCharCode(65 + idx)} {opt}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReadingPractice;
