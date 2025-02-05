import { IAppRoute } from 'src/interfaces/route.interfaces';
import { userRoutes } from 'src/routes/user.routes';
import { adminRoutes } from 'src/routes/admin.routes';
import { getToken, getUserRole } from 'src/utilities/helper';

// Generate permitted routes
export const permittedRoutes = (): IAppRoute[] | [] => {
  const token = getToken();
  const role = getUserRole({ token: token || '' });

  if (role && role === 'USER') {
    return userRoutes;
  }

  if (role && role === 'ADMIN') {
    return adminRoutes;
  }

  return [];
};
