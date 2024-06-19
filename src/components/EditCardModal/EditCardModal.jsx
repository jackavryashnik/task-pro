import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Calendar from '../Calendar/Calendar';
import icons from '../../images/icons.svg';
import { useDispatch } from 'react-redux';
import { editTask } from '../../redux/tasks/operations.js';
import css from './EditCardModal.module.css';
import clsx from 'clsx';
import { format, parseISO } from 'date-fns';
import { FormErrorMessages } from '../FormErrorMessages/FormErrorMessages.jsx';
import { Button } from '../Button/Button.jsx';
import toast from 'react-hot-toast';

export default function EditCardModal({
  id,
  name,
  description,
  priority,
  deadline,
  onClose,
}) {
  const [selectedDate, setSelectedDate] = useState(parseISO(deadline));
  const [selectedPriority, setSelectedPriority] = useState(priority);
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

  const watchedDescription = watch('description', description);

  useEffect(() => {
    setValue('name', name);
    setValue('description', description);
    setValue('priority', priority);
    setValue('deadline', deadline);
    setSelectedDate(parseISO(deadline));
  }, [name, deadline, description, priority, setValue, setSelectedDate]);

  const onSubmit = data => {
    const trimmedName = data.name.trim();

    if (trimmedName === '') {
      setError('name', {
        type: 'required',
        message: 'Title cannot be empty or contain only spaces',
      });
      return;
    }

    const changes = {};
    if (trimmedName !== name) changes.name = trimmedName;
    if (data.description !== description) 
      changes.description = data.description;
    if (data.priority !== priority) changes.priority = data.priority;
    if (data.deadline !== deadline) changes.deadline = data.deadline;

    dispatch(editTask({ id, ...changes }))
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error('Error editing task:', error);
        toast.error('Failed to edit task. Please try again.');
      });
  };

  const handlePriorityChange = event => {
    const newPriority = event.target.value;
    setSelectedPriority(newPriority || 'without');
    setValue('priority', newPriority);
  };

  const handleDescriptionChange = event => {
    const newDescription = event.target.value;
    setValue('description', newDescription);
  };

  const handleNameChange = event => {
    const newValue = event.target.value;
    setValue('name', newValue);
  };

  return (
    <div className={css.container}>
      <h2 className={css.titleModal}>Edit card</h2>

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
            <FormErrorMessages className={clsx(css.errorForm)}>
              {errors.name.message}
            </FormErrorMessages>
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
          <div>
            <p className={css.charCount}>{watchedDescription.length}/500</p>
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
            selectedDate={selectedDate}
            onChange={date => {
              const formatedDate = format(date, 'yyyy-MM-dd');
              setSelectedDate(date);
              setValue('deadline', formatedDate);
            }}
          />
        </div>

        {errors?.deadline && (
          <FormErrorMessages className={clsx(css.errorForm)}>
            {errors.deadline.message}
          </FormErrorMessages>
        )}

        <Button type="submit" className={css.addButton}>
          <div className={css.iconPlus}>
            <svg width={14} height={14}>
              <use href={`${icons}#icon-plus`}></use>
            </svg>
          </div>

          <span className={css.buttonText}>Edit</span>
        </Button>
      </form>
    </div>
  );
}
