import { useState } from 'react';
import css from './Header.module.css';
import icons from '../../images/icons.svg';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectorOpen, setSelectorOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleThemeSelectorToggle = () => {
    setSelectorOpen(!selectorOpen);
  };

  return (
    <header className={css.header}>
      <div className={css.menuBtnContainer}>
        <button onClick={handleMenuToggle} className={css.menuButton}>
          <svg className={css.menuIcon}>
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
            <svg className={css.chevronIcon}>
              <use href={`${icons}#icon-chevron-down`}></use>
            </svg>
          </button>
          {selectorOpen && (
            <div className={css.themeSelector}>
              <ul>
                <li>Light</li>
                <li>Violet</li>
                <li>Dark</li>
              </ul>
            </div>
          )}
        </div>
        <div className={css.userInfo}>
          <span className={css.userName}>Ivetta</span>
          <img
            src="/src/images/bg-mobile/cloudy.webp"
            alt="User Avatar"
            className={css.avatar}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
