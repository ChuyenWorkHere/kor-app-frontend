import { Settings } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

const TermCard = ({ deck, mode, toggleCheck = null, checked = false }) => {
  return (
    <div className="col-lg-3 col-sm-6 ps-0 pe-2">
      <div className="position-relative border rounded p-3 bg-light shadow-sm">
        <Link
          to={`/vocabulary/${deck.id}`}
          className="text-decoration-none text-dark"
        >
          <h3 className="text-truncate mb-2 fs-5 fw-semibold title-truncate">{deck.name}</h3>
          <p className="text-secondary small mb-2 desc-truncate">{deck.description}</p>

          <div className="d-flex flex-column align-items-start gap-1">
            <span className="badge bg-secondary text-white fw-medium ms-0 py-2 px-3">
              {deck.totalFlashcard} Thuật ngữ
            </span>
            <div className="d-flex align-items-center gap-2 mt-2">
              <img
                src={deck.user?.userAvatar || "assets/img/defautlAvatar.png"}
                alt={deck.user?.fullName || "User"}
                className="rounded-circle"
                style={{ width: "2rem", height: "2rem" }}
              />
              <span className="fw-medium text-dark small">
                {deck.user?.fullName || "Anonymous"}
              </span>
            </div>
          </div>
        </Link>

        {
          mode === 'myCourse' ? (
            <Link
              to={`/vocabulary/${deck.id}/edit`}
              className="position-absolute top-0 end-0 mt-2 me-2 btn p-1 rounded-circle border-0"
              title="Chỉnh sửa"
            >
              <Settings size={18} className="text-secondary" />
            </Link>
          ) : (
            mode === 'myFolder' && (
              <div
                className="position-absolute top-0 end-0 mt-2 me-2 btn p-1 rounded-circle border-0"
                title="Chỉnh sửa"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => toggleCheck && toggleCheck(deck, e)}
                  className="form-check-input"
                />
              </div>
            )
          )
        }
      </div>
    </div>
  );
};

export default TermCard