import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bcrypt from 'bcryptjs';

const API_URL = 'http://localhost:5000/users';

// Async function to handle user login
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Fetch users from the API
      const response = await fetch(API_URL);
      const users = await response.json();

      // Find user by email
      const user = users.find((u) => u.email === email);

      if (!user) {
        return rejectWithValue('Invalid email or password');
      }

      // Compare hashed password
      const passwordMatch = bcrypt.compareSync(password, user.password);

      if (!passwordMatch) {
        return rejectWithValue('Invalid email or password');
      }

      return user; // Return user data upon successful login
    } catch (error) {
      return rejectWithValue('Error fetching users');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;