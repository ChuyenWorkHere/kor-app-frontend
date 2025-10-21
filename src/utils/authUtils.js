import { jwtDecode } from "jwt-decode";
import AuthExpiredToast from "../components/common/AuthExpiredToast"

export const checkAuth = () => {
    const auth = localStorage.getItem("auth");
    const token = auth ? JSON.parse(auth).token : null;

    if (!token) {
        return false;
    }

    try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem("auth");

            if (document.querySelector('.toast-auth-expired')) return;
            toast.custom((t) => React.createElement(AuthExpiredToast, { toastId: t.id }), { duration: Infinity });
            return false;
        }
        return true;
    } catch (error) {
        localStorage.removeItem("token");
        return false;
    }

}

export const showAuthExpiredToast = () => {
    if (document.querySelector('.toast-auth-expired')) return;
    toast.custom((t) => React.createElement(AuthExpiredToast, { toastId: t.id }), { duration: Infinity });
};