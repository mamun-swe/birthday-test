import { publicRequest } from 'src/config/axios.config';

// Convert date to hijri date
export const convertToHijri = async ({ date }: { date: string }) => {
  return await publicRequest.post('/api/v1/converter/toHijri', {
    date,
  });
};

export const dateConversion = {
  convertToHijri,
};
