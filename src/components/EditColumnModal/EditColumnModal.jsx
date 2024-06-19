import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editColumn } from '../../redux/tasks/operations';
import css from './EditColumnModal.module.css';
import icons from '../../images/icons.svg';
import { Button } from '../Button/Button';
import toast from 'react-hot-toast';

const EditColumnModal = ({ column, onClose }) => {
  const [columnName, setColumnName] = useState(column ? column.name : '');
  const dispatch = useDispatch();

  const maxColumnNameLength = 32; 

  const handleChange = e => {
    const inputValue = e.target.value;
      // Перевірка максимальної довжини введеного тексту
      if (inputValue.length > maxColumnNameLength) {
        toast.error(`Column title must not exceed ${maxColumnNameLength} characters`);
        return;
      }
    setColumnName(inputValue);
  };

  const handleSubmit = () => {
    const trimmedColumnName = columnName.trim();

    if (trimmedColumnName === '') {
      return toast.error('Please write a title for the column');
    }

    if (trimmedColumnName.length > maxColumnNameLength) {
      return toast.error(`Column title must not exceed ${maxColumnNameLength} characters`);
    }


    if (column && column.id) {
      dispatch(editColumn({ id: column.id, name: trimmedColumnName }))
        .then(() => {
          onClose();
        })
        .catch(error => {
          console.error('Error editing column:', error);
          toast.error('Failed to edit column. Please try again.');
        });
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
