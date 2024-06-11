import { useTasks } from '../../redux/tasks/selectors';
import css from './BoardList.module.css';

import Board from '../Board/Board';

export default function BoardList({ openModal, closeModal }) {
  const { boards } = useTasks();

  return (
    <>
      {boards.length > 0 && (
        <ul className={css.list}>
          {boards.map(({ ...board }) => {
            return (
              <Board
                key={board.id}
                board={board}
                openModal={openModal}
                closeModal={closeModal}
              />
            );
          })}
        </ul>
      )}
    </>
  );
}
