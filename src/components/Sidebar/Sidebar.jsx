import LogoComponent from '../LogoComponent/LogoComponent';
import Logout from '../Logout/Logout';
import css from './Sidebar.module.css';
import icon from '../../images/icons.svg';
import CustomSupport from '../CustomSupport/CustomSupport';
import BoardList from '../BoardList/BoardList';
import clsx from 'clsx';

export default function Sidebar({isHidden}) {

  return (
    <div className={clsx([css.containerBackground, isHidden && css.hidden])}>
      <div className={css.container}>
        <LogoComponent />

        <p className={css.boardsText}>My boards</p>
        <div className={css.createBoardBox}>
          <p className={css.createBoardText}>Create a new board</p>
          <button className={css.btnPlus}>
            <svg width={40} height={36}>
              <use href={`${icon}#icon-plus-with-border`}></use>
            </svg>
          </button>
        </div>
      </div>

      <BoardList />
      <div className={css.container}>
        <CustomSupport />
        <Logout />
      </div>
    </div>
  );
}
