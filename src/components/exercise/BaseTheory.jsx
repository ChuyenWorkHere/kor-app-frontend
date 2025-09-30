import React from 'react'
import { useParams } from 'react-router-dom';


const BaseTheory = () => {
  const { courseSlug, lessonSlug, exerciseId } = useParams();

  return (
    <div
      className="p-3 bg-white rounded shadow-sm text-list-style"
    >
      <h2 className="fs-4 fw-bold mb-3">{lessonSlug}</h2>

      <h3 className="fs-5 fw-semibold">1. Cách dùng</h3>
      <p className="mb-2">
        Thì hiện tại đơn được dùng để diễn tả thói quen, sự thật hiển nhiên, hoặc
        lịch trình cố định.
      </p>

      <ul className="list-unstyled mb-3">
        <li>✔ Diễn tả thói quen: I go to school every day.</li>
        <li>✔ Sự thật hiển nhiên: The sun rises in the east.</li>
        <li>✔ Lịch trình: The train leaves at 7 a.m.</li>
      </ul>

      <pre className="bg-light p-2 rounded">
        {`Cấu trúc:
    - Khẳng định: S + V(s/es) + O
    - Phủ định: S + do/does not + V + O
    - Nghi vấn: Do/Does + S + V + O ?
    `}
      </pre>

      <h3 className="fs-5 fw-semibold mt-4">2. Bài tập áp dụng</h3>
      <p className="mb-0">Chọn đáp án đúng để hoàn thành câu:</p>
      <ul className="list-unstyled mt-2">
        <li>1. She usually ____ (go) to work by bus.</li>
        <li>2. The earth ____ (circle) the sun.</li>
        <li>3. They ____ (not/play) football on Mondays.</li>
      </ul>
    </div>
  )

};

export default BaseTheory