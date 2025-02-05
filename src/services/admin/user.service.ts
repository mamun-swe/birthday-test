import { privateRequest } from 'src/config/axios.config';
import { IUserUpdate } from 'src/interfaces/admin/user.interface';

// Retrieve all users
const index = async ({ page }: { page: number }) => {
  return await privateRequest.get('api/v1/admin/users', { params: { page } });
};

// Show user
const show = async (id: number) => {
  return await privateRequest.get(`api/v1/admin/users/${id}`);
};

// Update user
const update = async ({ id, data }: { id: number; data: IUserUpdate }) => {
  return await privateRequest.put(`api/v1/admin/users/${id}`, data);
};

export const user = {
  index,
  show,
  update,
};
