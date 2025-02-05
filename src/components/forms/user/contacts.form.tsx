import { FC, useEffect } from 'react';
import { isValidEmail } from 'src/utilities/helper';
import { PrimaryButton } from 'src/components/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  HookFormCheckbox,
  HookFormDateInput,
  HookFormPhoneInput,
  HookFormTextInput,
} from 'src/components/input';
import { IContactCreate } from 'src/interfaces/user/contacts.interface';
import customHijriDate from 'src/utilities/hijri-date';

type FormProps = {
  loading: boolean;
  data: IContactCreate | null;
  onSubmit: SubmitHandler<IContactCreate>;
};

export const ContactsForm: FC<FormProps> = ({
  data,
  loading,
  onSubmit,
}: FormProps): JSX.Element => {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IContactCreate>();

  const dateOfBirthEnglish = watch('dateOfBirthEnglish');
  const watchContactNumber = watch('contactNumber') || data?.contactNumber;
  const watchWhatsAppNumber = watch('whatsAppNumber') || data?.whatsAppNumber;
  const watchEmail = watch('email') || data?.email;

  useEffect(() => {
    if (dateOfBirthEnglish) {
      const date = new Date(dateOfBirthEnglish);
      // Convert to Misri date
      const misriDate =
        customHijriDate.fromGregorian(date).year +
        '-' +
        customHijriDate.fromGregorian(date).month +
        '-' +
        customHijriDate.fromGregorian(date).day;

      setValue('dateOfBirthMisri', misriDate);
    }
  }, [dateOfBirthEnglish, setValue]);

  // Handle form submit
  const handleFormSubmit: SubmitHandler<IContactCreate> = (data) => {
    const formData = {
      ...data,
      contactNumber: data.contactNumber ? '+' + data.contactNumber : '',
      whatsAppNumber: data.whatsAppNumber ? '+' + data.whatsAppNumber : '',
      email: watchEmail,
    };

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* First name input field */}
        <HookFormTextInput
          type="text"
          name="firstName"
          label="First name"
          control={control}
          defaultValue={data?.firstName}
          placeholder="Enter your first name"
          rules={{ required: 'First name is required.' }}
          error={errors.firstName}
        />

        {/* Middle name input field */}
        <HookFormTextInput
          type="text"
          name="middleName"
          label="Middle name"
          control={control}
          defaultValue={data?.middleName}
          placeholder="Enter your middle name"
          rules={{ required: false }}
          error={errors.middleName}
        />

        {/* Last name input field */}
        <HookFormTextInput
          type="text"
          name="lastName"
          label="Last name"
          control={control}
          defaultValue={data?.lastName}
          placeholder="Enter your last name"
          rules={{ required: 'Last name is required.' }}
          error={errors.lastName}
        />

        {/* Relationship select field */}
        <HookFormTextInput
          type="text"
          name="relationship"
          label="Relationship"
          placeholder="Enter your relationship"
          control={control}
          defaultValue={data?.relationship}
          rules={{
            required: 'Relationship is required.',
            maxLength: {
              value: 15,
              message: 'Relationship must be less than 15 characters.',
            },
          }}
          error={errors.relationship}
        />

        {/* Date of birth(English) input field */}
        <HookFormDateInput
          name="dateOfBirthEnglish"
          label="Date of birth (English)"
          control={control}
          error={errors.dateOfBirthEnglish}
          defaultValue={data?.dateOfBirthEnglish}
          rules={{ required: 'Date of birth (English) is required.' }}
        />

        {/* Date of birth(Misri) input field */}
        <HookFormTextInput
          type="text"
          name="dateOfBirthMisri"
          label="Date of birth (Misri)"
          control={control}
          error={errors.dateOfBirthMisri}
          defaultValue={data?.dateOfBirthMisri}
          rules={{ required: 'Date of birth (Misri) is required.' }}
          disabled
        />

        {/* Contact number input field */}
        <HookFormPhoneInput
          name="contactNumber"
          control={control}
          label="Contact number"
          error={errors.contactNumber}
          defaultValue={data?.contactNumber}
          rules={{ required: false }}
        />

        {/* Whatsapp number input field */}
        <HookFormPhoneInput
          name="whatsAppNumber"
          control={control}
          label="WhatsApp number"
          error={errors.whatsAppNumber}
          defaultValue={data?.whatsAppNumber}
          rules={{ required: false }}
        />

        {/* Email address input field */}
        <HookFormTextInput
          type="text"
          name="email"
          label="Email address"
          control={control}
          placeholder="example@me.com"
          rules={{
            required: false,
            pattern: {
              value: isValidEmail(),
              message: 'Please enter a valid email address.',
            },
          }}
          error={errors.email}
          defaultValue={data?.email || ''}
        />
      </div>

      <div className="space-y-6 mb-6">
        {/* Notification confirmation into mobile */}
        <HookFormCheckbox
          name="willReceiveSmsNotification"
          control={control}
          defaultValue={data?.willReceiveSmsNotification || false}
          label="I want to receive notifications via SMS"
          disabled={!watchContactNumber}
        />

        {/* Notification confirmation into email */}
        <HookFormCheckbox
          name="willReceiveEmailNotification"
          control={control}
          defaultValue={data?.willReceiveEmailNotification || false}
          label="I want to receive notifications via email"
          disabled={!watchEmail}
        />

        {/* WhatsApp notification confirmation */}
        <HookFormCheckbox
          name="willReceiveWhatsAppNotification"
          control={control}
          defaultValue={data?.willReceiveWhatsAppNotification || false}
          label="I want to receive notifications via WhatsApp"
          disabled={!watchWhatsAppNumber}
        />
      </div>

      {/* Submit button */}
      <div className="text-right">
        <PrimaryButton type="submit" disabled={loading}>
          {loading ? 'wait a moment...' : 'Submit'}
        </PrimaryButton>
      </div>
    </form>
  );
};
