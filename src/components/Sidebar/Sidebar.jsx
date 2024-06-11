import LogoComponent from '../LogoComponent/LogoComponent';
import Logout from '../Logout/Logout';
import css from './Sidebar.module.css';
import icon from '../../images/icons.svg';
import CustomSupport from '../CustomSupport/CustomSupport';
import BoardList from '../BoardList/BoardList';
import CreateBoard from '../CreateBoard/CreateBoard';

// import { useState } from 'react';

export default function Sidebar({ toggleModal }) {
  const onClose = () => {
    toggleModal('');
  };
  const handleClick = () => {
    toggleModal(<CreateBoard onClose={onClose} />);
  };
  return (
    <div className={css.containerBackground}>
      <div className={css.container}>
        <LogoComponent />

        <p className={css.boardsText}>My boards</p>
        <div className={css.createBoardBox}>
          <p className={css.createBoardText}>Create a new board</p>
          <button className={css.btnPlus} onClick={handleClick}>
            <svg width={40} height={36}>
              <use href={`${icon}#icon-plus-with-border`}></use>
            </svg>
          </button>
        </div>
        <BoardList />
      </div>

      <div className={css.container}>
        <CustomSupport />
        <Logout />
      </div>
    </div>
  );
}
