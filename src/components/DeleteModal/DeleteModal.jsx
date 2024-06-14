import css from './DeleteModal.module.css'
import icons from '../../images/icons.svg';

import { useDispatch } from 'react-redux';
import { Button } from '../Button/Button';
import { deleteBoard } from '../../redux/tasks/operations';

export const DeleteModal = ({ closeModal, id }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className={css.container}>
      <button onClick={() => closeModal()} className={css.buttonClose} type="button" aria-label="Close">
          <svg width={18} height={18}>
            <use href={`${icons}#icon-x-close`}></use>
          </svg>
        </button>
        <p className={css.description}>Delete this board?</p>
        <div className={css.buttonContainer}>
        <Button
          type={'button'}
          onClick={() => {
            dispatch(deleteBoard(id));
            closeModal();
          }}
        >
          Yes
        </Button>
        <Button type={'button'} onClick={() => closeModal()}>
          No
        </Button>
        </div>
      </div>
    </>
  );
};
