import { IAppRoute } from 'src/interfaces/route.interfaces';
import { DashboardLayout } from 'src/layouts/dashboard.layout';

import { Dashboard } from 'src/pages/users/dashboard';
import { CreateContact } from 'src/pages/users/contacts/create';
import { EditContact } from 'src/pages/users/contacts/edit';
import { Profile } from 'src/pages/users/profile';
import { ChangePassword } from 'src/pages/users/change-password';

export const userRoutes: IAppRoute[] = [
  {
    path: 'user',
    title: 'user',
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
        path: 'contact-create',
        title: 'Add Contacts',
        in_drawer: true,
        element: <CreateContact />,
      },
      {
        path: 'contact-edit/:id',
        title: 'Edit Contacts',
        in_drawer: false,
        element: <EditContact />,
      },
      {
        path: 'profile',
        title: 'profile',
        in_drawer: true,
        element: <Profile />,
      },
      {
        path: 'change-password',
        title: 'change password',
        in_drawer: true,
        element: <ChangePassword />,
      },
    ],
  },
];
