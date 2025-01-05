// app/lib/store.js
'use client';

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/app/store/slices/authSlice';
import projectReducer from '@/app/store/slices/projectSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
  },
});
