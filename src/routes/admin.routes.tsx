import { IAppRoute } from 'src/interfaces/route.interfaces';
import { DashboardLayout } from 'src/layouts/dashboard.layout';

import { Dashboard } from 'src/pages/admin/dashboard';
import { UserIndex } from 'src/pages/admin/users';
import { UserEdit } from 'src/pages/admin/users/edit';

export const adminRoutes: IAppRoute[] = [
  {
    path: 'admin',
    title: 'admin',
    in_drawer: false,
    multi_menu: true,
    element: <DashboardLayout />,
    children: [
      {
        path: 'dashboard',
        title: 'dashboard',
        in_drawer: true,
        element: <Dashboard />,
      },
      {
        path: 'users',
        title: 'All Users',
        in_drawer: true,
        element: <UserIndex />,
      },
      {
        path: 'users/:id/edit',
        title: 'edit user',
        in_drawer: false,
        element: <UserEdit />,
      },
    ],
  },
];
