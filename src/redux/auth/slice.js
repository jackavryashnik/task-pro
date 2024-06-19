import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  login,
  logout,
  updateUser,
  getCurrentUser,
  changeTheme,
  needHelp,
  terminateSessions,
} from './operations.js';

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
    theme: null,
    avatar: null,
    oauth: false,
    sessions: [],
  },
  accessToken: null,
  refreshToken: null,
  isRefreshing: false,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    addTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      if (action.payload.isRefreshing) state.isRefreshing = true;
    },
    deleteTokensAndLogOff: state => {
      state.user = initialState.user;
      state.accessToken = initialState.accessToken;
      state.refreshToken = initialState.refreshToken;
      state.isRefreshing = false;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.rejected, handleRejected)
      .addCase(register.fulfilled, (state, action) => {
        // state.user.email = action.payload.data.user.email;
        // state.user.name = action.payload.data.user.name;
        // state.user.theme = action.payload.data.user.theme;
        // state.user.avatar = action.payload.data.user.avatar;
        // state.token = action.payload.data.accessToken;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
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
        state.user.avatar = action.payload.data.user.avatar;
        state.user.sessions = action.payload.data.user.sessions;
        state.accessToken = action.payload.data.accessToken;
        state.refreshToken = action.payload.data.refreshToken;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logout.fulfilled, state => {
        // state.user = {
        //   name: null,
        //   email: null,
        //   avatar: null,
        // };
        state.user = initialState.user;
        state.accessToken = initialState.accessToken;
        state.refreshToken = initialState.refreshToken;
        state.isLoggedIn = false;
      })
      .addCase(getCurrentUser.pending, handlePending)
      .addCase(getCurrentUser.rejected, handleRejected)
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        // state.user.email = action.payload.data.user.email;
        // state.user.name = action.payload.data.user.name;
        // state.user.theme = action.payload.data.user.theme;
        // state.user.avatar = action.payload.data.user.avatar;
        // state.token = action.payload.data.accessToken;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user.name = action.payload.data.user.name;
        state.user.email = action.payload.data.user.email;
        state.user.avatar = action.payload.data.user.avatar;
        state.user.sessions = action.payload.data.user.sessions;
        state.isLoading = false;
      })
      .addCase(changeTheme.fulfilled, (state, action) => {
        state.user.theme = action.payload.data.user.theme;
      })
      .addCase(needHelp.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(terminateSessions.fulfilled, (state, action) => {
        state.user.sessions = action.payload;
        state.isLoading = false;
      })
  },
});

export const { addTokens, deleteTokensAndLogOff } = authSlice.actions;
export default authSlice.reducer;
