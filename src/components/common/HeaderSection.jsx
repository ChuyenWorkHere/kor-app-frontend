import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import api from "../../config/axiosConfig";

const levelColor = {
  1: "#5f2eea",
  2: "#ff6b6b",
  3: "#06d6a0"
}

const HeaderSection = () => {

  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  useEffect(() => {

    api.get("/public/levels")
      .then(response => {
        const levelsData = response.data.data;
        setLevels(levelsData);

        if (levelsData.length > 0) {
          setSelectedLevel(levelsData[0]);
        }
      })
      .catch(error => {
        console.error("Error fetching levels:", error);
      });

  }, []);

  return (
    <div
      className="position-relative overflow-hidden border-bottom"
    >
      <div className="py-3 px-0 position-relative" style={{ zIndex: 10 }}>
        <div className="row align-items-center mb-3">
          <div className="col d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3">

            {/* Select cấp độ */}
            <select
              className="form-select px-3 py-2 rounded w-100 w-sm-auto"
              value={selectedLevel?.levelId || 0}
              onChange={e =>
                setSelectedLevel(
                  levels.find(level => level.levelId === Number(e.target.value))
                )
              }
            >
              {levels.map(level => (
                <option key={level.levelId} value={level.levelId}>
                  {level.levelName}
                </option>
              ))}
            </select>

            {/* Select trạng thái */}
            <select
              className="form-select px-3 py-2 rounded w-100 w-sm-auto"
              aria-label="Chọn trạng thái"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="not-started">Chưa bắt đầu</option>
              <option value="in-progress">Đang học</option>
              <option value="completed">Đã hoàn thành</option>
            </select>

            {/* Search box */}
            <div className="w-100 w-sm-auto">
              <div className="position-relative">
                <FaSearch
                  className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"
                  style={{ fontSize: "14px" }}
                />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="form-control ps-5 rounded"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Icon + Title */}
        <div className="row align-items-center">
          {/* Cột avatar/level icon */}
          <div className="col-auto">
            <div
              className="d-flex align-items-center justify-content-center rounded-3"
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: `${levelColor[selectedLevel?.levelId]}`,
                border: `2px solid ${levelColor[selectedLevel?.levelId]}`
              }}
            >
              <img
                src={`${selectedLevel?.levelImg}`}
                className="h-75"
                alt={selectedLevel?.levelName}
              />
            </div>
          </div>

          {/* Cột nội dung */}
          <div className="col">
            <h1 className="h4 fw-bold text-dark mb-1">
              {selectedLevel?.levelName}
            </h1>
            <p className="text-muted small mb-0">
              {selectedLevel?.levelDesc}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeaderSection;
