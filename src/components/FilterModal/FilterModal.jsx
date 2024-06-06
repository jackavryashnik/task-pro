import { useState } from 'react';
import css from './FilterModal.module.css';
import clsx from 'clsx';

const FilterModal = () => {
  const [selectedPriority, setSelectedPriority] = useState('without');

  const handlePriorityChange = event => {
    setSelectedPriority(event.target.value);
  };

  return (
    <div className={css.modal}>
      <button type="button" className={css.closeBtn}>
        x
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
        <label className={clsx([css.priorityOpt, css.customRadio])}>
          <input
            type="radio"
            name="priority"
            value="without"
            checked={selectedPriority === 'without'}
            onChange={handlePriorityChange}
            className={css.radioInput}
          />
          <span className={css.radioButton}></span>
          <span>Without priority</span>
        </label>
        <label className={clsx([css.priorityOpt, css.customRadio])}>
          <input
            type="radio"
            name="priority"
            value="low"
            checked={selectedPriority === 'low'}
            onChange={handlePriorityChange}
            className={css.radioInput}
          />
          <span className={css.radioButton}></span>
          <span>Low</span>
        </label>
        <label className={clsx([css.priorityOpt, css.customRadio])}>
          <input
            type="radio"
            name="priority"
            value="medium"
            checked={selectedPriority === 'medium'}
            onChange={handlePriorityChange}
            className={css.radioInput}
          />
          <span className={css.radioButton}></span>
          <span>Medium</span>
        </label>
        <label className={clsx([css.priorityOpt, css.customRadio])}>
          <input
            type="radio"
            name="priority"
            value="high"
            checked={selectedPriority === 'high'}
            onChange={handlePriorityChange}
            className={css.radioInput}
          />
          <span className={css.radioButton}></span>
          <span>High</span>
        </label>
      </div>
    </div>
  );
};

export default FilterModal;
