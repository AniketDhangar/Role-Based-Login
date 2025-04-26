import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  role: null,  // Store the role here
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;  // Set the role on login
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;  // Clear the role on logout
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
