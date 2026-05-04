import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import apiReducer from './apiSlice';
import authReducer from './authSlice';

export const store = configureStore({
   reducer: {
      ui: uiReducer,
      api: apiReducer,
      auth: authReducer,
   },
});
