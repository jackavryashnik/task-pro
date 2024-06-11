import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://task-pro-app-0x3n.onrender.com/api';

export const fetchBoards = createAsyncThunk(
  'boards/fetchBoards',
  async (_, thunkAPI) => {
    try {
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
      const { data } = await axios.get(`/boards/${id}`);
      console.log(data.data);
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
      const { data } = await axios.post('/boards', { ...newBoard });
      console.log(data.data.board);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editBoard = createAsyncThunk(
  'boards/editBoard',
  async ({ id, name, icon, background, filter }, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/boards/${id}`, {
        name,
        icon,
        background,
        filter,
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
      const { data } = await axios.delete(`/boards/${id}`);
      console.log(data.data);
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
      const { data } = await axios.post('/tasks', { ...newTask });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editTask = createAsyncThunk(
  'tasks/editTask',
  async (updateTask, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/tasks/${updateTask.id}`, updateTask);
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
      const { data } = await axios.delete(`/tasks/${id}`);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
