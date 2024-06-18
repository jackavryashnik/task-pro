import { useParams, useSearchParams } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import css from './AuthPage.module.css';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { addTokens } from '../../redux/auth/slice';
import { getCurrentUser } from '../../redux/auth/operations';

export default function AuthPage() {
  const { authType } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  if (authType === 'google') {
    let accessToken, refreshToken;
    const accessTokenParam = searchParams.get('accessToken');
    const refreshTokenParam = searchParams.get('refreshToken');

    let isError = false;
    try {
      accessToken = accessTokenParam && JSON.parse(accessTokenParam);
      refreshToken = refreshTokenParam && JSON.parse(refreshTokenParam);
    } catch (error) {
      isError = true;
    }

    if (!isError && accessToken && refreshToken) {
      dispatch(
        addTokens({
          accessToken,
          refreshToken,
          isRefreshing: true,
        })
      );
      dispatch(getCurrentUser());
    }
    return <Navigate to="/welcome" />;
  }

  if (authType !== 'login' && authType !== 'register') {
    return <NotFoundPage />;
  }

  return (
    <div className={css.authPageContainer}>
      {authType === 'login' ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}
