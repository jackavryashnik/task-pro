import css from './GoogleButton.module.css';
import icon from '../../images/icons.svg';

export const GoogleButton = () => {
  const handleClick = () => {
    console.log('Login with Google button clicked');
  };

  return (
    <a
      className={css.button}
      role="button"
      onClick={e => {
        e.preventDefault();
        handleClick();
      }}
    >
      <svg width={40} height={40} className={css.googleImg}>
        <use href={`${icon}#icon-google`}></use>
      </svg>
      Login with Google
    </a>
  );
};
