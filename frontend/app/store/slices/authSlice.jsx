import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';
import Cookies from 'js-cookie';

// Helper function for handling auth response
const handleAuthResponse = (response) => {
  if (response.data.token) {
    Cookies.set('token', response.data.token, { secure: true, sameSite: 'Strict', expires: 7 });
    console.log('Token stored in cookies:', response.data.token);
  }
  return response.data;
};

// Google OAuth authentication thunk
export const authenticateWithGoogle = createAsyncThunk(
  'auth/googleAuth',
  async (credential, { rejectWithValue }) => {
    try {
      console.log('Google authentication attempt');
      const response = await api.post('/api/auth/google', { credential });
      console.log('Google auth API response:', response.data);
      return handleAuthResponse(response);
    } catch (error) {
      console.error('Google authentication failed:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || 'Google authentication failed');
    }
  }
);

// Google OAuth registration thunk
export const registerWithGoogle = createAsyncThunk(
  'auth/googleRegister',
  async (credential, { rejectWithValue }) => {
    try {
      console.log('Google registration attempt');
      const response = await api.post('/api/auth/google', { credential });
      console.log('Google registration API response:', response.data);
      return handleAuthResponse(response);
    } catch (error) {
      console.error('Google registration failed:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || 'Google registration failed');
    }
  }
);

// Updated loginUser thunk to handle both regular and Google login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log('Login attempt with credentials:', credentials);
      const response = await api.post('/api/auth/login', credentials);
      console.log('Login API response:', response.data);
      return handleAuthResponse(response);
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Updated registerUser thunk
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      console.log('Registration attempt with data:', userData);
      const response = await api.post('/api/auth/register', userData);
      console.log('Registration API response:', response.data);
      return handleAuthResponse(response);
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
    token: Cookies.get('token') || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      console.log('Logging out, removing token from cookies');
      state.user = null;
      state.token = null;
      Cookies.remove('token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Regular login cases
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
      // Regular registration cases
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
      })
      // Google authentication cases
      .addCase(authenticateWithGoogle.pending, (state) => {
        console.log('Google authentication pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(authenticateWithGoogle.fulfilled, (state, action) => {
        console.log('Google authentication fulfilled, setting token:', action.payload.token);
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(authenticateWithGoogle.rejected, (state, action) => {
        console.log('Google authentication rejected:', action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      // Google registration cases
      .addCase(registerWithGoogle.pending, (state) => {
        console.log('Google registration pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(registerWithGoogle.fulfilled, (state, action) => {
        console.log('Google registration fulfilled, setting token:', action.payload.token);
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerWithGoogle.rejected, (state, action) => {
        console.log('Google registration rejected:', action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;