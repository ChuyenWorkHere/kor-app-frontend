import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../services/authService";

const userFromLocalStorage = localStorage.getItem("auth") ?
    JSON.parse(localStorage.getItem("auth")) : { username: null, token: null, roles: [] };

const initialState = {
    username: userFromLocalStorage.username,
    token: userFromLocalStorage.token,
    roles: userFromLocalStorage.roles,
    isAuthenticated: !!userFromLocalStorage.username,
    loading: false,
    error: null,
};

export const login = createAsyncThunk (
    "auth/login",
    async ({formData, toast, navigate,resetForm}, thunkAPI) => {
        try {
            const res = await authService.login(formData);

            const { username, token, roles } = res.data;
            console.log("User logged in:", { username, token, roles });

            localStorage.setItem("auth", JSON.stringify({ username, token, roles }));
            
            toast.success("Login successful!");
            navigate("/");

            return { username, token, roles };
        } catch (error) {
            toast.error(error?.response?.data?.message || "Login failed");
            resetForm();
            return thunkAPI.rejectWithValue("Login failed");
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state, action) => {
            localStorage.removeItem("auth");
            state.username = null;
            state.token = null;
            state.roles = [];
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.username = action.payload.username;
                state.token = action.payload.token;
                state.roles = action.payload.roles;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice;
