import { privateRequest } from 'src/config/axios.config';
import { IProfileUpdate } from 'src/interfaces/user/user.interface';

// Retrieve user profile
const index = async () => {
  return await privateRequest.get('api/v1/user/profile');
};

// Update user profile
const update = async (data: IProfileUpdate) => {
  return await privateRequest.put('api/v1/user/profile', data);
};

export const profile = {
  index,
  update,
};
