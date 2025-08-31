import React from "react";
import { ProgressBar } from "react-bootstrap";
import { FaBookOpen, FaCheck, FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const LessonBanner = () => {
  return (
    <div className="position-relative p-4 border rounded-4 mt-3" style={{ backgroundColor: "#f6f3ff" }}>
      {/* Header */}
      <div className="d-flex flex-md-row gap-4 gap-md-0 flex-column justify-content-between align-items-center align-items-md-start">
        <div className="pe-3 min-w-0">
          {/* Badges */}
          <div className="d-flex align-items-start mb-3 flex-wrap gap-2">
            <span className="badge m-0 rounded-pill bg-light text-primary shadow-sm d-flex align-items-center py-2 px-3 fs-6">
              <FaCheckCircle size={16} className='me-1' /> Sơ cấp
            </span>
            <span className="badge m-0 rounded-pill bg-primary text-white shadow-sm d-flex align-items-center py-2 px-3 fs-6">
              <FaBookOpen size={16} className='me-1' /> 6 bài tập
            </span>
            <span className="badge m-0 rounded-pill bg-primary text-white shadow-sm d-flex align-items-center py-2 px-3 fs-6">
              <FaCheckCircle size={16} className='me-1' /> Hoàn thành
            </span>
          </div>

          {/* Title */}
          <h1 className="fs-3 fw-bold mb-3 text-primary text-md-start text-center">Chào hỏi và Giới thiệu</h1>

          {/* Description */}
          <div className="mb-3">
            <div className="d-flex align-items-start gap-2">
              <div className="flex-shrink-0 d-flex align-items-center justify-content-center bg-light rounded-circle" style={{ width: "32px", height: "32px" }}>
                <FaInfoCircle size={20} className='text-primary' />
              </div>
              <p className="mb-0 text-secondary">
                <strong>Bài tập Dictation</strong> về Chào hỏi và Giới thiệu
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="d-flex gap-2 justify-content-md-start justify-content-center">
            <span className="badge bg-light text-dark m-0">#Giới thiệu</span>
            <span className="badge bg-light text-dark m-0">#Gặp gỡ</span>
            <span className="badge bg-light text-dark m-0">#Làm quen</span>
          </div>
        </div>

        <div className="d-flex">
          {/* Progress */}
          <div className="text-center px-3">
            <div className="small fw-medium mb-2 text-primary">Tiến độ học tập</div>
            <div className="fw-bold fs-2 text-primary">100%</div>
            <ProgressBar now={60} className="my-2" style={{ height: "12px", width: "120px" }} />
            <span className="small fw-medium text-primary">6/6 bài tập</span>
          </div>

          {/* Actions */}
          {/* <div className="d-flex flex-column gap-2 ms-3">
            <a href="/learn/topics/beginner/flashcards" className="btn btn-primary d-flex align-items-center">
              <i className="bi bi-journal-text me-2"></i> Flashcard
            </a>
            <a href="/learn/topics/beginner/korean-exercises" className="btn text-white d-flex align-items-center" style={{ background: "linear-gradient(to right, #6f42c1, #d63384)" }}>
              <i className="bi bi-collection-play me-2"></i> Bài tập Mix
              <span className="badge bg-light text-dark ms-2">Quiz + Arrange</span>
            </a>
            <a href="/learn/topics/beginner/korean-exercises/wrong-answers" className="btn btn-danger d-flex align-items-center">
              <i className="bi bi-x-circle me-2"></i> Câu Exercise sai
              <span className="badge bg-light text-dark ms-2">Quiz + Arrange</span>
            </a>
            <a href="/learn/topics/beginner/flashcards?mode=incorrect" className="btn btn-warning d-flex align-items-center text-white">
              <i className="bi bi-exclamation-circle me-2"></i> Flashcard sai
              <span className="badge bg-light text-dark ms-2">Ôn lại</span>
            </a>
          </div> */}
        </div>

      </div>
    </div>
  );
};

export default LessonBanner;
