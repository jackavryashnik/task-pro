import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { needHelp } from '../../redux/auth/operations';
import { selectUserEmail } from '../../redux/auth/selectors';
import { Button } from '../Button/Button';
import { toast } from 'react-hot-toast';
import icons from '../../images/icons.svg';
import css from './NeedHelp.module.css';

export default function NeedHelp({ closeModal }) {
  const userEmail = useSelector(selectUserEmail);
  // const token = useSelector(selectToken);
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (userEmail) {
      setEmail(userEmail);
    }
  }, [userEmail]);

  const validateEmail = email => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    let hasError = false;

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      hasError = true;
    }

    if (!comment.trim()) {
      toast.error('Please enter a comment');
      hasError = true;
    }

    if (!hasError) {
      try {
        await dispatch(needHelp({ email, comment }));
        toast.success('Your request has been sent successfully');
        setEmail('');
        setComment('');
        closeModal();
      } catch (error) {
        const errorMessage = error.response.data.message || error.message;
        toast.error(`Error: ${errorMessage}`);
      }
    }
  };

  return (
    <div className={css.needHelpBlock}>
      <h3 className={css.modalTitle}>Need help</h3>
      <div className={css.closeModal}>
        <button type="button" onClick={() => closeModal()}>
          <svg width={18} height={18}>
            <use href={`${icons}#icon-x-close`}></use>
          </svg>
        </button>
      </div>
      <form className={css.inputForm} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          autoComplete="off"
          onChange={event => setEmail(event.target.value)}
          className={css.inputCardTitle}
          required
        />
        <textarea
          type="text"
          placeholder="Comment"
          value={comment}
          autoComplete='off'
          onChange={event => setComment(event.target.value)}
          className={css.inputCardDescription}
          required
          autoFocus
        />
        <Button className={css.needHelpButton} type="submit">
          Send
        </Button>
      </form>
    </div>
  );
}
