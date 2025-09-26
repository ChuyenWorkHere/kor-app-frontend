// src/features/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../config/axiosConfig";

const initialState = {
    info: null,
    loading: false,
    error: null,
};

export const fetchUserInfo = createAsyncThunk(
    "user/fetchUserInfo",
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/auth/me");
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    extraReducers: builder => {
        builder
            .addCase(fetchUserInfo.pending, state => {
                state.loading = true;
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.info = action.payload;
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default userSlice;