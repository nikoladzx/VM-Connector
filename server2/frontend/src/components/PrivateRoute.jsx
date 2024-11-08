import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

axios.defaults.withCredentials = true;
const PrivateRoute = () => {
  const { adminInfo } = useSelector((state) => state.auth);
  return adminInfo ? <Outlet /> : <Navigate to='/login' replace />;
};
export default PrivateRoute;
