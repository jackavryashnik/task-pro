import { useDispatch } from 'react-redux';
import Icon from '../../images/icons.svg';
import css from './Board.module.css';
import { fetchOneBoard } from '../../redux/tasks/operations';
import CreateBoard from '../CreateBoard/CreateBoard';
import { useEffect, useState } from 'react';

import { useTasks } from '../../redux/tasks/selectors';
import { DeleteModal } from '../DeleteModal/DeleteModal';

export default function Board({
  board: { name, icon, id },
  openModal,
  closeModal,
}) {
  const [isEdit, setIsEdit] = useState(true);
  const dispatch = useDispatch();
  const { selectedBoard, boards } = useTasks();

  localStorage.setItem('activeBoardId', selectedBoard.id);
  const activeBoardId = localStorage.getItem('activeBoardId');

  const handleClick = () => {
    setIsEdit(false);
    openModal(
      <CreateBoard isEdit={isEdit} setter={setIsEdit} onClose={closeModal} />
    );
  };

  const handleDelete = () => {
    const index = boards.findIndex(board => board.id === id);
    const nextIndex = index === boards.length - 1 ? index - 1 : index + 1;
    const nextBoard = boards[nextIndex];
    dispatch(deleteBoard(id));
    dispatch(fetchOneBoard(nextBoard.id));
  };
  useEffect(() => {
    if (activeBoardId) {
      const activeElement = document.getElementById(activeBoardId);
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [activeBoardId]);

  return (
    <li
      className={`${css.item} ${id === activeBoardId ? css.active : ''}`}
      onClick={() => dispatch(fetchOneBoard(id))}
    >
      <div className={css.containerBoard}>
        <svg className={css.icon} width={18} height={18}>
          <use href={Icon + icon}></use>
        </svg>
        <p className={css.text}>{name}</p>
      </div>

      {id === activeBoardId && (
        <div className={css.containerIcons}>
          <button type="button" className={css.btn} onClick={handleClick}>
            <svg className={css.focusIcon} width={16} height={16}>
              <use href={`${Icon}#icon-pencil`}></use>
            </svg>
          </button>

          <button type="button" className={css.btn} onClick={handleDelete}>
            <svg className={css.focusIcon} width={16} height={16}>
              <use href={`${Icon}#icon-trash-can`}></use>
            </svg>
          </button>
        </div>
      )}
    </li>
  );
}
