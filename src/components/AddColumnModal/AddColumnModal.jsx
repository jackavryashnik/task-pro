import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createColumn } from '../../redux/tasks/operations';
import { useTasks } from '../../redux/tasks/selectors';
import { Button } from '../Button/Button';
import css from './AddColumnModal.module.css';
import icons from '../../images/icons.svg';
import toast from 'react-hot-toast';

const AddColumnModal = ({ onClose }) => {
  const { selectedBoard } = useTasks();
  const [columnName, setColumnName] = useState('');
  const dispatch = useDispatch();

  const handleCreateColumn = () => {
    if (columnName.trim() === '') {
      return toast.error('Please write a title for the column');
    }
    dispatch(
      createColumn({ name: columnName.trim(), boardId: selectedBoard.id })
    );
    onClose();
    setColumnName('');
  };

  const handleChange = e => {
    setColumnName(e.target.value.slice(0, 25));
  };

  return (
    <div className={css.modal}>
      <h2>Add column</h2>
      <input
        type="text"
        value={columnName}
        onChange={handleChange}
        placeholder="Title"
        className={css.input}
        maxLength={25}
        autoFocus
      />
      <Button onClick={handleCreateColumn} className={css.button}>
        <div className={css.iconPlus}>
          <svg width={14} height={14}>
            <use href={`${icons}#icon-plus`}></use>
          </svg>
        </div>
        Add
      </Button>
      <button onClick={() => onClose()} className={css.closeButton}>
        <svg className={css.iconClose} width={18} height={18}>
          <use className={css.iconClose} href={`${icons}#icon-x-close`}></use>
        </svg>
      </button>
    </div>
  );
};

export default AddColumnModal;
