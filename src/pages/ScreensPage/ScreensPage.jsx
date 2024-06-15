import { useParams } from 'react-router-dom';
import HeaderDashboard from '../../components/HeaderDashboard/HeaderDashboard';
import MainDashboard from '../../components/MainDashboard/MainDashboard';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchOneBoard } from '../../redux/tasks/operations';
// import AddColumnModal from '../../components/AddColumnModal/AddColumnModal';
// import AddCardModal from '../../components/AddCardModal/AddCardModal';
// import EditColumnModal from '../../components/EditColumnModal/EditColumnModal';
// import EditCardModal from '../../components/EditCardModal/EditCardModal';
// import Card from '../../components/Card/Card';

const ScreensPage = ({ openModal, closeModal }) => {
  const { boardName } = useParams();
  const dispatch = useDispatch();
  const selectedBoardId = localStorage.getItem('activeBoardId');

  useEffect(() => {
    dispatch(fetchOneBoard(selectedBoardId));
  }, [selectedBoardId, dispatch]);

  return (
    <div>
      <HeaderDashboard title={boardName} />
      <MainDashboard openModal={openModal} closeModal={closeModal} />
    </div>
  );
};

export default ScreensPage;
