import Column from '../Column/Column';
import css from './MainDashboard.module.css';
import { useTasks } from '../../redux/tasks/selectors';
import icons from '../../images/icons.svg';
import AddColumnModal from '../AddColumnModal/AddColumnModal';

const MainDashboard = ({ openModal, closeModal }) => {
  const { columns = [], boards } = useTasks();

  return (
    <div className={css.dashboard}>
      {boards.length > 0 && (
        <div className={css.columns}>
          {columns.map(column => (
            <Column
              openModal={openModal}
              closeModal={closeModal}
              key={column.id}
              column={column}
              tasks={column.tasks}
            />
          ))}
          <button
            onClick={() => openModal(<AddColumnModal onClose={closeModal} />)}
            className={css.addColumnButton}
          >
            <svg className={css.addIcon} width={28} height={28}>
              <use href={`${icons}#icon-plus`}></use>
            </svg>
            Add another column
          </button>
        </div>
      )}
    </div>
  );
};

export default MainDashboard;
