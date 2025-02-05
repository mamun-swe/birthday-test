import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const MainLayout: FC = (): JSX.Element => {
  return (
    <div className="container">
      <Outlet />
    </div>
  );
};
