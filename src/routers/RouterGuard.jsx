import { Navigate } from 'react-router-dom';
import Layout from '../layouts/dashboard';
import useUserState from '../hooks/useUserState';

function RouterGuard() {
  const { isAuthenticated } = useUserState();
  return isAuthenticated ? <Layout /> : <Navigate replace to="/login" />;
}

export default RouterGuard;
