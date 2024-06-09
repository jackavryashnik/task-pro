import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://task-pro-app-0x3n.onrender.com/api';

export const fetchBoards = createAsyncThunk(
  'boards/fetchBoards',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/boards');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchOneBoard = createAsyncThunk(
  'boards/fetchOneBoard',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/boards/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addBoard = createAsyncThunk(
  'boards/addBoard',
  async (newBoard, thunkAPI) => {
    try {
      const response = await axios.post('/boards', { ...newBoard });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editBoard = createAsyncThunk(
  'boards/editBoard',
  async ({ id, name, icon, background, filter }, thunkAPI) => {
    try {
      const response = await axios.patch(`/boards/${id}`, {
        name,
        icon,
        background,
        filter,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/boards/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createColumn = createAsyncThunk(
  'columns/createColumn',
  async (newColumn, thunkAPI) => {
    try {
      const response = await axios.post('/columns', { ...newColumn });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editColumn = createAsyncThunk(
  'columns/editColumn',
  async ({ id, name }, thunkAPI) => {
    try {
      const response = await axios.patch(`/columns/${id}`, { name });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'columns/deleteColumn',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/columns/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (newTask, thunkAPI) => {
    try {
      const response = await axios.post('/tasks', { ...newTask });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editTask = createAsyncThunk(
  'tasks/editTask',
  async (updateTask, thunkAPI) => {
    try {
      const response = await axios.patch(`/tasks/${updateTask.id}`, updateTask);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
