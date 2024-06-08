import { Button } from '../Button/Button';
import { EmailInput } from '../EmailInput/EmailInput';
import { PasswordInput } from '../PasswordInput/PasswordInput';
import { Link } from 'react-router-dom';
import css from './LoginForm.module.css';
import clsx from 'clsx';

export default function LoginForm() {
  const register = () => {};

  return (
    <form className={css.form}>
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
          errors={null}
          register={register}
        />
      </div>

      <div className={css.passwordField}>
        <PasswordInput
          placeholder="Confirm a password"
          ariaLabel="User password"
          errors={null}
          register={register}
        />
      </div>

      <Button type="submit">Log In Now</Button>
    </form>
  );
}
