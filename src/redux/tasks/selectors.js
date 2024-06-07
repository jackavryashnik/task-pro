import { useSelector } from 'react-redux';

const selectBoards = state => state.tasks.boards;
const selectColumns = state => state.tasks.columns;
const selectTasks = state => state.tasks.tasks;
const selectSelectedBoard = state => state.tasks.selectedBoard;
const selectLoading = state => state.tasks.loading;
const selectError = state => state.tasks.error;

export const useTasks = () => {
  const boards = useSelector(selectBoards);
  const columns = useSelector(selectColumns);
  const tasks = useSelector(selectTasks);
  const selectedBoard = useSelector(selectSelectedBoard);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  return { boards, columns, tasks, selectedBoard, loading, error };
};
