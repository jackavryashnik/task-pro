import css from './HeaderDashboard.module.css';
import FilterModal from '../FilterModal/FilterModal';
import icons from '../../images/icons.svg';
import { useTasks } from '../../redux/tasks/selectors';

const HeaderDashboard = ({ openModal, closeModal }) => {
  const { selectedBoard } = useTasks();

  return (
    <>
      {selectedBoard && (
        <div className={css.header}>
          <div className={css.wrapper}>
            <h1 className={css.boardName}>{selectedBoard.name}</h1>
          </div>
          <div className={css.wrapper}>
            <button
              onClick={() => openModal(<FilterModal onClose={closeModal} />)}
              className={css.filterButton}
            >
              <svg className={css.icon} width={16} height={16}>
                <use href={`${icons}#icon-filter`}></use>
              </svg>
              Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderDashboard;
