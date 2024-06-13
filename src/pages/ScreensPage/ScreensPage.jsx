import { useParams } from 'react-router-dom';
import HeaderDashboard from '../../components/HeaderDashboard/HeaderDashboard';
import MainDashboard from '../../components/MainDashboard/MainDashboard';
import AddColumnModal from '../../components/AddColumnModal/AddColumnModal';
// import AddCardModal from '../../components/AddCardModal/AddCardModal';
import EditColumnModal from '../../components/EditColumnModal/EditColumnModal';
// import EditCardModal from '../../components/EditCardModal/EditCardModal';
// import Card from '../../components/Card/Card';
import Column from '../../components/Column/Column';

const ScreensPage = ({ openModal }) => {
  const { boardName } = useParams();

  const onClose = () => {
    openModal('');
  };

  // нужно добавить сюда AddCardModal и EditCardModal через switch
  const handleClick = modalType => {
    let content;
    if (modalType === 'addColumn') {
      content = <AddColumnModal onClose={onClose} />;
    } else if (modalType === 'editColumn') {
      content = <EditColumnModal onClose={onClose} />;
    }
    openModal(content);
  };

  return (
    <div>
      <HeaderDashboard title={boardName} />
      <MainDashboard handleClick={() => handleClick('addColumn')} />
      <Column handleClick={() => handleClick('editColumn')} />
    </div>
  );
};

export default ScreensPage;
