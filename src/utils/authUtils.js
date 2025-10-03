import { jwtDecode } from "jwt-decode";

export const checkAuth = () => {
    const auth = localStorage.getItem("auth");
    const token = auth ? JSON.parse(auth).token : null;
    
    if(!token) {
        return false;
    }

    try {
        const decoded = jwtDecode(token);
        if(decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem("auth");
            return false;
        }
        return true;
    } catch (error) {
        localStorage.removeItem("token");
        return false;
    }

}