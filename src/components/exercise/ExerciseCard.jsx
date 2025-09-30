import React from "react";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaRegPenToSquare } from "react-icons/fa6";
import { capitalizeWords } from "../../utils/stringUtils";

const ExerciseCard = ({ content }) => {

  const isCompleted = content.myProgress.status === "COMPLETED";

  return (

    <div className="card position-relative shadow border rounded-lg mb-3 card-lesson" 
    style={{ background: "linear-gradient(to bottom right, #F3F0FF, #ffffff)" }}>

      {/* Icon check */}
      <div className={`position-absolute top-0 end-0 m-3 p-2 ${ isCompleted ? "bg-success rounded-circle" : "bg-light rounded-3" } 
      d-flex align-items-center justify-content-center`} >
        {
          isCompleted ? (
            <FaCheck size={15} color="white" />
          ) : (
            <FaRegPenToSquare size={15} color="black" />
          )
        }
        
      </div>

      <div className="card-body py-4">
        <h5 className="card-title fw-bold text-dark fs-5">{content.contentName}</h5>
        <p className="card-text text-muted small">{content.contentDesc}</p>

        {/* Tags, Level */}
        <div className="d-flex gap-2 flex-wrap">
          <span className={`badge m-0 bg-primary`}>{capitalizeWords(content.contentTag)}</span>
          <span className={`badge m-0 bg-danger`}>{capitalizeWords(content.contentLevel)}</span>
        </div>
      </div>

      {/* Thanh progress */}
      <div className="progress rounded-0" style={{ height: "5px" }}>
        <div className="progress-bar bg-primary" style={{ width: `${content.myProgress.percentage}%` }}></div>
      </div>
    </div>
  );
};

export default ExerciseCard;
