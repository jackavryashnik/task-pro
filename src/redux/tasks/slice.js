import { createSlice } from '@reduxjs/toolkit';
import {
  addBoard,
  createColumn,
  createTask,
  deleteBoard,
  deleteColumn,
  deleteTask,
  editBoard,
  editColumn,
  editTask,
  fetchBoards,
  fetchOneBoard,
} from './operations';

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const slice = createSlice({
  name: 'tasks',
  initialState: {
    boards: [],
    selectedBoard: null,
    columns: [],
    tasks: [],
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBoards.pending, handlePending)
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.boards = action.payload.board;
        state.columns = action.payload.columns;
        state.tasks = action.payload.tasks;
      })
      .addCase(fetchBoards.rejected, handleRejected)
      .addCase(fetchOneBoard.pending, handlePending)
      .addCase(fetchOneBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.selectedBoard = action.payload.board;
        state.columns = action.payload.columns;
        state.tasks = action.payload.tasks;
      })
      .addCase(fetchOneBoard.rejected, handleRejected)
      .addCase(addBoard.pending, handlePending)
      .addCase(addBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.boards = state.boards.push(action.payload.board);
      })
      .addCase(addBoard.rejected, handleRejected)
      .addCase(editBoard.pending, handlePending)
      .addCase(editBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const itemIndex = state.boards.findIndex(board => {
          board.id === action.payload.id;
        });
        state.boards[itemIndex] = action.payload;
      })
      .addCase(editBoard.rejected, handleRejected)
      .addCase(deleteBoard.pending, handlePending)
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.boards = state.boards.filter(board => {
          board.id !== action.payload.id;
          state.columns = [];
          state.tasks = [];
        });
      })
      .addCase(deleteBoard.rejected, handleRejected)
      .addCase(createColumn.pending, handlePending)
      .addCase(createColumn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.columns = state.columns.push(action.payload);
      })
      .addCase(createColumn.rejected, handleRejected)
      .addCase(editColumn.pending, handlePending)
      .addCase(editColumn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const columnIndex = state.columns.findIndex(column => {
          column.id === action.payload.id;
        });
        state.columns[columnIndex] = action.payload;
      })
      .addCase(editColumn.rejected, handleRejected)
      .addCase(deleteColumn.pending, handlePending)
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.columns = state.columns.filter(column => {
          column.id !== action.payload.id;
        });
        // state.tasks = [];
      })
      .addCase(deleteColumn.rejected, handleRejected)
      .addCase(createTask.pending, handlePending)
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.tasks = state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, handleRejected)
      .addCase(editTask.pending, handlePending)
      .addCase(editTask.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const taskIndex = state.tasks.findIndex(task => {
          task.id === action.payload.id;
        });
        state.tasks[taskIndex] = action.payload;
      })
      .addCase(editTask.rejected, handleRejected)
      .addCase(deleteTask.pending, handlePending)
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.tasks = state.tasks.filter(task => {
          task.id !== action.payload.id;
        });
      })
      .addCase(deleteTask.rejected, handleRejected);
  },
});

export default slice.reducer;
