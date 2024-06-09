import { useDispatch } from 'react-redux';
import css from './MoveCardItem.module.css';
import { chengeColumnsCard } from '../../redux/tasks';
import { Icon } from '../../images/icons.svg';

export const MoveCardItem = ({ column, cardId, currentId }) => {
  const dispatch = useDispatch();
  const { _id, title } = column;
  const current = _id === currentId ? css.current : '';

  const handleMoveCard = () => {
    dispatch(chengeColumnsCard({ cardId, toColumnId: _id }));
  };

  return (
    <li className={`${css.moveCardItem} ${current}`}>
      <button className={css.button} onClick={handleMoveCard}>
        {title}
      </button>
      <Icon
        name="icon-arrow-circle-broken-right"
        width="16px"
        height="16px"
        stroke="var()"
      />
    </li>
  );
};
