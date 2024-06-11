import icons from '../../images/icons.svg';
import Modal from 'react-modal';
import { useState } from 'react';
import css from './Card.module.css'; 
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../redux/tasks/operations.js';
import EditCardModal from '../EditCardModal/EditCardModal';
import { MoveCardDropdown } from '../MoveCardDropdown/MoveCardDropdown';

export default function Card({ card }) {
  const [modalCardIsOpen, setmodalCardIsOpen] = useState(false);
  const [isOpenMoveCardModal, setIsOpenMoveCardModal] = useState(false);
  const dispatch = useDispatch();
  const {
    _id: cardId,
    title,
    text,
    deadline,
    priority,
    column: { _id: columnId },
  } = card;
  const dateDeadline = new Date(deadline);
  const formatedDate = `${dateDeadline.getUTCDate()}/${(
    dateDeadline.getUTCMonth() + 1
  )
    .toString()
    .padStart(2, '0')}/${dateDeadline.getFullYear()}`;
  const cardTextDescription = text.substring(0, 90) + '...';

  const bell = new Date() > dateDeadline;
  
  const openCardModal = () => {
    setmodalCardIsOpen(true);
  };

  const closeCardModal = () => {
    setmodalCardIsOpen(false);
  };

  const handleDeleteCard = () => {
    dispatch(deleteTask({ cardId }));
  };

  const hendleMoveCardModalOpen = () => {
    setIsOpenMoveCardModal(true);
  };

  const hendleMoveCardModalClose = () => {
    setIsOpenMoveCardModal(false);
  };

  return (
    <li className={css.cardBody}>
      <div className={css.cardColor}></div>
      <h2 className={css.cardTitle}>{title}</h2>
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
          <button type="button" className={`${css.bell} ${bell ? css.active : ''}`}>
             <svg
             width={16}
             height={16}>
                 <use href={`${icons}#icon-bell`}></use> 
             </svg> 
          </button>
          <button type="button" className={css.button} onClick={hendleMoveCardModalOpen}>
             <svg
             width={16}
             height={16}>
                 <use href={`${icons}#icon-arrow-circle-broken-right`}></use> 
             </svg>
          </button>
          <button type="button" className={css.button} onClick={openCardModal}>
             <svg
             width={16}
             height={16}>
                 <use href={`${icons}#icon-pencil`}></use> 
             </svg>
          </button>
          <button type="button" className={css.button} onClick={handleDeleteCard}>
             <svg
             width={16}
             height={16}>
                 <use href={`${icons}#icon-trash-can`}></use> 
             </svg> 
          </button>
        </div>
      </div>
      <Modal
        isOpen={modalCardIsOpen}
        onRequestClose={closeCardModal}
        className={'modal-content'}
        overlayClassName={'modal-overlay'}
      >
        <EditCardModal card={card} onClose={closeCardModal} />
      </Modal>
      <Modal
        isOpen={isOpenMoveCardModal}
        onRequestClose={hendleMoveCardModalClose}
        className={'modal-content'}
        overlayClassName={'modal-overlay'}
      >
        <MoveCardDropdown currColumnId={columnId} cardId={cardId} />
      </Modal>
    </li>
  );
}
