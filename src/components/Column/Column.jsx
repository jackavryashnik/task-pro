import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteColumn, createTask } from '../../redux/tasks/operations';
import Card from '../Card/Card';
import AddCardModal from '../AddCardModal/AddCardModal';
import EditColumnModal from '../EditColumnModal/EditColumnModal';
import css from './Column.module.css';
import icons from '../../images/icons.svg';

const Column = ({ column, tasks }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditColumn = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteColumn = () => {
    if (window.confirm('Are you sure you want to delete this column?')) {
      dispatch(deleteColumn(column.id));
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleAddTask = values => {
    dispatch(createTask({ ...values, columnId: column.id }));
  };

  return (
    <div className={css.column}>
      <div className={css.columnHeader}>
        <h3 className={css.columnTitle}>{column.name}</h3>
        <div className={css.columnButtons}>
          <button onClick={handleEditColumn} className={css.button}>
            <svg className={css.icon} width={24} height={24}>
              <use href={`${icons}#icon-pencil`}></use>
            </svg>
          </button>
          <button onClick={handleDeleteColumn} className={css.button}>
            <svg className={css.icon} width={24} height={24}>
              <use href={`${icons}#icon-trash-can`}></use>
            </svg>
          </button>
        </div>
      </div>
      <div className={css.tasks}>
        {tasks.map(task => (
          <Card key={task.id} task={task} />
        ))}
      </div>
      <button onClick={handleOpenModal} className={css.addCardButton}>
        <svg className={css.iconPlus} width={24} height={24}>
          <use href={`${icons}#icon-plus`}></use>
        </svg>
        Add another card
      </button>
      {isModalOpen && (
        <AddCardModal onAddTask={handleAddTask} onClose={handleCloseModal} />
      )}
      {isEditModalOpen && (
        <EditColumnModal column={column} onClose={handleCloseEditModal} />
      )}
    </div>
  );
};

export default Column;
