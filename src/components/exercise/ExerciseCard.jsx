import React from "react";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const ExerciseCard = () => {
  // Dữ liệu mẫu
  const title = "Bài tập 1: Chào hỏi và giới thiệu tên";
  const description = "Học cách chào hỏi và giới thiệu tên của mình";
  const tags = [
    { label: "Nghe - Viết", color: "bg-primary" },
    { label: "Khó", color: "bg-danger" },
  ];
  const progress = 60; // %

  return (

    <div className="card position-relative shadow border rounded-lg mb-3 card-lesson" style={{ background: "linear-gradient(to bottom right, #F3F0FF, #ffffff)" }}>

        {/* Badge Hoàn thành */}
        <div className="position-absolute top-0 start-0">
          <span className="badge rounded-top px-3 py-2 shadow-sm" style={{ backgroundColor: "#25bd65" }}><FaCheck className="mb-1" /> Hoàn thành</span>
        </div>

        {/* Icon check */}
        <div className="position-absolute top-0 end-0 m-2 rounded-circle d-flex align-items-center justify-content-center shadow" style={{ width: "30px", height: "30px", backgroundColor: "#25bd65" }}>
          <FaCheck size={15} color="white" />
        </div>

        <div className="card-body pt-5">
          <h5 className="card-title fw-bold text-dark fs-5">{title}</h5>
          <p className="card-text text-muted small">{description}</p>

          {/* Tags */}
          <div className="d-flex gap-2 flex-wrap">
            {tags.map((tag, index) => (
              <span key={index} className={`badge m-0 ${tag.color}`}>{tag.label}</span>
            ))}
          </div>
        </div>

        {/* Thanh progress */}
        <div className="progress rounded-0" style={{ height: "5px" }}>
          <div className="progress-bar bg-primary" style={{ width: `${progress}%` }}></div>
        </div>

    </div>
  );
};

export default ExerciseCard;
