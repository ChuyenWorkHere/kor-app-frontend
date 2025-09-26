import React, { use, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';
import { login } from '../../features/authSlice';

const Login = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const resetForm = () => {
    setFormData({
      username: '',
      password: ''
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login({ formData, toast, navigate, resetForm }));
  }

  return (
    <div className="h-100 rounded bg-gradient shadow d-flex align-items-center justify-content-center">
      <div className='shadow p-5'>
        <h2 className="mb-4 fw-bold text-black fs-4">Welcome Back</h2>
        <div className="mb-4 d-flex flex-wrap align-items-center justify-content-center gap-3">
          <button className="d-flex align-items-center gap-2 rounded border border-secondary px-4 py-2 bg-white hover-shadow">
            <img src="/assets/img/google.png" alt="Google Icon" style={{ width: "20px" }} />
            <span className="fw-semibold text-black">Login with Google</span>
          </button>

          <button className="d-flex align-items-center gap-2 rounded border border-secondary px-4 py-2 bg-white hover-shadow">
            <img src="/assets/img/facebook.png" alt="Facebook Icon" style={{ width: "20px" }} />
            <span className="fw-semibold text-black">Login with Facebook</span>
          </button>
        </div>
        <div className="mb-4 d-flex align-items-center justify-content-center gap-3">
          <div className="flex-grow-1" style={{ height: "2px", background: "#e2e8f0" }}></div>
          <span className="fw-medium text-secondary">or</span>
          <div className="flex-grow-1" style={{ height: "2px", background: "#e2e8f0" }}></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              name="username"
              onChange={handleInputChange}
              placeholder="Enter your username"
              className="form-control bg-light"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleInputChange}
              placeholder="password"
              className="form-control bg-light"
              required
            />
          </div>

          { error && 
            <span className="text-danger small">
              Tài khoản hoặc mật khẩu không chính xác!
            </span>
          }
          
          <div className="mb-2">
            <a href="/password/forgot" className="small fw-semibold text-primary">
              Forgot Password
            </a>
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-semibold">
            Login to your account
          </button>
        </form>

        <div className="mt-4 mb-2">
          <span className="text-secondary small">Don’t have an account yet?</span>
          <Link to="/register" className="ms-2 small fw-semibold text-primary">
            Sign up here
          </Link>
        </div>

        <Link to="/" className="text-primary fw-semibold">
          Trang chủ
        </Link>
      </div>

    </div>
  );
}

export default Login