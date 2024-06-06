import React from 'react';
import css from './WelcomePage.module.css';
import { Link } from 'react-router-dom';
// import {
//   start-mob,
//   start-mob@x2,
//   start-tab,
//   start-tab@2x,
//   start-des,
//   start-des@2x
//import startMob from '../../images/start-page/start-mob.png';

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
          <img
            src={startMob}
            alt="user icon start page"
            className={css.welcomePage_user}
            // srcSet={`${start-mob} 1x , ${start-mob@2x} 2x , ${start-tab} 1x , ${start-tab@2x} 2x , ${start-des} 1x , ${start-des@2x} 2x`}
            // sizes=" (min-width: 768px) 162px , (min-width: 375px) 124px"
            srcSet={`
              ${startMob} 1x,
              ${startMob2x} 2x,
              ${startTab} 768w,
              ${startTab2x} 768w,
              ${startDes} 1024w,
              ${startDes2x} 1024w
            `}
            sizes="(max-width: 374px) 124px, 
                   (min-width: 375px) and (max-width: 767px) 162px,
                   (min-width: 768px) and (max-width: 1023px) 162px,
                   (min-width: 1024px) 162px"
          />
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