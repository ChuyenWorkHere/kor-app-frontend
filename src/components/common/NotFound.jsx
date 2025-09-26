import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
    <h1 className="display-4 text-danger mb-3">404</h1>
    <h2 className="mb-3">Không tìm thấy trang</h2>
    <p className="mb-4 text-muted">Trang bạn truy cập không tồn tại hoặc đã bị xóa.</p>
    <Link to="/" className="btn btn-primary">
      Quay về trang chủ
    </Link>
  </div>
);

export default NotFound;