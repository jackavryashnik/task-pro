import { Button } from '../Button/Button';
import { EmailInput } from '../EmailInput/EmailInput';
import { PasswordInput } from '../PasswordInput/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import css from './LoginForm.module.css';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { login } from '../../redux/auth/operations';

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const submitForm = data => {
    dispatch(login(data))
      .unwrap()
      .then(() => {
        navigate('/home', { replace: true });
      });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className={css.form}>
      <div className={css.nav}>
        <Link to="/auth/register" className={css.link}>
          Registration
        </Link>
        <Link to="/auth/login" className={clsx(css.link, css.accentColor)}>
          Log In
        </Link>
      </div>

      <div className={css.emailField}>
        <EmailInput
          placeholder="Enter your email"
          ariaLabel="User email"
          errors={errors}
          register={register}
        />
      </div>

      <div className={css.passwordField}>
        <PasswordInput
          placeholder="Confirm a password"
          ariaLabel="User password"
          errors={errors}
          register={register}
          required={true}
        />
      </div>

      <Button type="submit">Log In Now</Button>
    </form>
  );
}
