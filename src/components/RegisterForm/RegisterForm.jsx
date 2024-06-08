import { Button } from '../Button/Button';
import { EmailInput } from '../EmailInput/EmailInput';
import { PasswordInput } from '../PasswordInput/PasswordInput';
import { NameInput } from '../NameInput/NameInput';
import css from './RegisterForm.module.css';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { register as authRegister } from '../../redux/auth/operations';
import { useDispatch } from 'react-redux';

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = data => {
    dispatch(authRegister(data))
      .unwrap()
      .then(() => {
        navigate('/home', { replace: true });
      });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className={css.form}>
      <div className={css.nav}>
        <Link to="/auth/register" className={clsx(css.link, css.accentColor)}>
          Registration
        </Link>
        <Link to="/auth/login" className={css.link}>
          Log In
        </Link>
      </div>

      <div className={css.field}>
        <NameInput
          placeholder="Enter your name"
          ariaLabel="Your name"
          errors={errors}
          register={register}
        />
      </div>

      <div className={css.field}>
        <EmailInput
          placeholder="Enter your email"
          ariaLabel="Your email"
          errors={errors}
          register={register}
        />
      </div>

      <div className={css.lastField}>
        <PasswordInput
          placeholder="Create a password"
          ariaLabel="Your password"
          errors={errors}
          register={register}
        />
      </div>

      <Button type="submit">Register Now</Button>
    </form>
  );
}
