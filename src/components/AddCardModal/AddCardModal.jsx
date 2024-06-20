import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Calendar from '../Calendar/Calendar';
import icons from '../../images/icons.svg';
import { useDispatch } from 'react-redux';
import { createTask } from '../../redux/tasks/operations.js';
import css from './AddCardModal.module.css';
import clsx from 'clsx';
import { format } from 'date-fns';
import { Button } from '../Button/Button.jsx';
import { FormErrorMessages } from '../FormErrorMessages/FormErrorMessages.jsx';
import toast from 'react-hot-toast';

export default function AddCardModal({ onClose, boardId, columnId }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState('none');
  const [descriptionLength, setDescriptionLength] = useState(0);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    setError
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      priority: 'without',
      deadline: '',
    },
  });

  const descriptionValue = watch('description', '');

  useEffect(() => {
    setDescriptionLength(descriptionValue.length);
  }, [descriptionValue]);

  const onSubmit = data => {
    const trimmedName = data.name.trim();

    if (trimmedName === '') {
      setError('name', {
        type: 'required',
        message: 'Title cannot be empty or contain only spaces',
      });
      return;
    }

    dispatch(
      createTask({
        boardId,
        columnId,
        name: trimmedName,
        description: data.description,
        priority: data.priority,
        deadline: data.deadline || format(new Date(), 'yyyy-MM-dd'),
      })
    )
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error('Error creating task:', error);
        toast.error('Failed to create task. Please try again.');
      });
  };

  const handlePriorityChange = event => {
    const newPriority = event.target.value;
    setSelectedPriority(newPriority || 'without');
    setValue('priority', newPriority);
  };

  const handleDescriptionChange = event => {
    const newDescription = event.target.value;
    if (newDescription.length <= 500) {
      setDescriptionLength(newDescription.length);
      setValue('description', newDescription);
    }
  };

  const handleNameChange = event => {
    const newValue = event.target.value;
    setValue('name', newValue);
  };

  return (
    <div className={css.container}>
      <h2 className={css.titleModal}>Add card</h2>

      <div className={css.closeModal}>
        <button type="button" onClick={() => onClose()}>
          <svg width={18} height={18}>
            <use href={`${icons}#icon-x-close`}></use>
          </svg>
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputContainer}>
          <input
            className={css.titleCard}
            type="text"
            placeholder="Title"
            autoFocus
            onChange={handleNameChange}
            {...register('name', {
              required: 'Required field',
              maxLength: {
                value: 32,
                message: 'Title cannot exceed 32 characters',
              },
            })}
          />
          {errors?.name && (
            <FormErrorMessages className={clsx(css.errorForm)}>{errors.name.message}</FormErrorMessages>
          )}
        </div>

        <div className={css.textareaContainer}>
          <label className={css.label}>
            <textarea
              className={css.styledDescription}
              rows={4}
              placeholder="Description"
              maxLength={500}
              onChange={handleDescriptionChange}
              {...register('description')}
            />
          </label>
          <div className={css.charCount}>
            {descriptionLength}/500
          </div>
        </div>

        <p className={css.labelColorStyle}>Label color</p>
        <div className={css.options}>
          {['low', 'medium', 'high', 'without'].map(priority => (
            <label
              key={priority}
              className={clsx([css.priorityOpt, css.customRadio])}
            >
              <div className={css.radioWrapper}>
                <input
                  type="radio"
                  name="priority"
                  value={priority}
                  checked={selectedPriority === priority}
                  onChange={handlePriorityChange}
                  className={css.radioInput}
                />
                <span className={css.radioButton}>
                  <span className={css.innerCircle}></span>
                </span>
              </div>
            </label>
          ))}
        </div>

        <p className={css.deadlineStyle}>Deadline</p>
        <div>
          <Calendar
            className={css.span}
            selectedDate={selectedDate}
            onChange={date => {
              const formatData = format(date, 'yyyy-MM-dd');
              setSelectedDate(date);
              setValue('deadline', formatData);
            }}
          />
        </div>

        {errors?.deadline && (
          <FormErrorMessages className={clsx(css.errorForm)}>{errors.deadline.message}</FormErrorMessages>
        )}

        <Button type="submit" className={css.addButton}>
          <div className={css.iconPlus}>
            <svg width={14} height={14}>
              <use href={`${icons}#icon-plus`}></use>
            </svg>
          </div>

          <span className={css.buttonText}>Add</span>
        </Button>
      </form>
    </div>
  );
}
