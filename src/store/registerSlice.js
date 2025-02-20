import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bcrypt from 'bcryptjs';

const API_URL = 'http://localhost:5000/users';

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            // Check if email already exists
            const emailCheck = await fetch(`${API_URL}?email=${userData.email}`);
            const existingUsers = await emailCheck.json();

            if (existingUsers.length > 0) {
                return rejectWithValue('Email already registered');
            }

            // Hash the password
            const hashedPassword = bcrypt.hashSync(userData.password, 10);

            // Register the new user
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...userData,
                    password: hashedPassword,
                    id: Date.now(),
                }),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            return await response.json();
        } catch (error) {
            console.error(error.message);
            return rejectWithValue(error.message);
        }
    }
);

const registerSlice = createSlice({
    name: "register",
    initialState: {
        user: null,
        loading: false,
        error: null,
        success: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export default registerSlice.reducer;