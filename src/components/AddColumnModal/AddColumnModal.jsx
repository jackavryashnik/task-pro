import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createColumn } from '../../redux/tasks/operations';
import css from './AddColumnModal.module.css';
import icons from '../../images/icons.svg';

const AddColumnModal = ({ onClose }) => {
  const [columnName, setColumnName] = useState('');
  const dispatch = useDispatch();

  const handleCreateColumn = () => {
    if (columnName.trim()) {
      dispatch(createColumn({ name: columnName }));
      onClose();
    }
  };

  return (
    <div className={css.modal}>
      <h2>Add column</h2>
      <input
        type="text"
        value={columnName}
        onChange={e => setColumnName(e.target.value)}
        placeholder="Title"
        className={css.input}
      />
      <button onClick={handleCreateColumn} className={css.addButton}>
        <svg className={css.iconPlus} width={28} height={28}>
          <use href={`${icons}#icon-plus`}></use>
        </svg>
        Add
      </button>
      <button onClick={onClose} className={css.closeButton}>
        <svg className={css.iconClose} width={16} height={16}>
          <use href={`${icons}#icon-x-close`}></use>
        </svg>
      </button>
    </div>
  );
};

export default AddColumnModal;
