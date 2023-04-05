import Transactions from './views/Transactions/Transactions';

var routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'fa-solid fa-house',
    component: Transactions,
    layout: '/holoni',
  },
  {
    path: '/simulator',
    name: 'Simulator and Tools',
    icon: 'fa-solid fa-screwdriver-wrench',
    component: Transactions,
    layout: '/holoni',
  },
  {
    redirect: false,
    collapse: true,
    name: 'Campaigns',
    icon: 'fa-solid fa-person-burst',
    views: [
      {
        path: '/campaign/new',
        name: 'Create Campaign',
        miniName: '',
        component: Transactions,
        layout: '/holoni',
      },
      {
        path: '/campaigns',
        name: 'Ongoing Campaigns',
        component: Transactions,
        layout: '/holoni',
      },
    ],
  },
  {
    path: '/attestations',
    name: 'Attestations',
    icon: 'fa-solid fa-file-certificate',
    component: Transactions,
    layout: '/holoni',
  },
  {
    path: '/rewards',
    name: 'Rewards',
    icon: 'fa-solid fa-money-bill',
    component: Transactions,
    layout: '/holoni',
  },
  {
    path: '/transactions',
    name: 'Transactions',
    icon: 'fa-solid fa-arrow-right-arrow-left',
    component: Transactions,
    layout: '/holoni',
  },
  {
    path: '/news',
    name: 'News and Shared Insight',
    icon: 'fa-solid fa-newspaper',
    component: Transactions,
    layout: '/holoni',
  },

  {
    path: '/login',
    name: 'Login',
    icon: 'ni ni-key-25 text-info',
    component: Transactions,
    layout: '/auth',
  },
  {
    path: '/signup',
    name: 'SignUp',
    icon: 'ni ni-key-25 text-info',
    component: Transactions,
    layout: '/auth',
  },
  {
    path: '/forgotpass',
    name: 'ForgotPassword',
    icon: 'ni ni-key-25 text-info',
    component: Transactions,
    layout: '/auth',
  },
];
export default routes;
