import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isActiveRoute } from 'src/utilities/helper';
import { PrimaryButton } from 'src/components/button';
import { permittedRoutes } from 'src/routes/private.routes';

export const SidebarMenu: FC = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const routes = permittedRoutes()[0].children;

  const defaultClass =
    'w-full !text-left !px-4 !font-medium !capitalize !text-sm !py-3 !bg-themeblack !text-white hover:!bg-primary hover:!text-black';
  const activeClass =
    'w-full !font-medium !text-left !px-4 !capitalize !text-sm !py-3';

  // handle route change
  const handleRouteChange = (path: string) => {
    navigate(path);
  };

  // handle logout
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="w-full space-y-2">
      {routes && routes.length > 0
        ? routes.map(
            (route, index: number) =>
              route.in_drawer && (
                <PrimaryButton
                  key={index}
                  type="button"
                  className={
                    isActiveRoute({
                      current_path: location.pathname,
                      path: route.path,
                    })
                      ? activeClass
                      : defaultClass
                  }
                  onClick={() => handleRouteChange(route.path)}
                >
                  {route.title}
                </PrimaryButton>
              ),
          )
        : null}
      <PrimaryButton
        type="button"
        className={defaultClass}
        onClick={handleLogout}
      >
        Logout
      </PrimaryButton>
    </div>
  );
};
