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
      if (data.token) {
        const loginData = await axios.post('/users/login', {
          email: credentials.email,
          password: credentials.password,
        });

        setAuthHeader(loginData.data.token);
        return loginData.data;
      }
      return data;
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
      setAuthHeader(data.data.token);
      localStorage.setItem('token', data.data.token);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    localStorage.removeItem('token');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.patch('/users/update', credentials);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, thunkAPI) => {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      return thunkAPI.rejectWithValue('');
    }
    setAuthHeader(accessToken);
    try {
      setAuthHeader(accessToken);
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changeTheme = createAsyncThunk(
  'auth/userTheme',
  async (userTheme, thunkAPI) => {
    try {
      const { data } = await axios.patch('/users/update', userTheme);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
