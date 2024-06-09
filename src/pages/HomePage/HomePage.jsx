import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import ScreenPage from '../ScreensPage/ScreensPage';
import css from './HomePage.module.css';
import { useState } from 'react';
import clsx from 'clsx';

const HomePage = () => {
  const [isHidden, setIsHidden] = useState(true);

  const toggleSidebar = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className={css.homePage}>
      <div className={clsx([css.sidebarWrapper, !isHidden && css.show])}>
        <Sidebar isHidden={isHidden} className={css.sidebar} />
      </div>
      <div
        className={clsx([css.main, !isHidden && css.showSidebar])}
        onClick={toggleSidebar}
      >
        <Header isHidden={isHidden} setter={setIsHidden} />
        <ScreenPage />
      </div>
    </div>
  );
};

export default HomePage;
