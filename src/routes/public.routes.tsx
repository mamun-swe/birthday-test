import { Navigate } from 'react-router-dom';
import { IAppRoute } from 'src/interfaces/route.interfaces';
import { MainLayout } from 'src/layouts/main.layout';

import { Login } from 'src/pages/auth/login';
import { Register } from 'src/pages/auth/register';
import { ForgotPassword } from 'src/pages/auth/forgot-password';
import { OTPVerification } from 'src/pages/auth/otp-verification';
import { SetPassword } from 'src/pages/auth/set-password';

export const publicRoutes: IAppRoute[] = [
  {
    path: '',
    title: '',
    in_drawer: false,
    element: <MainLayout />,
    multi_menu: false,
    children: [
      {
        path: '*',
        title: '',
        in_drawer: false,
        element: <Navigate to="/" />,
      },
      {
        path: '',
        title: '',
        in_drawer: false,
        element: <Login />,
      },
      {
        path: 'forgot-password',
        title: '',
        in_drawer: false,
        element: <ForgotPassword />,
      },
      {
        path: 'otp-verification',
        title: '',
        in_drawer: false,
        element: <OTPVerification />,
      },
      {
        path: 'otp-verification',
        title: '',
        in_drawer: false,
        element: <ForgotPassword />,
      },
      {
        path: 'set-password',
        title: '',
        in_drawer: false,
        element: <SetPassword />,
      },
      {
        path: 'register',
        title: '',
        in_drawer: false,
        element: <Register />,
      },
    ],
  },
];
