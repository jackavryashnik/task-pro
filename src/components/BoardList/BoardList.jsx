import { useTasks } from '../../redux/tasks/selectors';
import css from './BoardList.module.css';

import Board from '../Board/Board';
import { NavLink, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchOneBoard } from '../../redux/tasks/operations';

export default function BoardList({ openModal, closeModal }) {
  const { boards, selectedBoard } = useTasks();
  const dispatch = useDispatch();

  return (
    <>
      {boards.length > 0 && (
        <ul className={css.list}>
          {boards.map(({ ...board }) => {
            return (
              <NavLink
                className={css.link}
                key={board.id}
                to={`/home/${board.id}`}
                onClick={e => {
                  if (selectedBoard.id !== board.id) {
                    return dispatch(fetchOneBoard(board.id));
                  }
                  e.preventDefault();
                }}
              >
                <Board
                  board={board}
                  openModal={openModal}
                  closeModal={closeModal}
                />
              </NavLink>
            );
          })}
        </ul>
      )}
      <Navigate to={selectedBoard && selectedBoard.id} />
    </>
  );
}
