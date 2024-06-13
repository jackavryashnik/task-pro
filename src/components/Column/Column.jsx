import { useDispatch } from 'react-redux';
import { deleteColumn } from '../../redux/tasks/operations';
import Card from '../Card/Card';
import css from './Column.module.css';
import icons from '../../images/icons.svg';

// исправить переменные, что такое таскиф
const Column = ({ column, tasks, handleClick }) => {
  const dispatch = useDispatch();

  const handleDeleteColumn = () => {
    if (window.confirm('Are you sure you want to delete this column?')) {
      dispatch(deleteColumn(column.id));
    }
  };

  return (
    <div className={css.column}>
      <div className={css.columnHeader}>
        <h3 className={css.columnTitle}>{column && column.name}</h3>
        <div className={css.columnButtons}>
          <button
            onClick={() => handleClick('editColumn')}
            className={css.button}
          >
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
        {tasks && tasks.map(task => <Card key={task.id} task={task} />)}
      </div>
      <button onClick={handleClick} className={css.addCardButton}>
        <svg className={css.iconPlus} width={24} height={24}>
          <use href={`${icons}#icon-plus`}></use>
        </svg>
        Add another card
      </button>
    </div>
  );
};

export default Column;
