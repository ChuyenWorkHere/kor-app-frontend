import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../config/axiosConfig"

export const fetchCourses = createAsyncThunk(
    'courses/fetchCourses',
    async () => {
        try {
            const response = await api.get('/public/courses');
            return response.data;
        } catch (error) {
            if(error.response && error.response.status === 404) {
                return rejectWithValue({code : 404, message: "No courses found" });
            } else if (error.response && error.response.status === 401) {
                return rejectWithValue({code : 401, message: "Unauthorized access" });
            }
            return rejectWithValue(error.response.data);
        }
        
    }
)

const courseSlice = createSlice({
    name: 'courses',
    initialState: {
        courses: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourses.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.courses = action.payload.data;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})

export const { } = courseSlice.actions;
export default courseSlice;