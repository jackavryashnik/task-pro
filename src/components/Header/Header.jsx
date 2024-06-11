import { useState } from 'react';
import css from './Header.module.css';
import icons from '../../images/icons.svg';
import { useDispatch } from 'react-redux';
import { changeTheme } from '../../redux/auth/operations';

const Header = ({ isHidden, setter }) => {
  const [selectorOpen, setSelectorOpen] = useState(false);
  const dispatch = useDispatch();

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
        <div className={css.userInfo}>
          <span className={css.userName}>Ivetta</span>
          <img
            // заглушка
            src="/src/images/cactus.png"
            alt="User Avatar"
            className={css.avatar}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
