import axios from "axios";
import AuthExpiredToast from "../components/common/AuthExpiredToast"
import { showAuthExpiredToast } from "../utils/authUtils";

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1",
})

api.interceptors.request.use((config) => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth?.token) {
        config.headers.Authorization = `Bearer ${auth.token}`;
    } else {
        delete config.headers.Authorization;
    }
    return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      showAuthExpiredToast();
      localStorage.removeItem('auth');
    }
    return ;
  }
);

export default api;