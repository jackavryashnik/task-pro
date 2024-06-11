import { useState } from 'react';
import css from './HeaderDashboard.module.css';
import FilterModal from '../FilterModal/FilterModal';
import icons from '../../images/icons.svg';

const HeaderDashboard = ({ boardName }) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleFilterClick = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  return (
    <div className={css.header}>
      {/* название заглушка */}
      <h1 className={css.boardName}>{boardName}boardName</h1>
      <button onClick={handleFilterClick} className={css.filterButton}>
        <svg className={css.icon} width={16} height={16}>
          <use href={`${icons}#icon-filter`}></use>
        </svg>
        Filters
      </button>
      {isFilterModalOpen && <FilterModal onClose={handleCloseFilterModal} />}
    </div>
  );
};

export default HeaderDashboard;
