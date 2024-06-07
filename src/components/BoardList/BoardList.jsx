import { useTasks } from '../../redux/tasks/selectors';
import css from './BoardList.module.css';
import icon from '../../images/icons.svg';

export default function BoardList() {
  const { boards } = useTasks();
  return (
    <>
      {boards.length > 0 && (
        <ul className={css.list}>
          {boards.map((board, index) => {
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
