import Column from '../Column/Column';
import css from './MainDashboard.module.css';
import { useTasks } from '../../redux/tasks/selectors';
import icons from '../../images/icons.svg';
import AddColumnModal from '../AddColumnModal/AddColumnModal';
import { Button } from '../Button/Button';

const MainDashboard = ({ openModal, closeModal }) => {
  const { columns } = useTasks();

  return (
    <div className={css.dashboard}>
      <div className={css.columns}>
        {columns.map(column => {
          return (
            <Column
              openModal={openModal}
              closeModal={closeModal}
              key={column.id}
              column={column}
              tasks={column.tasks}
            />
          );
        })}
        <Button className={css.addColumnButton} onClick={() => openModal(<AddColumnModal onClose={closeModal} />)}>
        <div className={css.iconPlus}>
          <svg width={14} height={14}>
            <use href={`${icons}#icon-plus`}></use>
          </svg>
        </div>
        Add another column</Button>
      </div>
    </div>
  );
};

export default MainDashboard;
