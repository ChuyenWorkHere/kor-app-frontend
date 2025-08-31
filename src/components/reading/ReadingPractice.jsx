import React from "react";

const ReadingPractice = () => {
  const questions = [
    {
      id: 1,
      text: "Where did Mikel and Lucia meet last week?",
      options: ["Berlin", "Mexico City", "Sydney"],
      correct: 2,
    },
    {
      id: 2,
      text: "What did Mikel ask Lucia about her trip?",
      options: [
        "If she had seen any kangaroos",
        "If she enjoyed the weather in Sydney",
        "If she visited the Berlin offices",
      ],
      correct: 0,
    },
    {
      id: 3,
      text: "When will the new Berlin offices open?",
      options: ["In one month", "In three months", "In six months"],
      correct: 1,
    },
    {
      id: 4,
      text: "Why did Mikel move to Berlin?",
      options: ["For a holiday", "For work", "To visit family"],
      correct: 1,
    },
    {
      id: 5,
      text: "What does Mikel say about the location of the new Berlin offices?",
      options: [
        "It is far from any public transport.",
        "It is next to a metro station.",
        "There are no restaurants nearby.",
      ],
      correct: 1,
    },
    {
      id: 6,
      text: "What does Mikel invite Lucia to do?",
      options: [
        "Visit him in London",
        "Visit the new Berlin offices",
        "Come to a party in Sydney",
      ],
      correct: 1,
    },
    {
      id: 7,
      text: "What photo does Mikel send to Lucia?",
      options: [
        "A photo of the Berlin office",
        "A photo of them at a restaurant in Sydney",
        "A photo of snow in Berlin",
      ],
      correct: 1,
    },
  ];

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
              <li key={q.id}>
                <div className="d-flex align-items-start gap-2">
                  <button className="btn btn-primary btn-sm rounded-circle fw-bold">
                    {q.id}
                  </button>
                  <div>
                    <span>{q.text}</span>
                    <div className="mt-2">
                      {q.options.map((opt, idx) => (
                        <div className="form-check" key={idx}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name={`question-${q.id}`}
                            id={`q${q.id}-opt${idx}`}
                            value={opt}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`q${q.id}-opt${idx}`}
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
