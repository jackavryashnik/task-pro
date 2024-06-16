import { useDispatch } from 'react-redux';
import { deleteColumn } from '../../redux/tasks/operations';
// import Card from '../Card/Card';
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
  const { tasks } = useTasks();

  const handleDeleteColumn = () => {
    try {
      dispatch(deleteColumn(column.id));
      return toast.success('Column deleted successfully');
    } catch (error) {
      toast.error(`Column wasn't deleted`);
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
      <div
        className={clsx(css.tasks, tasks.length === 0 ? css.anything : null)}
      >
        <ul>
          {tasks.length > 0 &&
            tasks.map(({ ...task }) => {
              console.log(task);
              // return <Card key={task.id} task={task} />;
            })}
        </ul>
      </div>

      <Button
        className={css.addCardButton}
        onClick={e => {
          openModal(
            <AddCardModal
              onClose={closeModal}
              columnId={column.id}
              boardId={column.boardId}
            />
          );
          console.log(e.target);
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
