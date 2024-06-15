import css from './GoogleButton.module.css';
import icon from '../../images/icons.svg';

export const GoogleButton = ({ text, onClick }) => {
  return (
    <a
      className={css.button}
      role="button"
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      <svg width={40} height={40} className={css.googleImg}>
        <use href={`${icon}#icon-google`}></use>
      </svg>
      {text}
    </a>
  );
};
