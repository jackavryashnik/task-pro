import { useParams } from 'react-router-dom';
import HeaderDashboard from '../../components/HeaderDashboard/HeaderDashboard';
import MainDashboard from '../../components/MainDashboard/MainDashboard';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchOneBoard } from '../../redux/tasks/operations';
import { useTasks } from '../../redux/tasks/selectors';

const ScreensPage = ({ openModal, closeModal }) => {
  const { boardName } = useParams();

  const { boards } = useTasks();
  const dispatch = useDispatch();

  useEffect(() => {
    if (boards.length > 0) {
      const activeBoardId = localStorage.getItem('activeBoardId');
      if (activeBoardId && activeBoardId !== 'undefined') {
        dispatch(fetchOneBoard(activeBoardId));
      } else {
        dispatch(fetchOneBoard(boards[0].id));
      }
    }
  }, [dispatch, boards]);

  return (
    <div>
      <HeaderDashboard title={boardName} />
      <MainDashboard openModal={openModal} closeModal={closeModal} />
    </div>
  );
};

export default ScreensPage;
