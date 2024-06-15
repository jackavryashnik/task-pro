import css from './DeleteModal.module.css';
import icons from '../../images/icons.svg';

import { useDispatch } from 'react-redux';
import { Button } from '../Button/Button';
import { deleteBoard } from '../../redux/tasks/operations';

import toast, { Toaster } from 'react-hot-toast';

export const DeleteModal = ({ closeModal, id, handleDelete }) => {
  const dispatch = useDispatch();
  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <button
          onClick={() => closeModal()}
          className={css.buttonClose}
          type="button"
          aria-label="Close"
        >
          <svg width={18} height={18}>
            <use href={`${icons}#icon-x-close`}></use>
          </svg>
        </button>
        <p className={css.description}>Are you sure?</p>
        <div className={css.buttonContainer}>
          <Button
            type={'button'}
            onClick={() => {
              handleDelete();
              toast.success('Success');

              setTimeout(() => {
                closeModal();
              }, 500);
            }}
          >
            Yes
          </Button>
          <Button type={'button'} onClick={() => closeModal()}>
            No
          </Button>
        </div>

        <Toaster position="top-center" />
      </div>
    </div>
  );
};
