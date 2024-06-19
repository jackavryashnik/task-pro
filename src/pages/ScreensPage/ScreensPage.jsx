import HeaderDashboard from '../../components/HeaderDashboard/HeaderDashboard';
import MainDashboard from '../../components/MainDashboard/MainDashboard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneBoard } from '../../redux/tasks/operations';
import { selectNextBoard, useTasks } from '../../redux/tasks/selectors';

const ScreensPage = ({ openModal, closeModal }) => {
  const { boards, activeBoardId } = useTasks();
  const dispatch = useDispatch();
  const nextBoard = useSelector(selectNextBoard);

  useEffect(() => {
    if (boards.length > 0) {
      const boardId = activeBoardId || boards[0]?.id;
      if (boardId) {
        dispatch(fetchOneBoard(boardId));
      }
    }
  }, [activeBoardId, dispatch, boards, nextBoard]);

  return (
    <div>
      <HeaderDashboard openModal={openModal} closeModal={closeModal} />
      <MainDashboard openModal={openModal} closeModal={closeModal} />
    </div>
  );
};

export default ScreensPage;
