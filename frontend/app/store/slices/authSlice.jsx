import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    console.log('Login attempt with credentials:', credentials);
    const response = await api.post('/api/auth/login', credentials);
    console.log('Login API response:', response.data);

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      console.log('Token stored in localStorage:', response.data.token);
    }
    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData) => {
    console.log('Registration attempt with data:', userData);
    const response = await api.post('/api/auth/register', userData);
    console.log('Registration API response:', response.data);

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      console.log('Token stored in localStorage:', response.data.token);
    }
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      console.log('Logging out, removing token');
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
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
        console.log('Login rejected:', action.error.message);
        state.loading = false;
        state.error = action.error.message;
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
        console.log('Registration rejected:', action.error.message);
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;