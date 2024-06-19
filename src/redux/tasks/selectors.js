import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const selectBoards = state => state.tasks.board;
const selectbackgroundLogos = state => state.tasks.backgroundLogos;
const selectColumns = state => state.tasks.columns;
const selectTasks = state => state.tasks.tasks;
const selectSelectedBoard = state => state.tasks.selectedBoard;
const selectLoading = state => state.tasks.loading;
const selectError = state => state.tasks.error;
const selectFilterPriority = state => state.filter.filterPriority;
const selectActiveBoardId = state => state.tasks.activeBoardId;

export const useTasks = () => {
  const boards = useSelector(selectBoards);
  const columns = useSelector(selectColumns);
  const tasks = useSelector(selectTasks);
  const selectedBoard = useSelector(selectSelectedBoard);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const backgroundLogos = useSelector(selectbackgroundLogos);
  const filterPriority = useSelector(selectFilterPriority);
  const activeBoardId = useSelector(selectActiveBoardId);

  return {
    boards,
    backgroundLogos,
    columns,
    tasks,
    selectedBoard,
    loading,
    error,
    filterPriority,
    activeBoardId,
  };
};

export const selectNextBoard = createSelector(
  [selectActiveBoardId, selectBoards],
  (activeBoardId, boards) => {
    const boardIndex = boards.findIndex(board => board.id === activeBoardId);
    if (boardIndex === -1 || boards.length <= 1) return null;
    const nextIndex =
      boardIndex === boards.length - 1 ? boardIndex - 1 : boardIndex + 1;

    return boards[nextIndex] || null;
  }
);
