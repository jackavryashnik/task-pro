import { useSelector } from 'react-redux';

const selectBoards = state => state.tasks.board;
const selectbackgroundLogos = state => state.tasks.backgroundLogos;
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
  const backgroundLogos = useSelector(selectbackgroundLogos);
  return {
    boards,
    backgroundLogos,
    columns,
    tasks,
    selectedBoard,
    loading,
    error,
  };
};
