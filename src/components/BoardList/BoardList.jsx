import { useTasks } from '../../redux/tasks/selectors';
import css from './BoardList.module.css';

import Board from '../Board/Board';
import { NavLink } from 'react-router-dom';

export default function BoardList({ openModal, closeModal }) {
  const { boards } = useTasks();

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
    </>
  );
}
