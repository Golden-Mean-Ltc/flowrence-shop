import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  // const { isAuthenticated } = useAuth();

  const { isAuthenticated } = useSelector((state) => state.auth);

  // return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' replace />;
};
export default PrivateRoute;