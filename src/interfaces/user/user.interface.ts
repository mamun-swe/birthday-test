export interface IUser {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  contactNumber: string;
  whatsAppNumber: string;
  dateOfBirthEnglish: string;
  dateOfBirthMisri: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  email: string;
  isEmailVerified: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProfileUpdate {
  firstName: string;
  middleName: string;
  lastName: string;
  contactNumber: string;
  whatsAppNumber: string;
  dateOfBirthEnglish: string;
  dateOfBirthMisri: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}
