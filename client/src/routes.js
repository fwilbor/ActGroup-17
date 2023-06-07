import { Navigate, useRoutes, useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: isParent ? <DashboardLayout /> : <Navigate to="/chat" />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
      ],
    },
    {
      path: '*',
      element: isParent ? <Navigate to="/dashboard" /> : <Navigate to="/chat" />,
    },
    {
      path: '/chat',
      element: isChild ? <Chat /> : <Navigate to="/splash" />,
    },
    // {
    //   path: "/messenger",
    //   // element={!user ? <Navigate to = "/" />: <Messenger /> }
    //   element: <Messenger />,
    // },
    {
      path: "/addfriend",
      element: <AddFriend />,
    },
    {
      path: "/addchild",
      element: <CreateChild />,
    },
    {
      path: "/setAvatar",
      // element={!user ? <Navigate to = "/" />: <Messenger /> }
      element: <SetAvatar />,
    },
    {
      path: "/settings",
      element: <Settings />,
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
