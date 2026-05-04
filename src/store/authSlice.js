import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      isLoggedIn: false,
      username: '',
      password: '',
      userData: null,
      loading: false,
      error: '',
   },
   reducers: {
      loginStart(state) {
         state.loading = true;
         state.error = '';
      },
      loginSuccess(state, action) {
         state.isLoggedIn = true;
         state.loading = false;
         state.error = '';
         state.username = action.payload.username;
         state.password = action.payload.password;
         state.userData = action.payload.userData || null;
      },
      loginFailure(state, action) {
         state.loading = false;
         state.error = action.payload;
      },
      logout(state) {
         state.isLoggedIn = false;
         state.username = '';
         state.password = '';
         state.userData = null;
         state.loading = false;
         state.error = '';
      },
      clearAuthError(state) {
         state.error = '';
      },
   },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearAuthError } =
   authSlice.actions;

export default authSlice.reducer;
