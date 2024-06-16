import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://task-pro-app-0x3n.onrender.com/api';

const setAuthHeader = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common['Authorization'] = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/register', credentials);
      // if (data.accessToken && data.refreshToken) {
      //   // localStorage.setItem('token', data.data.refreshToken);

      //   const loginData = await axios.post('/users/login', {
      //     email: credentials.email,
      //     password: credentials.password,
      //   });

      setAuthHeader(data.data.accessToken);

      return data.data;
      // }
      // return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/login', credentials);

      console.log(data);

      setAuthHeader(data.data.accessToken);
      // localStorage.setItem('token', data.data.accessToken);
      // localStorage.setItem('refreshToken', data.data.refreshToken);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    // localStorage.removeItem('token');
    // localStorage.removeItem('refreshToken');
    // localStorage.removeItem('selectedBoard');
    // localStorage.removeItem('activeBoardId');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async ({ credentials, isFormData }, thunkAPI) => {
    try {
      // const accessToken = localStorage.getItem('token');

      // if (!accessToken) {
      //   return thunkAPI.rejectWithValue('');
      // }

      const config = isFormData
        ? { headers: { 'Content-Type': 'multipart/form-data' } }
        : { headers: { 'Content-Type': 'application/json' } };

      // setAuthHeader(accessToken);

      const { data } = await axios.patch('/users/update', credentials, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      setAuthHeader(reduxState.auth.token);

      const { data } = await axios.get('/users/current');

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changeTheme = createAsyncThunk(
  'auth/userTheme',
  async (theme, thunkAPI) => {
    try {
      const { data } = await axios.patch('/users/update', { theme });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const needHelp = createAsyncThunk(
  'auth/needHelp',
  async ({ email, comment, token }, thunkAPI) => {
    try {
      await axios.post(
        '/users/need-help',
        { email, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return { email, comment };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
