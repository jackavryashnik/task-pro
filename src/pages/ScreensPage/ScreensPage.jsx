import { useParams } from 'react-router-dom';
import HeaderDashboard from '../../components/HeaderDashboard/HeaderDashboard';
import MainDashboard from '../../components/MainDashboard/MainDashboard';

const ScreensPage = () => {
  const { boardName } = useParams();

  return (
    <div>
      <HeaderDashboard title={boardName} />
      <MainDashboard />
    </div>
  );
};

export default ScreensPage;
