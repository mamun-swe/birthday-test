import { privateRequest } from 'src/config/axios.config';
import { IChangePassword } from 'src/interfaces/user/settings.interface';

// Change user password
const changePassword = async (data: IChangePassword) => {
  return await privateRequest.post(
    'api/v1/user/settings/change-password',
    data,
  );
};

export const settings = {
  changePassword,
};
