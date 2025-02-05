import { HotToast } from 'src/components/toaster';
import { IHttpErrorResponse } from 'src/interfaces/exception.interface';
import { jwtDecode } from 'jwt-decode';
import { IJWTtoken } from 'src/interfaces';
import { AxiosError } from 'axios';

// Check if email is valid
export const isValidEmail = (): RegExp => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regex;
};

// Generate array from number
export const generateArrayFromNumber = (upTo: number): number[] => {
  return Array.from({ length: upTo }, (_, index) => index + 1);
};

// Check if route is active
export const isActiveRoute = ({
  current_path,
  path,
}: {
  current_path: string;
  path: string;
}) => {
  return current_path.split('/')[2] === path;
};

/* Global http response error handeller */
export const HttpErrorHandeller = (
  error: AxiosError<IHttpErrorResponse>,
): void => {
  const obj = error?.response?.data?.errors;

  if (!obj) {
    HotToast.Error({ message: 'Something going wrong, Try again.' });
    return;
  }

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const errorMessages = obj[key];
      if (errorMessages && Array.isArray(errorMessages)) {
        errorMessages.forEach((message: string) => {
          HotToast.Error({ message });
        });
      }
    } else {
      HotToast.Error({ message: 'Something going wrong, Try again.' });
    }
  }
};

// Retrive token from local storage
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// Set token in local storage
export const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};

// Remove user role from token
export const getUserRole = ({ token }: { token: string }): string | null => {
  if (!token) return null;
  const decode = jwtDecode<IJWTtoken | null>(token);
  return decode?.user?.role || null;
};

// Convert gregorian date to Egyptian calendar
export const convertToEgyptianDate = (gregorianDate: string): string => {
  // Egyptian calendar month names
  const egyptianMonths: string[] = [
    'Thoth',
    'Phaophi',
    'Athyr',
    'Choiak',
    'Tybi',
    'Mechir',
    'Phamenoth',
    'Pharmouthi',
    'Pachons',
    'Payni',
    'Epiphi',
    'Mesore',
    'Epagomenal Days',
  ];

  // Parse the Gregorian date
  const date = new Date(gregorianDate);
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }

  // Julian Day calculation (simplified version for common use cases)
  const jd: number = Math.floor(date.getTime() / 86400000 + 2440587.5);

  // Convert Julian Day to Egyptian calendar
  const egyptianYear: number = Math.floor((jd - 1825029) / 365.25);
  const daysInYear: number = Math.floor((jd - 1825029) % 365.25);

  let monthIndex: number = Math.floor(daysInYear / 30);
  let dayInMonth: number = (daysInYear % 30) + 1;

  if (monthIndex >= 12) {
    monthIndex = 12; // Epagomenal days
    dayInMonth = daysInYear - 360 + 1;
  }

  return `${egyptianYear}-${egyptianMonths[monthIndex]}-${dayInMonth}`;
};
