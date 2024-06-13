import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PrivateRout from './PrivateRoute/PrivateRoute';
import RestrictedRoute from './RestrictedRoute/RestrictedRoute';
import { selectIsRefreshing, selectUserTheme } from '../redux/auth/selectors';
import { Loader } from './Loader/Loader';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const WelcomePage = lazy(() => import('../pages/WelcomePage/WelcomePage'));
const AuthPage = lazy(() => import('../pages/AuthPage/AuthPage'));
const TaskBoard = lazy(() => import('./TaskBoard/TaskBoard'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

const THEMES = ['light', 'dark', 'violet'];

function App() {
  const isRefreshing = useSelector(selectIsRefreshing);
  const theme = useSelector(selectUserTheme);

  useEffect(() => {
    document.body.classList.remove(...THEMES);
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <>
      {isRefreshing ? (
        <Loader />
      ) : (
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<RestrictedRoute redirectTo="/home" component={<WelcomePage />} />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route
              path="/auth/:authType"
              element={
                <RestrictedRoute redirectTo="/home" component={<AuthPage />} />
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRout redirectTo="/welcome" component={<HomePage />} />
              }
            >
              <Route
                path="/home/:boardID"
                element={
                  <PrivateRout
                    redirectTo="/welcome"
                    component={<TaskBoard />}
                  />
                }
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      )}
    </>
  );
}

export default App;
