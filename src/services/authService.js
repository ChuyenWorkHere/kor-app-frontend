import api from "../config/axiosConfig"

const login = async (formData) => {
    const response = await api.post("/auth/login", formData);
    return response.data;
}

export default { login };