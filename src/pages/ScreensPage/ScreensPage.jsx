import HeaderDashboard from '../../components/HeaderDashboard/HeaderDashboard';
import MainDashboard from '../../components/MainDashboard/MainDashboard';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchOneBoard } from '../../redux/tasks/operations';
import { useTasks } from '../../redux/tasks/selectors';
import css from './ScreensPage.module.css';

const ScreensPage = ({ openModal, closeModal }) => {
  const { boards, selectedBoard } = useTasks();
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
    <div className={css.ScreensPage}>
      {selectedBoard && selectedBoard.background !== '' && (
        <picture className={css.img}>
          <source
            srcSet={`
            ${selectedBoard.background.desktop2x} 2x, 
            ${selectedBoard.background.desktop} 1x
          `}
            media="(min-width: 1440px)"
          />
          <source
            srcSet={`
              ${selectedBoard.background.tablet2x} 2x, 
              ${selectedBoard.background.tablet} 1x
            `}
            media="(min-width: 768px)"
          />
          <source
            srcSet={`
              ${selectedBoard.background.mobile2x} 2x, 
              ${selectedBoard.background.mobile} 1x
            `}
            media="(max-width: 767px)"
          />
          <img
            src={selectedBoard.background.mobile}
            alt={selectedBoard.background.name}
          />
        </picture>
      )}
      <HeaderDashboard openModal={openModal} closeModal={closeModal} />
      <MainDashboard openModal={openModal} closeModal={closeModal} />
    </div>
  );
};

export default ScreensPage;
