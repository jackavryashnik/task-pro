import { useDispatch } from 'react-redux';
import Icon from '../../images/icons.svg';
import css from './Board.module.css';
import { deleteBoard, fetchOneBoard } from '../../redux/tasks/operations';
import CreateBoard from '../CreateBoard/CreateBoard';
import { useState } from 'react';

export default function Board({
  board: { name, icon, id },
  openModal,
  closeModal,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsEdit(true);
    openModal(
      <CreateBoard isEdit={isEdit} setter={setIsEdit} onClose={closeModal} />
    );
  };

  return (
    <li className={css.item} onClick={() => dispatch(fetchOneBoard(id))}>
      <div className={css.containerBoard}>
        <svg className={css.icon} width={18} height={18}>
          <use href={Icon + icon}></use>
        </svg>
        <p className={css.text}>{name}</p>
      </div>

      <div className={css.containerIcons}>
        <button type="button" className={css.btn} onClick={handleClick}>
          <svg className={css.focusIcon} width={16} height={16}>
            <use href={`${Icon}#icon-pencil`}></use>
          </svg>
        </button>

        <button
          type="button"
          className={css.btn}
          onClick={() => {
            dispatch(deleteBoard(id));
          }}
        >
          <svg className={css.focusIcon} width={16} height={16}>
            <use href={`${Icon}#icon-trash-can`}></use>
          </svg>
        </button>
      </div>
    </li>
  );
}
