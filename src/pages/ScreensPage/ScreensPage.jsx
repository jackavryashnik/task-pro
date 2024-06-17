import HeaderDashboard from '../../components/HeaderDashboard/HeaderDashboard';
import MainDashboard from '../../components/MainDashboard/MainDashboard';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchOneBoard } from '../../redux/tasks/operations';
import { useTasks } from '../../redux/tasks/selectors';

const ScreensPage = ({ openModal, closeModal }) => {
  const { boards } = useTasks();
  const dispatch = useDispatch();

  useEffect(() => {
    if (boards.length > 0) {
      const activeBoardId = localStorage.getItem('activeBoardId');
      console.log(activeBoardId);
      if (activeBoardId && activeBoardId !== 'undefined') {
        dispatch(fetchOneBoard(activeBoardId));
      } else {
        dispatch(fetchOneBoard(boards[0].id));
      }
    }
  }, [dispatch, boards]);

  return (
    <div>
      <HeaderDashboard openModal={openModal} closeModal={closeModal} />
      <MainDashboard openModal={openModal} closeModal={closeModal} />
    </div>
  );
};

export default ScreensPage;
