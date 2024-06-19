import { useTasks } from '../../redux/tasks/selectors';
import css from './BoardList.module.css';

import Board from '../Board/Board';
import { Navigate } from 'react-router-dom';

export default function BoardList({
  openModal,
  closeModal,
  isEdit,
  setIsEdit,
}) {
  const { boards, selectedBoard } = useTasks();

  // if (!selectedBoard) return <></>;

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
                isEdit={isEdit}
                setIsEdit={setIsEdit}
              />
            );
          })}
        </ul>
      )}
      <Navigate to={selectedBoard && selectedBoard.id} />
    </>
  );
}
