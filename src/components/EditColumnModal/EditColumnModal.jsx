import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editColumn } from '../../redux/tasks/operations';
import css from './EditColumnModal.module.css';
import icons from '../../images/icons.svg';
import { Button } from '../Button/Button';

const EditColumnModal = ({ column, onClose }) => {
  const [columnName, setColumnName] = useState(column ? column.name : '');
  const dispatch = useDispatch();

  const handleChange = e => {
    setColumnName(e.target.value);
  };

  const handleSubmit = () => {
    if (column && column.id) {
      dispatch(editColumn({ id: column.id, name: columnName }));
      onClose();
    }
  };

  return (
    <div className={css.modal}>
      <h2>Edit Column</h2>
      <input
        type="text"
        value={columnName}
        onChange={handleChange}
        className={css.input}
        autoFocus
      />
      <Button onClick={handleSubmit} className={css.button}>
        <div className={css.iconPlus}>
          <svg width={14} height={14}>
            <use href={`${icons}#icon-plus`}></use>
          </svg>
        </div>
        Add
      </Button>
      <button onClick={onClose} className={css.closeButton}>
        <svg className={css.svgClose} width={16} height={16}>
          <use href={`${icons}#icon-x-close`}></use>
        </svg>
      </button>
    </div>
  );
};

export default EditColumnModal;
