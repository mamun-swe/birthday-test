export interface ILogin {
  email: string;
  password: string;
}

export interface IForgotPassword {
  email: string;
}

export interface ISetPassword {
  ref: string;
  password: string;
  confirmPassword: string;
}

export interface IRegisterStepFirst {
  firstName: string;
  middleName: string;
  lastName: string;
  contactNumber: string;
  whatsAppNumber: string;
  dateOfBirthEnglish: string;
  dateOfBirthMisri: string;
}

export interface IRegisterStepSecond {
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IOTPVerification {
  email: string;
  otpCode: string;
}
