import css from './Logout.module.css';
import icon from '../../images/icons.svg';

export default function Logout() {
  return (
    <div className={css.container}>
      <button className={css.button}>
        <svg className={css.icon} width={32} height={32}>
          <use href={`${icon}#icon-login`}></use>
        </svg>
      </button>

      <p className={css.text}>Logout</p>
    </div>
  );
}
