import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createColumn } from '../../redux/tasks/operations';
import { useTasks } from '../../redux/tasks/selectors';
import css from './AddColumnModal.module.css';
import icons from '../../images/icons.svg';
import Modal from 'react-modal';
import { Button } from '../Button/Button';
import { FormErrorMessages } from '../FormErrorMessages/FormErrorMessages.jsx';
import clsx from 'clsx';
import toast from 'react-hot-toast';

Modal.setAppElement('#root');

const AddColumnModal = ({ onClose }) => {
  const { selectedBoard } = useTasks();
  const [columnName, setColumnName] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const maxColumnNameLength = 32; 

  const handleCreateColumn = () => {
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

    dispatch(
      createColumn({ name: trimmedColumnName, boardId: selectedBoard.id })
    ).then(() => {
      onClose();
      setColumnName('');
      setErrors({});
    }).catch((error) => {
      console.error('Error creating column:', error);
      toast.error('Failed to create column. Please try again.');
    });
  };

  const handleNameChange = event => {
    const inputValue = event.target.value;

    if (inputValue.length <= maxColumnNameLength) {
      setColumnName(inputValue);
      setErrors({});
    } else {
      setErrors({ name: `Column title must not exceed ${maxColumnNameLength} characters` });
    }
  };

  return (
    <div className={css.modal}>
      <h2>Add column</h2>
      <input
        type="text"
        value={columnName}
        onChange={handleNameChange}
        placeholder="Title"
        className={css.input}
        autoFocus
      />
      {errors?.name && (
        <FormErrorMessages className={clsx(css.errorForm)}>
          {errors.name}
        </FormErrorMessages>
      )}
      <Button onClick={handleCreateColumn} className={css.button}>
        <div className={css.iconPlus}>
          <svg width={14} height={14}>
            <use href={`${icons}#icon-plus`}></use>
          </svg>
        </div>
        Add
      </Button>
      <button onClick={onClose} className={css.closeButton}>
        <svg className={css.iconClose} width={18} height={18}>
          <use href={`${icons}#icon-x-close`}></use>
        </svg>
      </button>
    </div>
  );
};

export default AddColumnModal;
