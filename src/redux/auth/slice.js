import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  login,
  logout,
  updateUser,
  getCurrentUser,
  changeTheme,
  needHelp
} from './operations.js'

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const initialState = {
  user: { 
    name: null,
    email: null,
    theme: 'null',
    avatarUrl: null,},
  token: null,
  isRefreshing: false,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  
  extraReducers: builder => {
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.rejected, handleRejected)
      .addCase(register.fulfilled, (state, action) => {
        state.user.email = action.payload.data.user.email;
        state.user.name = action.payload.data.user.name;
        state.user.theme = action.payload.data.user.theme;
        state.user.avatarUrl = action.payload.data.user.avatarUrl;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(login.pending, handlePending)
      .addCase(login.rejected, handleRejected)
      .addCase(login.fulfilled, (state, action) => {
        state.user.email = action.payload.data.user.email;
        state.user.name = action.payload.data.user.name;
        state.user.theme = action.payload.data.user.theme;
        state.user.avatarUrl = action.payload.data.user.avatarUrl;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
        })
      .addCase(logout.fulfilled, state => {
        state.user = { 
          name: null,
          email: null,
          avatarUrl: null
        },
        state.token = null;
        state.isLoggedIn = false;
  })
      .addCase(getCurrentUser.pending, handlePending)
      .addCase(getCurrentUser.rejected, handleRejected)
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user.email = action.payload.data.user.email;
        state.user.name = action.payload.data.user.name;
        state.user.theme = action.payload.data.user.theme;
        state.user.avatarUrl = action.payload.data.user.avatarUrl;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
})  
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user.name = action.payload.data.user.name;
        state.user.avatarUrl = action.payload.data.user.avatarUrl;
        state.isLoading = false;
      })
      .addCase(changeTheme.fulfilled, (state, action) => {
        state.user.theme = action.payload.data.user.theme;
      })
      .addCase(needHelp.fulfilled, state => {
        state.isLoading = false;
      })
  },
});

export default authSlice.reducer;