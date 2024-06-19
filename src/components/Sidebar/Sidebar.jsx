import LogoComponent from '../LogoComponent/LogoComponent';
import Logout from '../Logout/Logout';
import css from './Sidebar.module.css';
import icon from '../../images/icons.svg';
import CustomSupport from '../CustomSupport/CustomSupport';
import BoardList from '../BoardList/BoardList';
import CreateBoard from '../CreateBoard/CreateBoard';
import { useState } from 'react';

export default function Sidebar({ openModal, closeModal }) {
  const [isEdit, setIsEdit] = useState(false);
  const handleClick = () => {
    openModal(<CreateBoard isEdit={false} onClose={closeModal} />);
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
      </div>
      <div className={css.listBox}>
        <BoardList
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          openModal={openModal}
          closeModal={closeModal}
        />
      </div>
      <div className={css.container}>
        <CustomSupport openModal={openModal} closeModal={closeModal} />
        <Logout />
      </div>
    </div>
  );
}
