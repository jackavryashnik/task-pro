import { useState } from 'react';
import css from './FilterModal.module.css';
import clsx from 'clsx';
import closeBtn from '../../images/icons.svg#icon-x-close';

const FilterModal = () => {
  const [selectedPriority, setSelectedPriority] = useState('without');

  const handlePriorityChange = event => {
    setSelectedPriority(event.target.value);
  };

  return (
    <div className={css.modal}>
      <button type="button" className={css.closeBtn}>
        <svg width={18} height={18}>
          <use href={closeBtn} />
        </svg>
      </button>
      <h2 className={css.title}>Filters</h2>
      <div className={css.line}></div>
      <div className={css.container}>
        <h3 className={css.subtitle}>Label color</h3>
        <button type="button" className={css.showAll}>
          Show all
        </button>
      </div>
      <div className={css.options}>
        {['without', 'low', 'medium', 'high'].map((priority) => (
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
            <span>{priority === 'without' ? 'Without priority' : priority.charAt(0).toUpperCase() + priority.slice(1)}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterModal;
