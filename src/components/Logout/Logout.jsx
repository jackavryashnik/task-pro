import css from './Logout.module.css';
import icon from '../../images/icons.svg';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/operations';

export default function Logout() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logout());
  };
  return (
    <div className={css.container}>
      <button className={css.button} onClick={handleClick}>
        <svg className={css.icon} width={32} height={32}>
          <use href={`${icon}#icon-login`}></use>
        </svg>
        <p className={css.text}>Log out</p>
      </button>
    </div>
  );
}
