import React from 'react'

const GrammarPractice = () => {
    return (
        <div className="p-2">
            {/* Tiêu đề */}
            <div className="mb-2">
                <h2 className="h5 fw-medium text-dark">
                    2. Thực hành thì hiện tại đơn
                </h2>
                <p className="text-muted">Cập nhật ngày 15/08/2024</p>
            </div>

            <span className="fw-semibold text-dark">
                Vận dụng kiến thức đã học ở bài trước và trả lời các câu hỏi
                sau:
            </span>

            {/* Danh sách câu hỏi */}
            <div className="mt-3">
                {[
                    "She (be) very talented.",
                    "They (be) excited about the trip.",
                    "The book (be) on the table.",
                    "My friends (be) here right now.",
                    "Tom (be) a great cook.",
                    "I (not/be) sure about the answer",
                    "He (not/be) at home.",
                    "We (not/be) interested in the movie.",
                    "It (not/be) raining today.",
                    "They (not/be) ready for the test.",
                    "___ she a student?",
                    "___ they from Italy?",
                    "___ the restaurant open now?",
                    "___ you satisfied with the service?",
                    "___ he your brother?",
                    "Where (be) the keys?",
                    "Why (be) she so late?",
                    "What (be) the problem?",
                    "Who (be) your favorite author?",
                    "She (eat) breakfast every morning.",
                    "They (enjoy) hiking on weekends.",
                    "He (read) books before bed.",
                    "I (watch) TV in the evenings.",
                    "My parents (travel) a lot.",
                    "I (not/like) spinach.",
                    "She (not/go) to the gym regularly.",
                    "They (not/play) soccer on Sundays.",
                    "He (not/watch) horror movies.",
                    "We (not/understand) the instructions",
                    "___ you enjoy music?",
                    "___ she have a pet?",
                    "___ they study hard?",
                    "___ he speak Spanish?",
                    "___ we need more time?",
                    "Where (you/go) for vacation?",
                    "What (she/do) on weekends?",
                    "How (they/prepare) for the exam?",
                    "When (he/leave) for work?",
                    "Why (you/choose) this restaurant?",
                ].map((q, idx) => (
                    <div className="mb-3" key={idx}>
                        <label className="me-2 fw-medium">{idx + 1}.</label>
                        <input
                            type="text"
                            className="form-control d-inline-block w-auto me-2"
                        />
                        <span className="fw-medium">{q}</span>
                    </div>
                ))}
            </div>

            {/* Buttons */}
            <div className="mt-4 d-flex justify-content-center gap-2">
                <button className="btn btn-primary fw-medium">Kiểm tra</button>
                <button className="btn btn-success fw-medium">Bài tiếp theo</button>
            </div>
        </div>
    )
}

export default GrammarPractice