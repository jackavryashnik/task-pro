import { useState } from 'react';
import Column from '../Column/Column';
import css from './MainDashboard.module.css';
import AddColumnModal from '../AddColumnModal/AddColumnModal';
import { useTasks } from '../../redux/tasks/selectors';
import icons from '../../images/icons.svg';

const MainDashboard = ({ handleClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { columns } = useTasks();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.dashboard}>
      <div className={css.columns}>
        {columns.map(column => (
          <Column key={column.id} column={column} tasks={column.tasks} />
        ))}
        <button onClick={handleClick} className={css.addColumnButton}>
          <svg className={css.addIcon} width={28} height={28}>
            <use href={`${icons}#icon-plus`}></use>
          </svg>
          Add another column
        </button>
      </div>
      {isModalOpen && <AddColumnModal onClose={handleCloseModal} />}
    </div>
  );
};

export default MainDashboard;
