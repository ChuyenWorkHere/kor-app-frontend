import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService'
import toast from 'react-hot-toast';


const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername]= useState("");
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] =useState("");

  const handleSubmit = async () => {
    if(password !== repeatPassword) {
      setErrorMessage("Nhập lại mật khẩu không đúng");
      return;
    }
    try {
      setLoading(true);
      const formData = {username, email, password};
      const response = await authService.register(formData);

      if (response.status === "success") {
        toast.success("Đăng ký tài khoản thành công! Vui lòng đăng nhập lại");
        navigate("/login");
      }
    } catch (error) {
      
      console.log(error);
      setErrorMessage(error?.response?.data?.message || "Đăng ký tài khoản thất bại");
    }
  }

  return (
    <div className="h-100 rounded bg-gradient shadow d-flex align-items-center justify-content-center">
      <div className='shadow p-5'>
        <h2 className="mb-4 fw-bold text-black fs-4">Welcome</h2>
        <div className="mb-4 d-flex align-items-center justify-content-center gap-3">
          <button className="d-flex align-items-center gap-2 rounded border border-secondary px-4 py-2 bg-white hover-shadow">
            <img src="/assets/img/google.png" alt="Google Icon" style={{ width: "20px" }} />
            <span className="fw-semibold text-black">Sign up with Google</span>
          </button>

          <button className="d-flex align-items-center gap-2 rounded border border-secondary px-4 py-2 bg-white hover-shadow">
            <img src="/assets/img/facebook.png" alt="Facebook Icon" style={{ width: "20px" }} />
            <span className="fw-semibold text-black">Sign up with Facebook</span>
          </button>
        </div>
        <div className="mb-4 d-flex align-items-center justify-content-center gap-3">
          <div className="flex-grow-1" style={{ height: "2px", background: "#e2e8f0" }}></div>
          <span className="fw-medium text-secondary">or</span>
          <div className="flex-grow-1" style={{ height: "2px", background: "#e2e8f0" }}></div>
        </div>
        <form
          className="rounded"
        >
          <div className="mb-2">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              value={username}
              placeholder="Username"
              className="form-control bg-light"
              maxLength={100}
              required
              style={{minWidth: "300px"}}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              value={email}
              placeholder="Enter your Email"
              className="form-control bg-light"
              maxLength={100}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              className="form-control bg-light"
              maxLength={100}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label className="form-label fw-semibold">Confirm password</label>
            <input
              type="password"
              value={repeatPassword}
              placeholder="Repeat your password"
              className="form-control bg-light"
              maxLength={100}
              required
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>

          { errorMessage && <div className='text-danger'> {errorMessage} </div> }

          <button
            type="button"
            className="btn btn-primary w-100 fw-semibold my-2"
            onClick={handleSubmit}
          >
            Register
          </button>

          <div className="mt-2">
            <span className="text-muted">Already have an account? </span>
            <a href="/login" className="text-primary fw-semibold small">
              Login here
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register