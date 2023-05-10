import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import UserPage from './pages/UserPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';

//
//import SetAvatar from "./components/SetAvatar";
//import { useAuthContext } from "./hooks/useAuthContext";


// pages & components

import FileUpload from "./components/FileUpload";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/ChatRoom";
import Messenger from "./pages/Messenger";
import Settings from "./pages/Settings"
import AddFriend from "./pages/AddFriend"
import SetAvatar from "./pages/SetAvatarPage";
import WebcamCapture from './components/WebcamCapture';
import MessageForm from './components/MessageForm';
import Splash from './components/Splash';
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
      path: '*',
      element: <Navigate to="/splash" replace />,
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
      path: "/chat",
      // element={!user ? <Navigate to = "/" />: <Messenger /> }
      element: <Chat />,
    },
    {
      path: "/messenger",
      // element={!user ? <Navigate to = "/" />: <Messenger /> }
      element: <Messenger />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/addfriend",
      element: <AddFriend />,
    },
    {
      path: "/addImage",
      element: <WebcamCapture />,
    },
    {
      path: "/addChild",
      element: <MessageForm />,
    },
    {
      path: "/settings",
      element: <Settings />,
    },
    {
      path: "/splash",
      element: <Splash />,
    },
  ]);

  return routes;
}
