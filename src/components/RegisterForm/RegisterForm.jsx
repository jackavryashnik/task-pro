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
import { GoogleButton } from '../GoogleButton/GoogleButton';
import toast, { Toaster } from 'react-hot-toast';

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
        toast.success('Success register');
        navigate('/home', { replace: true });
      })
      .catch(() => toast.error(`Email already registered`));
  };

  const handleRegisterClick = () => {
    console.log('Register with Google button clicked');
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
          className={css.color}
        />
      </div>

      <div className={css.field}>
        <EmailInput
          placeholder="Enter your email"
          ariaLabel="Your email"
          errors={errors}
          register={register}
          className={css.color}
        />
      </div>

      <div className={css.lastField}>
        <PasswordInput
          placeholder="Create a password"
          ariaLabel="Your password"
          errors={errors}
          register={register}
          required={true}
          className={css.color}
        />
      </div>

      <Button type="submit">Register Now</Button>
      <div className={css.spacer}>Or</div>
      <GoogleButton text="Register with Google" onClick={handleRegisterClick} />

      <Toaster position="top-center" />
    </form>
  );
}
