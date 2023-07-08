// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Daily View',
    path: '/dashboard/daily_view',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Weekly View',
    path: '/dashboard/weekly_view',
    icon: icon('ic_analytics')
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
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
