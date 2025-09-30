import toast from "react-hot-toast";
import api from "../config/axiosConfig"

export const syncProgressBackEnd = async (progress) => {
    try {
        console.log(progress);
        const response = await api.post("/users/me/progress", progress);
        return response.data.data;
    } catch (error) {
        return Promise.reject(error.response?.data || error.message || error);
    }
}