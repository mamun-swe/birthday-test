import { FC } from 'react';
import { Toaster } from 'react-hot-toast';
import { useRoutes } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import { ScrollToTop } from 'src/hooks/scroll-to-top';
import { publicRoutes } from 'src/routes/public.routes';
import { permittedRoutes } from 'src/routes/private.routes';
import { AppVersion } from 'src/components/app-version';

export const App: FC = (): JSX.Element => {
  const routes = useRoutes([...publicRoutes, ...permittedRoutes()]);

  return (
    <Fragment>
      <ScrollToTop />
      <Toaster position="top-center" />
      <AppVersion />
      {routes}
    </Fragment>
  );
};
