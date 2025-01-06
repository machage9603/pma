import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';
import Cookies from 'js-cookie';

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log('Login attempt with credentials:', credentials);
      const response = await api.post('/api/auth/login', credentials);
      console.log('Login API response:', response.data);

      if (response.data.token) {
        Cookies.set('token', response.data.token, { secure: true, sameSite: 'Strict', expires: 7 });
        console.log('Token stored in cookies:', response.data.token);
      }

      return response.data;
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      console.log('Registration attempt with data:', userData);
      const response = await api.post('/api/auth/register', userData);
      console.log('Registration API response:', response.data);

      if (response.data.token) {
        Cookies.set('token', response.data.token, { secure: true, sameSite: 'Strict', expires: 7 });
        console.log('Token stored in cookies:', response.data.token);
      }

      return response.data;
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: Cookies.get('token') || null, // Get token from cookies on initialization
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      console.log('Logging out, removing token from cookies');
      state.user = null;
      state.token = null;
      Cookies.remove('token'); // Remove token from cookies
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        console.log('Login pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('Login fulfilled, setting token:', action.payload.token);
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log('Login rejected:', action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        console.log('Registration pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log('Registration fulfilled, setting token:', action.payload.token);
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log('Registration rejected:', action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
