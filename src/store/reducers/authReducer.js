

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";
import { jwtDecode } from "jwt-decode";

// Async thunk for customer registration
export const customer_register = createAsyncThunk(
    'auth/customer_register',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/customer/customer-register', info);
            localStorage.setItem('token', data.token);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for customer login
export const customer_login = createAsyncThunk(
    'auth/customer_login',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/login', info);
            localStorage.setItem('token', data.token);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Helper function to decode JWT token
const decodeToken = (token) => {
    if (token) {
        return jwtDecode(token);
    } else {
        return '';
    }
};

// Create the auth slice
export const authReducer = createSlice({
    name: 'auth',
    initialState: {
        loader: false,
        userInfo: decodeToken(localStorage.getItem('token')),
        errorMessage: '',
        successMessage: '',
    },
    reducers: {
        // Clear success and error messages
        messageClear: (state) => {
            state.errorMessage = '';
            state.successMessage = '';
        },
        // Reset user info and clear messages
        user_reset: (state) => {
            state.userInfo = '';
            state.errorMessage = '';
            state.successMessage = '';
            localStorage.removeItem('token'); // Remove token from localStorage
        },
    },
    extraReducers: (builder) => {
        builder
            // Customer Registration
            .addCase(customer_register.pending, (state) => {
                state.loader = true;
            })
            .addCase(customer_register.rejected, (state, { payload }) => {
                state.errorMessage = payload?.error || 'Registration failed';
                state.loader = false;
            })
            .addCase(customer_register.fulfilled, (state, { payload }) => {
                const userInfo = decodeToken(payload.token);
                state.successMessage = payload?.message || 'Registration successful';
                state.loader = false;
                state.userInfo = userInfo;
            })

            // Customer Login
            .addCase(customer_login.pending, (state) => {
                state.loader = true;
            })
            .addCase(customer_login.rejected, (state, { payload }) => {
                state.errorMessage = payload?.error || 'Login failed';
                state.loader = false;
            })
            .addCase(customer_login.fulfilled, (state, { payload }) => {
                const userInfo = decodeToken(payload.token);
                state.successMessage = payload?.message || 'Login successful';
                state.loader = false;
                state.userInfo = userInfo;
            });
    },
});

// Export actions
export const { messageClear, user_reset } = authReducer.actions;

// Export reducer
export default authReducer.reducer;