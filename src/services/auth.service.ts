import { publicRequest } from 'src/config/axios.config';
import {
  IForgotPassword,
  ILogin,
  IOTPVerification,
  IRegisterStepFirst,
  IRegisterStepSecond,
  ISetPassword,
} from 'src/interfaces/auth.intefaces';

// Login to account
const login = async (data: ILogin) => {
  return await publicRequest.post('api/v1/auth/login', data);
};

// Register an account
interface IRegister extends IRegisterStepFirst, IRegisterStepSecond {}
const register = async (data: IRegister) => {
  return await publicRequest.post('api/v1/auth/register', data);
};

// Forget password
const forgetPassword = async (data: IForgotPassword) => {
  return await publicRequest.post('api/v1/auth/forgot-password', data);
};

// OTP verification
const otpVerification = async (data: IOTPVerification) => {
  return await publicRequest.post('api/v1/auth/verify-otp-code', data);
};

// Set password
const setPassword = async (data: ISetPassword) => {
  return await publicRequest.post('api/v1/auth/set-password', data);
};

export const auth = {
  login,
  register,
  forgetPassword,
  otpVerification,
  setPassword,
};
