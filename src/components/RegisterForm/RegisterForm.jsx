import { Button } from '../Button/Button';
import { EmailInput } from '../EmailInput/EmailInput';
import { PasswordInput } from '../PasswordInput/PasswordInput';
import { NameInput } from '../NameInput/NameInput';
import css from './RegisterForm.module.css';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

export default function RegisterForm() {
  const register = () => {};

  return (
    <form className={css.form}>
      <div className={css.nav}>
        <Link to="/auth/register" className={clsx(css.link, css.accentColor)}>
          Registration
        </Link>
        <Link to="/auth/login" className={css.link}>
          Log In
        </Link>
      </div>

      <div className={css.emailField}>
        <NameInput
          placeholder="Enter your name"
          ariaLabel="Your name"
          errors={null}
          register={register}
        />
      </div>

      <div className={css.emailField}>
        <EmailInput
          placeholder="Enter your email"
          ariaLabel="Your email"
          errors={null}
          register={register}
        />
      </div>

      <div className={css.passwordField}>
        <PasswordInput
          placeholder="Create a password"
          ariaLabel="Your password"
          errors={null}
          register={register}
        />
      </div>

      <Button type="submit">Register Now</Button>
    </form>
  );
}
