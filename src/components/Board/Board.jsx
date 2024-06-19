import { useDispatch, useSelector } from 'react-redux';
import Icon from '../../images/icons.svg';
import css from './Board.module.css';
import { deleteBoard, fetchOneBoard } from '../../redux/tasks/operations';
import CreateBoard from '../CreateBoard/CreateBoard';
import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { selectNextBoard, useTasks } from '../../redux/tasks/selectors';
import { DeleteModal } from '../DeleteModal/DeleteModal';

export default function Board({
  board: { name, icon, id },
  openModal,
  closeModal,
  setIsEdit,
}) {
  const nextBoard = useSelector(selectNextBoard);

  const dispatch = useDispatch();
  const { activeBoardId, boards } = useTasks();
  const { boardID } = useParams();

  useEffect(() => {
    if (activeBoardId) {
      const activeElement = document.getElementById(activeBoardId);
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [activeBoardId]);

  const handleClick = () => {
    setIsEdit(true);
    openModal(
      <CreateBoard isEdit={true} setIsEdit={setIsEdit} onClose={closeModal} />
    );
  };

  const handleDeleteBoard = id => {
    dispatch(deleteBoard(id));
    if (boards.length > 1) {
      if (nextBoard) {
        dispatch(fetchOneBoard(nextBoard.id));
      }
    } else if (boards.length === 0) {
      dispatch(fetchOneBoard(boards[0].id));
    } else {
      return;
    }
  };

  return (
    <li
      className={`${css.item} ${id === activeBoardId ? css.active : ''}`}
      id={id}
    >
      <NavLink
        className={css.link}
        to={`/home/${id}`}
        onClick={e => {
          if (activeBoardId !== id) {
            return dispatch(fetchOneBoard(id));
          }
          e.preventDefault();
        }}
      >
        <div className={css.containerBoard}>
          <div className={css.containerContent}>
            <svg className={css.icon} width={18} height={18}>
              <use href={Icon + icon}></use>
            </svg>
            <p className={css.text}>
              {name.length > 14 ? `${name.slice(0, 14)}...` : name}
            </p>
          </div>

          {id === activeBoardId && (
            <div className={css.containerIcons}>
              <button type="button" className={css.btn} onClick={handleClick}>
                <svg className={css.focusIcon} width={16} height={16}>
                  <use href={`${Icon}#icon-pencil`}></use>
                </svg>
              </button>

              <button
                type="button"
                className={css.btn}
                onClick={() =>
                  openModal(
                    <DeleteModal
                      closeModal={closeModal}
                      id={boardID}
                      onDelete={() => handleDeleteBoard(boardID)}
                    >
                      Delete this board?
                    </DeleteModal>
                  )
                }
              >
                <svg className={css.focusIcon} width={16} height={16}>
                  <use href={`${Icon}#icon-trash-can`}></use>
                </svg>
              </button>
            </div>
          )}
        </div>
      </NavLink>
    </li>
  );
}
