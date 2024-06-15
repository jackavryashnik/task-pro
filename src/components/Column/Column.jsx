import { useDispatch } from 'react-redux';
import { deleteColumn } from '../../redux/tasks/operations';
// import Card from '../Card/Card';
import css from './Column.module.css';
import icons from '../../images/icons.svg';
import EditColumnModal from '../EditColumnModal/EditColumnModal';
import AddCardModal from '../AddCardModal/AddCardModal';
import { useTasks } from '../../redux/tasks/selectors';
import toast from 'react-hot-toast';

const Column = ({ column, openModal, closeModal }) => {
  const dispatch = useDispatch();
  const { selectedBoard } = useTasks();
  console.log(selectedBoard);

  const handleDeleteColumn = () => {
    if (window.confirm('Are you sure you want to delete this column?')) {
      dispatch(deleteColumn(column.id));
      toast.success('Column deleted successfully');
    } 
    toast.error(`Column can't be deleted`);
  };

  return (
    <div className={css.column}>
      <div className={css.columnHeader}>
        <h3 className={css.columnTitle}>{column && column.name}</h3>
        <div className={css.columnButtons}>
          <button
            onClick={() =>
              openModal(
                <EditColumnModal column={column} onClose={closeModal} />
              )
            }
            className={css.button}
          >
            <svg className={css.iconEdit} width={24} height={24}>
              <use href={`${icons}#icon-pencil`}></use>
            </svg>
          </button>
          <button onClick={handleDeleteColumn} className={css.button}>
            <svg className={css.iconDel} width={24} height={24}>
              <use href={`${icons}#icon-trash-can`}></use>
            </svg>
          </button>
        </div>
      </div>
      <div className={css.tasks}>
        <ul>
          {/* {tasks.length > 0 &&
            tasks.map(({ ...task }) => {
              console.log(task);
              return <Card key={task.id} task={task} />;
            })} */}
        </ul>
      </div>
      <button
        onClick={() => openModal(<AddCardModal onClose={closeModal} />)}
        className={css.addCardButton}
      >
        <svg className={css.iconPlus} width={24} height={24}>
          <use href={`${icons}#icon-plus`}></use>
        </svg>
        Add another card
      </button>
    </div>
  );
};

export default Column;
