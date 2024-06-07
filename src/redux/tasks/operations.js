import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://task-pro-app-0x3n.onrender.com/api/tasks';

//Boards
// taskRouter.get('/boards', taskCtrls.getAllBoards);
// taskRouter.get('/boards/:id', taskCtrls.getOneBoard);
// taskRouter.post('/boards', taskCtrls.createBoard);
// taskRouter.patch('/boards/:id', taskCtrls.editBoard);
// taskRouter.delete('/boards/:id', taskCtrls.deleteBoard);

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

//Columns
// taskRouter.post('/columns', taskCtrls.createColumn);
// taskRouter.patch('/columns/:id', taskCtrls.editColumn);
// taskRouter.delete('/columns/:id', taskCtrls.deleteColumn);

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

//Tasks
// taskRouter.post('/tasks', taskCtrls.createTask);
// taskRouter.patch('/tasks/:id', taskCtrls.editTask);
// taskRouter.delete('/tasks/:id', taskCtrls.deleteTask);

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
