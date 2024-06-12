import { useDispatch } from 'react-redux';
import css from './MoveCardItem.module.css';
import { moveTask } from '../../redux/tasks/operations.js';
import icons from '../../images/icons.svg';

export const MoveCardItem = ({ column, cardId, currentId }) => {
  const dispatch = useDispatch();
  const { _id, title } = column;
  const current = _id === currentId ? css.current : '';

  const handleMoveCard = () => {
    dispatch(moveTask({ cardId, toColumnId: _id }));
  };

  return (
    <li className={`${css.moveCardItem} ${current}`}>
      <button className={css.button} onClick={handleMoveCard}>
        {title}
      </button>
        <svg
        width={16}
        height={16}>
            <use href={`${icons}#icon-arrow-circle-broken-right`}></use> 
        </svg>
    </li>
  );
};
