import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

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
          <Route path="/auth" element={<WelcomePage />} />
          <Route path="/auth/login" element={<LoginForm />} />
          <Route path="/auth/register" element={<RegisterForm />} />
          <Route path="/home" element={<HomePage />} >
            <Route path="/home/:boardID" element={<TaskBoard />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
  );
}

export default App;