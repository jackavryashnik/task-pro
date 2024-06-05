import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsRefreshing } from '../../redux/auth/selectors';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  return !isLoggedIn && !isRefreshing ? <Navigate to={redirectTo} /> : Component;
};

export default PrivateRoute;
