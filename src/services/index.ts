import { auth } from 'src/services/auth.service';
import { admin } from 'src/services/admin';
import { user } from 'src/services/user';
import { dateConversion } from 'src/services/date-conversion.service';

export const HttpServices = {
  auth,
  admin,
  user,
  dateConversion,
};
