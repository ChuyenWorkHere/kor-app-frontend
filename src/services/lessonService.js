import api from "../config/axiosConfig";


export const fetchLessonBySlug = async (lessonSlug) => {
    const response = await api.get(`/users/lessons/${lessonSlug}`);
    return response.data.data;
}