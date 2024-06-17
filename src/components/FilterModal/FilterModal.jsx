import { useState, useEffect } from 'react';
import css from './FilterModal.module.css';
import clsx from 'clsx';
import icons from '../../images/icons.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterPriority, selectPriority } from '../../redux/filters/slice';

const FilterModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const currentPriority = useSelector(selectPriority);
  const [selectedPriority, setSelectedPriority] = useState(currentPriority);

  useEffect(() => {
    setSelectedPriority(currentPriority);
  }, [currentPriority]);

  const handlePriorityChange = event => {
    const priority = event.target.value;
    setSelectedPriority(priority);
    dispatch(setFilterPriority(priority));
  };

  return (
    <div className={css.modal}>
      <button type="button" className={css.closeBtn} onClick={onClose}>
        <svg width={18} height={18}>
          <use href={`${icons}#icon-x-close`}></use>
        </svg>
      </button>
      <h2 className={css.title}>Filters</h2>
      <div className={css.line}></div>
      <div className={css.container}>
        <h3 className={css.subtitle}>Priority</h3>
        <button
          type="button"
          className={css.showAll}
          onClick={() => {
            setSelectedPriority('none');
            dispatch(setFilterPriority('none'));
          }}
        >
          Show all
        </button>
      </div>
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
            <span>
              {priority === 'none'
                ? 'Show all'
                : priority === 'without'
                ? 'Without priority'
                : priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterModal;
