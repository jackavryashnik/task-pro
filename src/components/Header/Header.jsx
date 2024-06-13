import { useState } from 'react';
import css from './Header.module.css';
import icons from '../../images/icons.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors.js';
import { changeTheme } from '../../redux/auth/operations';
import defaultAvatar from '../../images/user.jpg'
import defaultAvatar2x from '../../images/user@2x.jpg'
import { EditProfile } from '../EditProfile/EditProfile.jsx';

const Header = ({ isHidden, setter, openModal, closeModal }) => {
  const [selectorOpen, setSelectorOpen] = useState(false);
  const dispatch = useDispatch();

  const currentDataUser = useSelector(selectUser);

  const handleThemeChange = theme => {
    dispatch(changeTheme(theme));
  };

  const handleMenuToggle = () => {
    setter(!isHidden);
  };

  const handleThemeSelectorToggle = () => {
    setSelectorOpen(!selectorOpen);
  };

  return (
    <header className={css.header}>
      <div className={css.menuBtnContainer}>
        <button onClick={handleMenuToggle} className={css.menuButton}>
          <svg className={css.svgMenu} width={24} height={24}>
            <use href={`${icons}#icon-burger-menu`}></use>
          </svg>
        </button>
      </div>
      <div className={css.rightSection}>
        <div className={css.themeSelectorContainer}>
          <button
            onClick={handleThemeSelectorToggle}
            className={css.themeButton}
          >
            Theme
            <svg className={css.chevronIcon} width={16} height={16}>
              <use href={`${icons}#icon-chevron-down`}></use>
            </svg>
          </button>
          {selectorOpen && (
            <div className={css.themeSelector}>
              <ul>
                <li onClick={handleThemeChange('light')}>Light</li>
                <li onClick={handleThemeChange('violet')}>Violet</li>
                <li onClick={handleThemeChange('dark')}>Dark</li>
              </ul>
            </div>
          )}
        </div>
        <button className={css.userInfo} onClick={() => openModal(<EditProfile closeModal={closeModal} />)}>
          <span className={css.userName}>{currentDataUser.name}</span>
          <img className={css.avatar} src={currentDataUser.avatar ? currentDataUser.avatar : defaultAvatar} srcSet={`${currentDataUser.avatar ? currentDataUser.avatar : defaultAvatar} 1x, ${currentDataUser.avatar ? currentDataUser.avatar : defaultAvatar2x} 2x`} alt={"Profile avatar"} />
        </button>
      </div>
    </header>
  );
};

export default Header;
