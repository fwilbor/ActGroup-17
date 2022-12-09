import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import UserPage from './pages/UserPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';

//
import SetAvatar from "./components/SetAvatar";
//import { useAuthContext } from "./hooks/useAuthContext";


// pages & components

import FileUpload from "./components/FileUpload";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Messenger";
//

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: "/setAvatar",
      // element={!user ? <Navigate to = "/" />: <Messenger /> }
      element: <SetAvatar />,
    },
    {
      path: "/addchild",
      element: <Home />,
    },
    {
      path: "/uploads",
      element: <FileUpload />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/messenger",
      // element={!user ? <Navigate to = "/" />: <Messenger /> }
      element: <Chat />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);

  return routes;
}
