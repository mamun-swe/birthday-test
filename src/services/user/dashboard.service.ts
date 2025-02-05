import { privateRequest } from 'src/config/axios.config';

// Retrieve dashboard data
const index = async ({ page }: { page: number }) => {
  return await privateRequest.get('api/v1/user/dashboard', {
    params: { page },
  });
};

export const dashboard = {
  index,
};
