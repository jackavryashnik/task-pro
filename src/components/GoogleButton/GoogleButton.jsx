import css from './GoogleButton.module.css';
import icon from '../../images/icons.svg';

export const GoogleButton = ({ text }) => {
  return (
    <a
      className={css.button}
      href="https://task-pro-app-0x3n.onrender.com/api/auth/google"
    >
      <svg width={40} height={40} className={css.googleImg}>
        <use href={`${icon}#icon-google`}></use>
      </svg>
      {text}
    </a>
  );
};
