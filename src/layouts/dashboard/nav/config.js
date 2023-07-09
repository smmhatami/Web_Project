// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;
const icon1 = (name) => <SvgColor src={`/assets/icons/navbar/${name}.png`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Daily View',
    path: '/dashboard/daily_view',
    // icon: icon1('daily'),
  },
  {
    title: 'Weekly View',
    path: '/dashboard/weekly_view',
    // icon: icon1('7-days')
  },
  {
    title:'Monthly View',
    path: '/dashboard/monthly_view',
    icon: icon('ic_analytics')
  },
  {
    title: 'My Bookings',
    path: '/dashboard/my_bookings',
    icon: icon()
  },
  {
    title: 'Search Room',
    path: '/dashboard/search_room',
    icon: icon()
  },
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'User',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Product',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  // {
  //   title: 'Login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  {
    title: 'Sign Up',
    path: '/sign_up',
    icon: icon('ic_lock'),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
