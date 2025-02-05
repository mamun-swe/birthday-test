import { privateRequest } from 'src/config/axios.config';

// Retrieve dashboard data
const index = async () => {
  return await privateRequest.get('api/v1/admin/dashboard');
};

export const dashboard = {
  index,
};
