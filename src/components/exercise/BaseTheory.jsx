import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateProgress } from '../../hook/useUpdateProgress';
import { updateProgress } from '../../features/lessonSlice';
import { useDispatch, useSelector } from 'react-redux';
import { syncProgressBackEnd } from '../../services/progressService';
import toast from 'react-hot-toast';


const BaseTheory = () => {

  const { lessonSlug, theoryId } = useParams();
  const navigate = useNavigate();
  const currentLesson = useSelector(state => state.lesson.lessons?.find(lesson => lesson?.lessonSlug === lessonSlug));
  const contents = currentLesson?.contents;
  const currentContent = contents.find(content => content.contentId === Number(theoryId));
  const [timeLeft, setTimeLeft] = useState(20);
  const dispatch = useDispatch();

  useEffect(() => {
    if (timeLeft <= 0) {

      //Update content progress ui
      dispatch(updateProgress({
        lessonId: currentLesson?.lessonId,
        contentId: currentContent?.contentId,
        contentProgress: { status: "COMPLETED", percentage: 100 }
      }));

      //update content progress backend
      syncProgressBackEnd({
        ...currentContent.myProgress,
        status: "COMPLETED",
        percentage: 100,
      }).catch(err => {
        toast.error(err?.data?.message || "Thất bại khi lưu tiến trình học tập");
      });

      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleCheck = () => {
    if (timeLeft > 0) {
      toast('Bạn cần học ít nhất 2 phút để hoàn thành bài này!', {
        duration: 4000,
        position: 'top-center',
        icon: <span style={{ fontSize: '28px' }}>⏰</span>,
        style: {
          fontSize: 14
        }
      });
    } else {
      toast('Chúc mừng bạn đã hoàn thành bài học!', {
        duration: 4000,
        position: 'top-center',
        icon: <span style={{ fontSize: '28px' }}>👏</span>,
      });
      navigate(-1);
    }
  }

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

      {/* Buttons */}
      <div className="mt-4 d-flex justify-content-center gap-2">

        <button onClick={() => navigate(-1)} className="btn btn-primary fw-medium">Quay lại</button>
        <button onClick={handleCheck}
          className="btn btn-success fw-medium">
          Hoàn thành
        </button>

      </div>
    </div>
  )

};

export default BaseTheory