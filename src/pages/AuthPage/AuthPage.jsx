import { useParams } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import css from './AuthPage.module.css';

export default function AuthPage() {
  const { authType } = useParams();

  if (authType !== 'login' && authType !== 'register') {
    return <NotFoundPage />;
  }

  return (
    <div className={css.authPageContainer}>
      {authType === 'login' ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}
