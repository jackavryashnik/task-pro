import css from './DeleteModal.module.css';
import icons from '../../images/icons.svg';

import { Button } from '../Button/Button';
import toast from 'react-hot-toast';

export const DeleteModal = ({ closeModal, onDelete, children }) => {
  const handleDelete = async () => {
    try {
      await onDelete();
      toast.success('Successfully deleted');
      setTimeout(() => {
        closeModal();
      }, 500);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`Error: ${errorMessage}`);
    }
  };
  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <div className={css.descriptionContainer}>
          <p className={css.description}>{children}</p>
          <button
            onClick={() => closeModal()}
            className={css.buttonClose}
            type="button"
            aria-label="Close"
          >
            <div className={css.iconContainer}>
              <svg width={18} height={18}>
                <use href={`${icons}#icon-x-close`}></use>
              </svg>
            </div>
          </button>
        </div>
        <div className={css.buttonContainer}>
          <Button
            className={css.button}
            type={'button'}
            onClick={() => {

              onDelete();
              toast.success('Successfully deleted');

              setTimeout(() => {
                closeModal();
              }, 500);
            }}
          >
            Yes
          </Button>
          <Button
            className={css.button}
            type={'button'}
            onClick={handleDelete}
          >
            No
          </Button>
        </div>
      </div>
    </div>
  );
};
