import axios from 'axios';

import { addTokens, deleteTokensAndLogOff } from '../redux/auth/slice';

// axios.defaults.baseURL = 'https://task-pro-app-0x3n.onrender.com/api';
axios.defaults.baseURL = 'http://localhost:8000/api';

export const setAuthHeader = token => {
  let authHeader;
  if (!token) authHeader = '';
  else if (typeof token === 'string') authHeader = `Bearer ${token}`;
  else authHeader = `Bearer ${token.value}`;

  axios.defaults.headers.common['Authorization'] = authHeader;
};

export const clearAuthHeader = () => {
  axios.defaults.headers.common['Authorization'] = '';
};

export const checkExpiredToken = (authState, isRefresh = false) => {
  const token = isRefresh ? authState.refreshToken : authState.accessToken;

  if (!token) return false;
  else if (typeof token === 'string') return true;

  const currentDate = new Date();
  const tokenExpіredDate = new Date(token.expiresAt);

  // залишаємо додатково ще 5 сек на з'єднання
  if (currentDate - tokenExpіredDate >= -5000) return false;
  return true;
};

export const checkRefreshAuthTokens = async thunkAPI => {
  try {
    const authState = thunkAPI.getState().auth;

    const isValidToken = checkExpiredToken(authState);
    if (!isValidToken) {
      const isValidRefreshToken = checkExpiredToken(authState, true);
      if (!isValidRefreshToken) {
        thunkAPI.dispatch(deleteTokensAndLogOff());
        throw new Error('Refresh token expired!');
      }
      setAuthHeader(authState.refreshToken);
      const { data } = await axios.get('/auth/refresh-tokens');
      thunkAPI.dispatch(addTokens(data.data));
      setAuthHeader(data.data.accessToken);
    } else {
      setAuthHeader(authState.accessToken);
    }
    return { status: true, error: null };
  } catch (error) {
    return { status: false, error: 'Refresh token expired!' };
  }
};

export default axios;
