import { useDispatch } from 'react-redux';
import Icon from '../../images/icons.svg';
import css from './Board.module.css';
import { deleteBoard, fetchOneBoard } from '../../redux/tasks/operations';

export default function Board({ board: { name, icon, id } }) {
  const dispatch = useDispatch();

  return (
    <li className={css.item}>
      <div className={css.containerBoard}>
        <svg className={css.icon} width={18} height={18}>
          <use href={Icon + icon}></use>
        </svg>
        <p className={css.text} onClick={() => dispatch(fetchOneBoard(id))}>
          {name}
        </p>
      </div>

      <div className={css.containerIcons}>
        <button type="button" className={css.btn}>
          <svg className={css.focusIcon} width={16} height={16}>
            <use href={`${Icon}#icon-pencil`}></use>
          </svg>
        </button>

        <button
          type="button"
          className={css.btn}
          onClick={() => {
            dispatch(deleteBoard(id));
          }}
        >
          <svg className={css.focusIcon} width={16} height={16}>
            <use href={`${Icon}#icon-trash-can`}></use>
          </svg>
        </button>
      </div>
    </li>
  );
}
