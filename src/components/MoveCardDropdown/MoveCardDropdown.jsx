import { useSelector } from 'react-redux';
import { MoveCardItem } from '../EditCardModal/EditCardModal';
import { nanoid } from '@reduxjs/toolkit';
import css from './MoveCardDropdown.module.css';

export const MoveCardDropdown = ({ currColumnId, cardId }) => {
  const { columns } = useSelector(state => state.columns);

  return (
    <ul className={css.moveList}>
      {columns.map(item => (
        <MoveCardItem
          currentId={currColumnId}
          key={nanoid()}
          column={item}
          cardId={cardId}
        />
      ))}
    </ul>
  );
};
