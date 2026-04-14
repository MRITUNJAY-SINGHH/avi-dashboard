import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import apiReducer from './apiSlice';

export const store = configureStore({
   reducer: {
      ui: uiReducer,
      api: apiReducer,
   },
});
