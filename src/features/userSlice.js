// src/features/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../config/axiosConfig";
import toast from "react-hot-toast";

const initialState = {
    info: null,
    loading: false,
    error: null,
};

export const activateSubscription = createAsyncThunk(
    "user/activateSubscription",
    async ({ subscription, setSuccess, toast }) => {
        try {
            const response = await api.post("/users/subscription/activate", subscription);
            setSuccess(true);
            toast.success(response.data.data);
        } catch (error) {
            toast.error("Kích hoạt gói thất bại, vui lòng liên hệ admin để xử lý!");
        }
    }
);


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

export const createPaymentIntent = createAsyncThunk(
    "user/createPaymentIntent",
    async (payment, thunkAPI) => {
        try {
            const response = await api.post("/users/payment/create-payment-intent", payment);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

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
            })
            .addCase(createPaymentIntent.pending, state => {
                state.loading = true;
            })
            .addCase(createPaymentIntent.fulfilled, (state, action) => {
                state.loading = false;
                state.info = { ...state.info, clientSecret: action.payload };
            })
            .addCase(createPaymentIntent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(activateSubscription.fulfilled, (state, action) => {
                state.info = { ...state.info, premium: true };
            })
    }
});

export default userSlice;