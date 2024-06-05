import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import PrivateRout from './PrivateRoute/PrivateRoute';
import RestrictedRoute from './RestrictedRoute/RestrictedRoute';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const WelcomePage = lazy(() => import('../pages/WelcomePage/WelcomePage'));
const LoginForm = lazy(() => import('./LoginForm/LoginForm'));
const TaskBoard = lazy(() => import('./TaskBoard/TaskBoard'));
const RegisterForm = lazy(() => import('./RegisterForm/RegisterForm'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route
          path="/auth/login"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<LoginForm />} />
          }
        />
        <Route
          path="/auth/register"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<RegisterForm />}
            />
          }
        />
        <Route
          path="/home"
          element={<PrivateRout redirectTo="/login" component={<HomePage />} />}
        >
          <Route
            path="/home/:boardID"
            element={
              <PrivateRout redirectTo="/login" component={<TaskBoard />} />
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
