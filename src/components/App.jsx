import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRout from './PrivateRoute/PrivateRoute';
import RestrictedRoute from './RestrictedRoute/RestrictedRoute';
import { selectIsRefreshing, selectUserTheme } from '../redux/auth/selectors';
import { Loader } from './Loader/Loader';
import { Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { getCurrentUser } from '../redux/auth/operations';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const WelcomePage = lazy(() => import('../pages/WelcomePage/WelcomePage'));
const AuthPage = lazy(() => import('../pages/AuthPage/AuthPage'));
const ScreensPage = lazy(() => import('../pages/ScreensPage/ScreensPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

const THEMES = ['light', 'dark', 'violet'];

function App() {
  const isRefreshing = useSelector(selectIsRefreshing);
  const dispatch = useDispatch();
  const theme = useSelector(selectUserTheme);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    document.body.classList.remove(...THEMES);
    if (theme) document.body.classList.add(theme);
  }, [theme]);

  return (
    <>
      {isRefreshing ? (
        <Loader />
      ) : (
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Navigate to="/welcome" />} />
            <Route
              path="/welcome"
              element={
                <RestrictedRoute
                  redirectTo="/home"
                  component={<WelcomePage />}
                />
              }
            />
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
                    component={<ScreensPage />}
                  />
                }
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      )}
      <Toaster position="top-center" />
    </>
  );
}

export default App;
