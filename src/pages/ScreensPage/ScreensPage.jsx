import { useParams } from 'react-router-dom';
import HeaderDashboard from '../../components/HeaderDashboard/HeaderDashboard';
import MainDashboard from '../../components/MainDashboard/MainDashboard';
import AddColumnModal from '../../components/AddColumnModal/AddColumnModal';

const ScreensPage = ({ toggleModal }) => {
  const { boardName } = useParams();

  const onClose = () => {
    toggleModal('');
  };
  const handleClick = () => {
    toggleModal(<AddColumnModal onClose={onClose} />);
  };

  return (
    <div>
      <HeaderDashboard title={boardName} />
      <MainDashboard handleClick={handleClick} />
    </div>
  );
};

export default ScreensPage;
