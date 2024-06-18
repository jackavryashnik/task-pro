import icons from '../../images/icons.svg';
import css from './Card.module.css';
import { useDispatch } from 'react-redux';
import { deleteTask, editTask } from '../../redux/tasks/operations.js';
import { DeleteModal } from '../DeleteModal/DeleteModal.jsx';
import EditCardModal from '../EditCardModal/EditCardModal.jsx';
import clsx from 'clsx';
import { useState } from 'react';
import { useTasks } from '../../redux/tasks/selectors.js';

export default function Card({
  task: { id, name, description, priority, deadline },
  openModal,
  closeModal,
  columnId,
}) {
  const [isOpenPopUp, setIsOpenPopUp] = useState(false);
  const dispatch = useDispatch();
  // const popUpRef = useRef(null);

  const { columns } = useTasks();

  const dateDeadline = new Date(deadline);

  const formatedDate = `${dateDeadline.getUTCDate()}/${(
    dateDeadline.getUTCMonth() + 1
  )
    .toString()
    .padStart(2, '0')}/${dateDeadline.getFullYear()}`;

  const cardTextDescription =
    description.length > 95
      ? description.substring(0, 95) + '...'
      : description;

  // поточна дата
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  dateDeadline.setHours(0, 0, 0, 0);

  // перевірка, чи пройшов дедлайн
  const passedDeadline = today > dateDeadline;

  // перевірка, чи поточна дата рівна дедлайну
  const isTodayDeadline = today.getTime() === dateDeadline.getTime();
  const bell = isTodayDeadline || today > dateDeadline;

  const handleClickEdit = () => {
    openModal(
      <EditCardModal
        id={id}
        name={name}
        description={description}
        priority={priority}
        deadline={deadline}
        onClose={closeModal}
      />
    );
  };

  const handleDeleteCard = () => {
    dispatch(deleteTask(id));
  };

  const getPriorityElem = () => {
    switch (priority) {
      case 'low':
        return css.elemLow;
      case 'medium':
        return css.elemMedium;
      case 'high':
        return css.elemHigh;
      default:
        return css.elemWithout;
    }
  };

  const getPriorityCircle = () => {
    switch (priority) {
      case 'low':
        return css.circleLow;
      case 'medium':
        return css.circleMedium;
      case 'high':
        return css.circleHigh;
      default:
        return css.circleWithout;
    }
  };

  const handleTogglePopUp = () => {
    setIsOpenPopUp(prev => !prev);
  };

  const handleColumnSelect = newColumnId => {
    dispatch(
      editTask({
        id,
        columnId: newColumnId,
      })
    );
    setIsOpenPopUp(false);
  };

  return (
    <li className={clsx(css.cardBody, getPriorityElem())}>
      <h4 className={css.cardTitle}>{name}</h4>
      <p className={css.cardDescription}>{cardTextDescription}</p>
      <div className={css.cardSolid}></div>
      <div className={css.cardDetals}>
        <div className={css.cardInformation}>
          <div className={css.priority}>
            <p className={css.priorityTitle}>Priority</p>
            <div className={css.priorityDetals}>
              <div
                className={clsx(css.priorityColor, getPriorityCircle())}
              ></div>
              <p className={css.priorityTipe}>{priority}</p>
            </div>
          </div>
          <div className={css.deadline}>
            <p className={css.deadlineTitle}>Deadline</p>
            <p className={css.deadlineDate}>{formatedDate}</p>
          </div>
        </div>
        <div className={css.cardButtons}>
          <button
            type="button"
            className={clsx(
              css.bell,
              bell ? css.active : '',
              passedDeadline ? css.passed : ''
            )}
          >
            <svg width={16} height={16}>
              <use href={`${icons}#icon-bell`}></use>
            </svg>
          </button>
          {columns.length > 1 && (
            <button
              type="button"
              className={css.buttonPopUp}
              onClick={handleTogglePopUp}
            >
              <svg width={16} height={16} className={css.popUpIcon}>
                <use href={`${icons}#icon-arrow-circle-broken-right`}></use>
              </svg>
            </button>
          )}
          <button
            type="button"
            className={css.button}
            onClick={handleClickEdit}
          >
            <svg width={16} height={16}>
              <use href={`${icons}#icon-pencil`}></use>
            </svg>
          </button>
          <button
            type="button"
            className={css.button}
            onClick={() =>
              openModal(
                <DeleteModal
                  closeModal={closeModal}
                  onDelete={handleDeleteCard}
                >
                  Delete this task?
                </DeleteModal>
              )
            }
          >
            <svg width={16} height={16}>
              <use href={`${icons}#icon-trash-can`}></use>
            </svg>
          </button>
        </div>
      </div>
      {isOpenPopUp && (
        <div
          className={css.popUp}
          // ref={popUpRef}
        >
          <ul className={css.popUpList}>
            {columns.length > 0 &&
              columns
                .filter(column => column.id !== columnId)
                .map(column => {
                  return (
                    <li
                      className={css.popUpItem}
                      key={column.id}
                      onClick={() => handleColumnSelect(column.id)}
                    >
                      <div className={css.popUpBox}>
                        <p className={css.textPopUp}> {column.name}</p>
                        <svg width={16} height={16} className={css.popUpIcon}>
                          <use
                            href={`${icons}#icon-arrow-circle-broken-right`}
                          ></use>
                        </svg>
                      </div>
                    </li>
                  );
                })}
          </ul>
        </div>
      )}
    </li>
  );
}
