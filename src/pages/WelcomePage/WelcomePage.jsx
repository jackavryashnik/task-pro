import React from 'react';
import css from './WelcomePage.module.css';
import { Link } from 'react-router-dom';
import startMob from '../../images/start-page/start-mob.png';
import startMob2x from '../../images/start-page/start-mob@2x.png';
import startTab from '../../images/start-page/start-tab.png';
import startTab2x from '../../images/start-page/start-tab@2x.png';
import startDes from '../../images/start-page/start-des.png';
import startDes2x from '../../images/start-page/start-des@2x.png';

import icon from '../../img/icons.svg';

const WelcomePage = () => {

  return (
    <>
      <div className={css.welcomePage}>
        <div className={css.container}>
        <picture>
        <source
            srcSet={`${startMob} 1x, ${startMob2x} 2x`}
            media="(min-width: 375px)"
          />
          <source
            srcSet={`${startTab} 1x, ${startTab2x} 2x`}
            media="(min-width: 768px)"
          />
          <source
            srcSet={`${startDes} 1x, ${startDes2x} 2x`}
            media="(min-width: 1440px)"
          />
          
          <img
            src={startMob}
            alt="user icon start page"
            className={css.welcomePage_user}
          />
        </picture>
          <div className={css.logo}>
            <svg className={css.logo_icon}>
              <use href={`${icon}#icon-lightning`}></use>
            </svg>

            <p>Task Pro</p>
          </div>
          <p className={css.welcomePage_desc}>
            Supercharge your productivity and take control of your tasks with
            Task Pro - Don't wait, start achieving your goals now!
          </p>

          <ul className={css.welcomePage_list}>
            <li>
              <Link to="/auth/register" className={`${css.item} ${css.active}`}>
                Register
              </Link>
            </li>
            <li>
              <Link to="/auth/login" className={css.item}>
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;