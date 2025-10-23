import { TriangleAlert } from 'lucide-react';
import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AuthExpiredToast = ({ toastId }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    toast.dismiss(toastId);
    localStorage.removeItem("auth");
    navigate('/login');
  };

  return (
    <div
      className={`toast toast-auth-expired align-items-center text-bg-light border-0 shadow-lg p-3 rounded-3 show opacity-100 transition-all`}
      style={{ width: '340px' }}
      role="alert"
    >
      <div className="d-flex flex-column">
        <div className="mb-2 d-flex align-items-center">
          <TriangleAlert className='me-2 text-warning' size={20} />
          <strong className="text-danger">Phiên đăng nhập đã hết hạn!</strong>
        </div>
        <div className="text-secondary small mb-2">
          Vui lòng đăng nhập lại để tiếp tục học tập.
        </div>
        <button
          className="btn btn-primary btn-sm mt-1"
          onClick={handleLogin}
        >
          Đăng nhập lại
        </button>
      </div>
    </div>
  );
};

export default AuthExpiredToast;
