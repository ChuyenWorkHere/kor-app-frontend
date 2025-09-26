import React from 'react'

const Register = () => {
  return (
    <div className="h-100 rounded shadow d-flex align-items-center justify-content-center">
      <div className='shadow p-5'>
        <form
          className="rounded"
          style={{ width: "31rem", maxWidth: "100%" }}
        >
          <h2 className="mb-3 fw-bold text-dark">Create an Account</h2>

          <div className="mb-2">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              placeholder="Username"
              className="form-control bg-light"
              maxLength={100}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter your Email"
              className="form-control bg-light"
              maxLength={100}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="form-control bg-light"
              maxLength={100}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label fw-semibold">Confirm password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="form-control bg-light"
              maxLength={100}
              required
            />
          </div>

          <div className="d-flex align-items-center gap-1 mb-2 flex-wrap">
            <input type="checkbox" className="form-check-input me-2" />
            <p className="mb-0 text-muted">I accept the</p>
            <a href="/policy" className="text-primary fw-semibold small">
              Terms and Conditions
            </a>
          </div>

          <button
            type="submit"
            disabled
            className="btn w-100 fw-semibold text-white"
            style={{
              backgroundColor: "#e0e0e0",
              color: "#a6a6a6",
              cursor: "default",
            }}
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