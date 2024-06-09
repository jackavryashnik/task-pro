import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import PrivateRout from './PrivateRoute/PrivateRoute';
import RestrictedRoute from './RestrictedRoute/RestrictedRoute';
import { selectIsRefreshing } from '../redux/auth/selectors';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const WelcomePage = lazy(() => import('../pages/WelcomePage/WelcomePage'));
const AuthPage = lazy(() => import('../pages/AuthPage/AuthPage'));
const TaskBoard = lazy(() => import('./TaskBoard/TaskBoard'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

function App() {
  const isRefreshing = useSelector(selectIsRefreshing);

  return (
    <>
      {isRefreshing ? (
        <p>Loading...</p>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
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
                <PrivateRout
                  redirectTo="/welcome"
                  component={<HomePage />}
                />
              }
            >
              <Route
                path="/home/:boardID"
                element={
                  <PrivateRout redirectTo="/welcome" component={<TaskBoard />} />
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
