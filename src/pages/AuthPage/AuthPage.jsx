import { useParams } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

export default function AuthPage() {
  const {authType} = useParams();

  if (authType !== 'login' && authType !== 'register') {
    return <NotFoundPage />
  } 

  return <div>{authType === 'login' ? <LoginForm /> : <RegisterForm />}</div>
}