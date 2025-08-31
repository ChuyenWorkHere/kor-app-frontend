import React from 'react'
import { BsFillLightningChargeFill } from 'react-icons/bs'
import { FaCheck, FaLightbulb, FaList, FaPlay, FaPlayCircle } from 'react-icons/fa'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import AudioPlayer from './AudioPlayer';

const PracticeContent = () => {
  return (
    <div className="bg-white rounded-3 shadow p-4 border border-secondary-subtle w-100 mx-auto" style={{ maxWidth: "900px" }}>
      <div className="dictation-exercise position-relative">
        {/* Header buttons */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <button className="btn btn-primary d-flex align-items-center gap-2 shadow">
            <FaList />
            <span>Danh sách bài tập</span>
          </button>
          <button className="btn btn-warning text-white d-flex align-items-center gap-2 shadow">
            <FaLightbulb />
            <span>Hiện mẹo</span>
          </button>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="d-flex justify-content-between small text-muted mb-1">
            <span>Tiến độ bài tập</span>
            <span>1 / 7</span>
          </div>
          <div className="progress" style={{ height: "6px" }}>
            <div className="progress-bar bg-primary" style={{ width: "14.3%" }}></div>
          </div>
        </div>

        {/* Audio player */}
        <AudioPlayer src={"/assets/audio/audio-test.wav"} />

        {/* Input answer */}
        <div className="bg-white rounded shadow-sm border p-3">
          <div className="mb-3">
            <label htmlFor="userAnswer" className="form-label small text-muted">
              Trả lời
            </label>
            <input
              autoFocus
              id="userAnswer"
              type="text"
              className="form-control text-center fs-5"
              placeholder="Gõ những gì bạn nghe được..."
            />
            <div className="form-text text-center">
              <BsFillLightningChargeFill /> Nhấn Enter để kiểm tra
            </div>
          </div>

          <div className="d-flex gap-3">
            <button className="btn btn-outline-secondary flex-grow-1 d-flex justify-content-center align-items-center">
              <MdKeyboardDoubleArrowRight size={18} className='me-2' /> Bỏ qua
            </button>
            <button className="btn btn-primary flex-grow-1 d-flex justify-content-center align-items-center" disabled>
              <FaCheck size={18} className='me-2' /> Kiểm tra
            </button>
            
          </div>
        </div>

        {/* Navigation */}
        <div className="d-flex justify-content-center gap-2 mt-4">
          <button className="btn btn-secondary d-flex align-items-center" disabled>
            <i className="bi bi-arrow-left me-1"></i> Câu trước
          </button>
          <button className="btn btn-outline-primary d-flex align-items-center">
            Câu tiếp <i className="bi bi-arrow-right ms-1"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PracticeContent