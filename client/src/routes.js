import { Navigate, useRoutes, useNavigate } from 'react-router-dom';
import React, { useEffect } from "react";
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
// pages & components
import UserPage from './pages/UserPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import CreateChild from "./pages/CreateChild";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/ChatRoom";
import Settings from "./pages/Settings"
import AddFriend from "./pages/AddFriend"
import SetAvatar from "./pages/SetAvatarPage";
import Splash from './components/Splash';
//

// ----------------------------------------------------------------------

export default function Router() {
  const adult_or_child = JSON.parse(
    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  );

  const isParent = adult_or_child && !adult_or_child.parentLink;
  const isChild = adult_or_child && adult_or_child.parentLink;
  const isLogin = adult_or_child?.isLogin;
  console.log("Login user is", isLogin)

  const navigate = useNavigate();

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: isParent && isLogin === true ? <DashboardLayout /> : (isChild && isLogin === true ) ? <Navigate to="/chat" /> : <Navigate to="/splash" />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
      ],
    },
    {
      path: '*',
      element: adult_or_child !== null ? (
        isParent && isLogin ? (
          <Navigate to="/dashboard" />
        ) : (
          isChild && isLogin ? (
            <Navigate to="/chat" />
          ) : (
            <Navigate to="/splash" />
          )
        )
      ) : (
        <Navigate to="/splash" />
      ),
    },
    {
      path: '/chat',
      element: adult_or_child && isLogin ? <Chat /> : <Navigate to="/splash" />,
    },
    // {
    //   path: "/messenger",
    //   // element={!user ? <Navigate to = "/" />: <Messenger /> }
    //   element: <Messenger />,
    // },
    {
      path: "/addfriend",
      element: adult_or_child && isLogin ? <AddFriend /> : <Navigate to="/splash" />,
    },
    {
      path: "/addchild",
      element: isParent && isLogin ? <CreateChild /> : <Navigate to="/splash" />,
    },
    {
      path: "/setAvatar",
      // element={!user ? <Navigate to = "/" />: <Messenger /> }
      element: adult_or_child && isLogin ? <SetAvatar /> : <Navigate to="/splash" />,
    },
    {
      path: "/settings",
      element: isParent && isLogin ? <Settings /> : <Navigate to="/splash" />,
    },
    // {
    //   path: "/uploads",
    //   element: <FileUpload />,
    // },
    // {
    //   path: "/addImage",
    //   element: <WebcamCapture />,
    // },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/splash",
      element: <Splash />,
    },
  ]);

  return routes;
}
