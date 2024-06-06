import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
// import PrivateRout from './PrivateRoute/PrivateRoute';
// import RestrictedRoute from './RestrictedRoute/RestrictedRoute';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const WelcomePage = lazy(() => import('../pages/WelcomePage/WelcomePage'));
const LoginForm = lazy(() => import('./LoginForm/LoginForm'));
const TaskBoard = lazy(() => import('./TaskBoard/TaskBoard'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/auth/:authType" element={<LoginForm />} />
        <Route path="/home" element={<HomePage />}>
          <Route path="/home/:boardID" element={<TaskBoard />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
