import { privateRequest } from 'src/config/axios.config';

// Retrieve all roles
const index = async () => {
  return await privateRequest.get('api/v1/admin/role');
};

// Create new role
const create = async (data: any) => {
  return await privateRequest.post('api/v1/admin/role', data);
};

// Show role
const show = async (id: number) => {
  return await privateRequest.get(`api/v1/admin/role/${id}`);
};

// Update role
const update = async (id: number, data: any) => {
  return await privateRequest.put(`api/v1/admin/role/${id}`, data);
};

// Delete role
const destroy = async (id: number) => {
  return await privateRequest.delete(`api/v1/admin/role/${id}`);
};

export const role = {
  index,
  create,
  show,
  update,
  destroy,
};
