import api from "../config/axiosConfig"

const authService = {
    login: async (formData) => {
        const response = await api.post("/auth/login", formData);
        return response.data;
    },
    register: async (formData) => {
        const response = await api.post("/auth/signup", formData);
        console.log("data response: ", response.data);
        return response.data;
    },
};


export default authService
