import icons from '../../images/icons.svg';
import css from './Card.module.css';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../redux/tasks/operations.js';
import { DeleteModal } from '../DeleteModal/DeleteModal.jsx';
import EditCardModal from '../EditCardModal/EditCardModal.jsx';

export default function Card({
  task: { id, name, description, priority, deadline },
  openModal,
  closeModal,
}) {
  const dispatch = useDispatch();
  const dateDeadline = new Date(deadline);
  const formatedDate = `${dateDeadline.getUTCDate()}/${(
    dateDeadline.getUTCMonth() + 1
  )
    .toString()
    .padStart(2, '0')}/${dateDeadline.getFullYear()}`;
  const cardTextDescription = description.substring(0, 90) + '...';

  const bell = new Date() > dateDeadline;

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

  // const hendleMoveCardModalOpen = () => {
  //   setIsOpenMoveCardModal(true);
  // };

  // const hendleMoveCardModalClose = () => {
  //   setIsOpenMoveCardModal(false);
  // };

  return (
    <li className={css.cardBody}>
      <div className={css.cardColor}></div>
      <h2 className={css.cardTitle}>{name}</h2>
      <p className={css.cardDescription}>{cardTextDescription}</p>
      <div className={css.cardSolid}></div>
      <div className={css.cardDetals}>
        <div className={css.cardInformation}>
          <div className={css.priority}>
            <p className={css.priorityTitle}>Priority</p>
            <div className={css.priorityDetals}>
              <div className={css.priorityColor}></div>
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
            className={`${css.bell} ${bell ? css.active : ''}`}
          >
            <svg width={16} height={16}>
              <use href={`${icons}#icon-bell`}></use>
            </svg>
          </button>
          <button
            type="button"
            className={css.button}
            // onClick={hendleMoveCardModalOpen}
          >
            <svg width={16} height={16}>
              <use href={`${icons}#icon-arrow-circle-broken-right`}></use>
            </svg>
          </button>
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
      {/* <Modal
        isOpen={isOpenMoveCardModal}
        onRequestClose={hendleMoveCardModalClose}
        className={'modal-content'}
        overlayClassName={'modal-overlay'}
      >
        <MoveCardDropdown currColumnId={columnId} cardId={cardId} />
      </Modal> */}
    </li>
  );
}
