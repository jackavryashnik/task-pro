import { useDispatch } from 'react-redux';
import { deleteColumn } from '../../redux/tasks/operations';
import Card from '../Card/Card';
import css from './Column.module.css';
import icons from '../../images/icons.svg';
import EditColumnModal from '../EditColumnModal/EditColumnModal';
import AddCardModal from '../AddCardModal/AddCardModal';
import { useTasks } from '../../redux/tasks/selectors';

import { DeleteModal } from '../DeleteModal/DeleteModal';
import toast from 'react-hot-toast';
import { Button } from '../Button/Button';
import clsx from 'clsx';

const Column = ({ column, openModal, closeModal }) => {
  const dispatch = useDispatch();
  const { tasks, filterPriority } = useTasks();
  const filterTasks = tasks.filter(task => {
    return (
      task.columnId === column.id &&
      (filterPriority === 'none' || task.priority === filterPriority)
    );
  });

  const handleDeleteColumn = async() => {
    try {
      await dispatch(deleteColumn(column.id)).unwrap();
      toast.success(`Column ${column.name} was deleted`);
    } catch (error) {
      const errorMessage = error.response.data.message || error.message;
      toast.error(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className={css.column}>
      <div className={css.columnHeader}>
        <h3 className={css.columnTitle}>{column && column.name}</h3>
        <div className={css.columnButtons}>
          <button
            className={css.buttonItem}
            onClick={() =>
              openModal(
                <EditColumnModal column={column} onClose={closeModal} />
              )
            }
          >
            <svg className={css.icon} width={16} height={16}>
              <use href={`${icons}#icon-pencil`}></use>
            </svg>
          </button>
          <button
            className={css.buttonItem}
            onClick={() =>
              openModal(
                <DeleteModal
                  closeModal={closeModal}
                  onDelete={handleDeleteColumn}
                >
                  Are you sure you want to delete this column?
                </DeleteModal>
              )
            }
          >
            <svg className={css.icon} width={16} height={16}>
              <use href={`${icons}#icon-trash-can`}></use>
            </svg>
          </button>
        </div>
      </div>
      <div className={clsx(css.tasks, tasks.length === 0 ? css.nothing : null)}>
        <ul className={css.list}>
          {filterTasks.length > 0 &&
            filterTasks.map(({ ...task }) => {
              return (
                <Card
                  key={task.id}
                  task={task}
                  openModal={openModal}
                  closeModal={closeModal}
                  columnId={column.id}
                />
              );
            })}
        </ul>
      </div>

      <Button
        className={css.addCardButton}
        onClick={() => {
          openModal(
            <AddCardModal
              onClose={closeModal}
              columnId={column.id}
              boardId={column.boardId}
            />
          );
        }}
      >
        <div className={css.iconPlus}>
          <svg width={14} height={14}>
            <use href={`${icons}#icon-plus`}></use>
          </svg>
        </div>
        Add another card
      </Button>
    </div>
  );
};

export default Column;
