import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import TagList from "./TagList";

const HeaderSection = () => {
  return (
    <div
      className="position-relative overflow-hidden border-bottom"
    >
      <div className="py-3 px-0 position-relative" style={{ zIndex: 10 }}>
        {/* Back link + Filter + Search */}
        <Row className="align-items-center mb-3">
          <Col className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3">
              
              <Form.Select
                className="px-3 py-2 rounded w-100 w-sm-auto"
                aria-label="Chọn trình độ"
              >
                <option value="all">Tất cả trình độ</option>
                <option value="beginner">Sơ cấp</option>
                <option value="intermediate">Trung cấp</option>
                <option value="advanced">Cao cấp</option>
              </Form.Select>

              
              <Form.Select
                className="px-3 py-2 rounded w-100 w-sm-auto"
                aria-label="Chọn trạng thái"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="not-started">Chưa bắt đầu</option>
                <option value="in-progress">Đang học</option>
                <option value="completed">Đã hoàn thành</option>
              </Form.Select>

              {/* Search box */}
              <div className="w-100 w-sm-auto">
                <div className="position-relative">
                  <FaSearch
                    className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"
                    style={{ fontSize: "14px" }}
                  />
                  <Form.Control
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="ps-5 rounded"
                  />
                </div>
              </div>
          </Col>
        </Row>

        {/* Icon + Title */}
        <Row className="align-items-center">
          <Col xs="auto">
            <div
              className="d-flex align-items-center justify-content-center rounded-3"
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "rgb(95, 46, 234)",
                border: "2px solid rgb(95, 46, 234)"
              }}
            >
              <img src="/assets/img/beginner-level-img.png" className="h-75" alt="Sơ Cấp" />
            </div>
          </Col>
          <Col>
            <h1 className="h4 fw-bold text-dark mb-1">Sơ cấp</h1>
            <p className="text-muted small mb-0">
              Khám phá các chủ đề phù hợp với trình độ của bạn
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HeaderSection;
