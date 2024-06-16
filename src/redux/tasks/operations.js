import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../utils/backendAPI';
import { checkRefreshAuthTokens } from '../../utils/backendAPI';

// axios.defaults.baseURL = 'https://task-pro-app-0x3n.onrender.com/api';

export const fetchBoards = createAsyncThunk(
  'boards/fetchBoards',
  async (_, thunkAPI) => {
    try {
      // check and refresh tokens
      const isValidTokens = await checkRefreshAuthTokens(thunkAPI);
      if (!isValidTokens.status) throw isValidTokens.error;

      const { data } = await axios.get('/boards');
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchOneBoard = createAsyncThunk(
  'boards/fetchOneBoard',
  async (id, thunkAPI) => {
    try {
      // check and refresh tokens
      const isValidTokens = await checkRefreshAuthTokens(thunkAPI);
      if (!isValidTokens.status) throw isValidTokens.error;

      const { data } = await axios.get(`/boards/${id}`);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addBoard = createAsyncThunk(
  'boards/addBoard',
  async (newBoard, thunkAPI) => {
    try {
      // check and refresh tokens
      const isValidTokens = await checkRefreshAuthTokens(thunkAPI);
      if (!isValidTokens.status) throw isValidTokens.error;

      const { data } = await axios.post('/boards', { ...newBoard });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editBoard = createAsyncThunk(
  'boards/editBoard',
  async ({ id, name, icon, background }, thunkAPI) => {
    try {
      // check and refresh tokens
      const isValidTokens = await checkRefreshAuthTokens(thunkAPI);
      if (!isValidTokens.status) throw isValidTokens.error;

      const { data } = await axios.patch(`/boards/${id}`, {
        name,
        icon,
        background,
      });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async (id, thunkAPI) => {
    try {
      // check and refresh tokens
      const isValidTokens = await checkRefreshAuthTokens(thunkAPI);
      if (!isValidTokens.status) throw isValidTokens.error;

      const { data } = await axios.delete(`/boards/${id}`);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createColumn = createAsyncThunk(
  'columns/createColumn',
  async (newColumn, thunkAPI) => {
    try {
      // check and refresh tokens
      const isValidTokens = await checkRefreshAuthTokens(thunkAPI);
      if (!isValidTokens.status) throw isValidTokens.error;

      const { data } = await axios.post('/columns', { ...newColumn });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editColumn = createAsyncThunk(
  'columns/editColumn',
  async ({ id, name }, thunkAPI) => {
    try {
      // check and refresh tokens
      const isValidTokens = await checkRefreshAuthTokens(thunkAPI);
      if (!isValidTokens.status) throw isValidTokens.error;

      const { data } = await axios.patch(`/columns/${id}`, { name });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'columns/deleteColumn',
  async (id, thunkAPI) => {
    try {
      // check and refresh tokens
      const isValidTokens = await checkRefreshAuthTokens(thunkAPI);
      if (!isValidTokens.status) throw isValidTokens.error;

      const { data } = await axios.delete(`/columns/${id}`);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (newTask, thunkAPI) => {
    try {
      // check and refresh tokens
      const isValidTokens = await checkRefreshAuthTokens(thunkAPI);
      if (!isValidTokens.status) throw isValidTokens.error;

      const { data } = await axios.post('/tasks', { ...newTask });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editTask = createAsyncThunk(
  'tasks/editTask',
  async ({ id, name, description, priority, deadline }, thunkAPI) => {
    try {
      // check and refresh tokens
      const isValidTokens = await checkRefreshAuthTokens(thunkAPI);
      if (!isValidTokens.status) throw isValidTokens.error;

      const { data } = await axios.patch(`/tasks/${id}`, {
        id,
        name,
        description,
        priority,
        deadline,
      });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const moveTask = createAsyncThunk(
  'tasks/moveTask',
  async ({ taskId, fromColumnId, toColumnId }, thunkAPI) => {
    try {
      // check and refresh tokens
      const isValidTokens = await checkRefreshAuthTokens(thunkAPI);
      if (!isValidTokens.status) throw isValidTokens.error;

      const { data } = await axios.patch(`/tasks/${taskId}/move`, {
        fromColumnId,
        toColumnId,
      });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id, thunkAPI) => {
    try {
      // check and refresh tokens
      const isValidTokens = await checkRefreshAuthTokens(thunkAPI);
      if (!isValidTokens.status) throw isValidTokens.error;

      const { data } = await axios.delete(`/tasks/${id}`);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
