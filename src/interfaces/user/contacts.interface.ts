export interface IContact {
  id: number;
  user: number;
  firstName: string;
  middleName: string;
  lastName: string;
  relationship: string;
  dateOfBirthEnglish: string;
  dateOfBirthMisri: string;
  contactNumber: string;
  whatsAppNumber: string;
  email: string;
  willReceiveSmsNotification: boolean;
  willReceiveWhatsAppNotification: boolean;
  willReceiveEmailNotification: boolean;
}

export interface IContactCreate {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirthEnglish: string;
  dateOfBirthMisri: string;
  contactNumber?: string;
  whatsAppNumber?: string;
  email?: string;
  willReceiveSmsNotification?: boolean;
  willReceiveEmailNotification?: boolean;
  willReceiveWhatsAppNotification?: boolean;
  relationship: string;
}
