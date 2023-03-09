// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  // {
  //   title: 'user',
  //   path: '/dashboard/user',
  //   icon: icon('ic_user'),
  // },
  {
    title: 'chat',
    path: '/chat',
    icon: icon('ic_blog'),
  },
  // {
  //   title: 'kids messenger',
  //   path: '/messenger',
  //   icon: icon('ic_blog'),
  // },
  {
    title: 'add friend',
    path: '/addfriend',
    icon: icon('ic_blog'),
  },
  // {
  //   title: 'add Image',
  //   path: '/addimage',
  //   icon: icon('ic_disabled'),
  // },
 // How do I change icon to camera?
  {
    title: 'set avatar',
    path: '/setavatar',
    icon: icon('ic_user'),
  },
  {
    title: 'Logout',
    path: '/logout',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
