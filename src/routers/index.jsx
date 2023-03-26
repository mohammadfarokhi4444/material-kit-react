import { Navigate, useRoutes } from 'react-router-dom';
import RouterGuard from './RouterGuard';
import LoginPage from '../pages/LoginPage';
import Page404 from '../pages/Page404';
import DashboardAppPage from '../pages/DashboardAppPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    { path: '/', element: <Navigate to="/app/dashboard" /> },
    { path: '/app', element: <Navigate to="/app/dashboard" /> },
    {
      path: '/app',
      element: <RouterGuard />,
      children: [
        { path: 'dashboard', element: <DashboardAppPage /> },
      ],
    },
    { path: '*', element: <Page404 /> },
    { path: 'login', element: <LoginPage /> },
  ]);

  return routes;
}
