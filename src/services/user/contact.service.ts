import { privateRequest } from 'src/config/axios.config';
import { IContactCreate } from 'src/interfaces/user/contacts.interface';

// Retrieve all contacts
const index = async () => {
  return await privateRequest.get('api/v1/user/contacts');
};

// Create new contact
const create = async (data: IContactCreate) => {
  return await privateRequest.post('api/v1/user/contacts', data);
};

// Show contact
const show = async (id: number) => {
  return await privateRequest.get(`api/v1/user/contacts/${id}`);
};

// Update contact
const update = async (id: number, data: IContactCreate) => {
  return await privateRequest.put(`api/v1/user/contacts/${id}`, data);
};

// Delete contact
const destroy = async (id: number) => {
  return await privateRequest.delete(`api/v1/user/contacts/${id}`);
};

export const contact = {
  index,
  create,
  show,
  update,
  destroy,
};
