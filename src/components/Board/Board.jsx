import Icon from '../../images/icons.svg';
import css from './Board.module.css';

export default function Board({ board: { name } }) {
  return (
    <li className={css.item}>
      <div className={css.containerBoard}>
        <svg className={css.icon} width={18} height={18}>
          <use href={`${Icon}#icon-puzzle`}></use>
        </svg>
        <p className={css.text}>{name}</p>
      </div>

      <div className={css.containerIcons}>
        <svg className={css.focusIcon} width={16} height={16}>
          <use href={`${Icon}#icon-pencil`}></use>
        </svg>

        <svg className={css.focusIcon} width={16} height={16}>
          <use href={`${Icon}#icon-trash-can`}></use>
        </svg>
      </div>
    </li>
  );
}
