import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import ScreenPage from '../ScreensPage/ScreensPage';
import css from './HomePage.module.css';
import { useState } from 'react';

const HomePage = () => {
  const [isHidden, setIsVisible] = useState(false);

  return (
    <div className={css.homePage}>
      <div>
        <Sidebar isHidden={isHidden} />
      </div>
      <div>
        <div>
          <Header isHidden={isHidden} setter={setIsVisible} />
        </div>
        <div>
          <ScreenPage />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
