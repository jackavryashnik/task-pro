import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editColumn } from '../../redux/tasks/operations';
import { Button } from '../Button/Button';
import css from './EditColumnModal.module.css';
import icons from '../../images/icons.svg';
import { FormErrorMessages } from '../FormErrorMessages/FormErrorMessages.jsx';
import clsx from 'clsx';
import toast from 'react-hot-toast';

const EditColumnModal = ({ column, onClose }) => {
  const [columnName, setColumnName] = useState(column ? column.name : '');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const maxColumnNameLength = 32; 

  const handleChange = e => {
    const inputValue = e.target.value;

    if (inputValue.length <= maxColumnNameLength) {
      setColumnName(inputValue);
      setErrors({});
    } else {
      setErrors({ name: `Column title must not exceed ${maxColumnNameLength} characters` });
    }
  };

  const handleSubmit = () => {
    const trimmedColumnName = columnName.trim();
    const newErrors = {};

    if (trimmedColumnName === '') {
      newErrors.name = 'Please write a title for the column';
    } else if (trimmedColumnName.length > maxColumnNameLength) {
      newErrors.name = `Column title must not exceed ${maxColumnNameLength} characters`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
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
        maxLength={25}
      />
      {errors?.name && (
        <FormErrorMessages className={clsx(css.errorForm)}>
          {errors.name}
        </FormErrorMessages>
      )}
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
