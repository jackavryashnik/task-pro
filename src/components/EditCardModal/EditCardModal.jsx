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

export default function EditCardModal({
  id,
  name,
  description,
  priority,
  deadline,
  onClose,
}) {
  const [selectedDate, setSelectedDate] = useState(parseISO(deadline));
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

  useEffect(() => {
    setValue('name', name);
    setValue('description', description);
    setValue('priority', priority);
    setValue('deadline', deadline);
    setSelectedDate(parseISO(deadline));
  }, [name, deadline, description, priority, setValue, setSelectedDate]);

  const onSubmit = data => {
    dispatch(
      editTask({
        id,
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
      <h2 className={css.titleModal}>Edit card</h2>

      <div className={css.closeModal}>
        <button type="button" onClick={() => onClose()}>
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
          onChange={e => {
            setValue('name', e.target.value);
          }}
          {...register('name', {
            required: 'Required field',
            minLength: {
              value: 2,
              message: 'Title must be at least 2 characters',
            },
            maxLength: {
              value: 32,
              message: 'Title cannot exceed 32 characters',
            },
          })}
        />
        {errors?.name && (
          <FormErrorMessages>{errors.name.message}</FormErrorMessages>
        )}

        <label className={css.label}>
          <textarea
            className={css.styledDescription}
            rows={4}
            placeholder="Description"
            {...register('description')}
            onChange={e => {
              setValue('description', e.target.value);
            }}
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
              const formatedDate = format(date, 'yyyy-MM-dd');
              setSelectedDate(date);
              setValue('deadline', formatedDate);
            }}
          />
        </div>

        {errors?.deadline && (
          <FormErrorMessages>{errors.deadline.message}</FormErrorMessages>
        )}

        <Button type="submit" className={css.btnPlus}>
          <div className={css.svgBox}>
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
