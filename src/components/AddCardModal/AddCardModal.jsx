import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Calendar from '../Calendar/Calendar';
import icons from '../../images/icons.svg';
import { useDispatch } from 'react-redux';
import { createTask } from '../../redux/tasks/operations.js';
import css from './AddCardModal.module.css';
import clsx from 'clsx';
import { format } from 'date-fns';

export default function AddCardModal({ onClose, columnId, boardId }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState('none');
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      priority: 'without',
      deadline: '',
    },
  });

  const onSubmit = data => {
    dispatch(
      createTask({
        boardId: boardId,
        columnId: columnId,
        name: data.name,
        description: data.description,
        priority: data.priority,
        deadline: data.deadline,
      })
    );
    onClose();
  };

  const handlePriorityChange = event => {
    const newPriority = event.target.value;
    setSelectedPriority(newPriority || 'without');
    setValue('priority', newPriority);
  };

  return (
    <div className={css.container}>
      <h2 className={css.titleModal}>Add card</h2>
      <div className={css.closeModal}>
        <button type="button" onClick={onClose}>
          <svg width={18} height={18}>
            <use href={`${icons}#icon-x-close`}></use>
          </svg>
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className={css.titleCard}
          type="text"
          placeholder="Title"
          autoFocus
          {...register('name', { required: 'This field is required' })}
        />
        {errors.name && <p className={css.errorMessage}>Title is required</p>}

        <label className={css.label}>
          <textarea
            className={css.styledDescription}
            rows={4}
            placeholder="Description"
            {...register('description')}
          />
        </label>

        <p className={css.labelColorStyle}>Label color</p>
        <div className={css.options}>
          {['without', 'low', 'medium', 'high'].map(priority => (
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
          <span className={css.span}>Today,</span>
          <Calendar
            selectedDate={selectedDate}
            onChange={date => {
              const formatData = format(date, 'yyyy-MM-dd');
              setSelectedDate(date);
              setValue('deadline', formatData);
            }}
          />
        </div>

        {errors.deadline && (
          <p className={css.errorMessage}>Please select a date</p>
        )}

        <button className={css.addButton} type="submit">
          <div className={css.stylePlus}>
            <svg width={14} height={14}>
              <use href={`${icons}#icon-plus`}></use>
            </svg>
          </div>
          <span className={css.buttonText}>Add</span>
        </button>
      </form>
    </div>
  );
}
