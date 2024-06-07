import css from './BoardList.module.css';
import icon from '../../images/icons.svg';

const arr = ['Project Office', 'Neon Light Project'];

export default function BoardList() {
  return (
    <>
      {arr.length > 0 && (
        <ul className={css.list}>
          {arr.map((board, index) => {
            return (
              <li className={css.item} key={index}>
                <div className={css.containerBoard}>
                  <svg className={css.icon} width={18} height={18}>
                    <use href={`${icon}#icon-puzzle`}></use>
                  </svg>
                  <p className={css.text}>{board}</p>
                </div>

                <div className={css.containerIcons}>
                  <svg className={css.focusIcon} width={16} height={16}>
                    <use href={`${icon}#icon-pencil`}></use>
                  </svg>

                  <svg className={css.focusIcon} width={16} height={16}>
                    <use href={`${icon}#icon-trash-can`}></use>
                  </svg>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
