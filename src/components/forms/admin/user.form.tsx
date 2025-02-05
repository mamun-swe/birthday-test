import { FC, useEffect } from 'react';
import { PrimaryButton } from 'src/components/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUserUpdate } from 'src/interfaces/admin/user.interface';
import { HookFormSelectInput } from 'src/components/input/select';
import {
  HookFormDateInput,
  HookFormPhoneInput,
  HookFormTextInput,
} from 'src/components/input';
import customHijriDate from 'src/utilities/hijri-date';
import { coutriesAsOptions } from 'src/utilities/countries';

type FormProps = {
  loading: boolean;
  data: IUserUpdate | null;
  form_type: 'create' | 'update';
  onSubmit: SubmitHandler<IUserUpdate>;
};

export const UserForm: FC<FormProps> = ({
  loading,
  data,
  form_type,
  onSubmit,
}: FormProps) => {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserUpdate>();

  const dateOfBirthEnglish = watch('dateOfBirthEnglish');

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
  const handleFormSubmit: SubmitHandler<IUserUpdate> = (data) => {
    const formData = {
      ...data,
      contactNumber: data.contactNumber ? '+' + data.contactNumber : '',
      whatsAppNumber: data.whatsAppNumber ? '+' + data.whatsAppNumber : '',
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

        {/* Contact number input field */}
        <HookFormPhoneInput
          name="contactNumber"
          control={control}
          label="Contact number"
          error={errors.contactNumber}
          defaultValue={data?.contactNumber}
          rules={{ required: 'Contact number is required.' }}
        />

        {/* Whatsapp number input field */}
        <HookFormPhoneInput
          name="whatsAppNumber"
          control={control}
          label="WhatsApp number"
          error={errors.whatsAppNumber}
          defaultValue={data?.whatsAppNumber}
          rules={{ required: 'WhatsApp number is required.' }}
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

        {/* City input field */}
        <HookFormTextInput
          type="text"
          name="city"
          label="City"
          control={control}
          defaultValue={data?.city}
          placeholder="Enter your city"
          rules={{ required: 'City is required.' }}
          error={errors.city}
        />

        {/* State input field */}
        <HookFormTextInput
          type="text"
          name="state"
          label="State"
          control={control}
          defaultValue={data?.state}
          placeholder="Enter your state"
          rules={{ required: 'State is required.' }}
          error={errors.state}
        />

        {/* Country select field */}
        <HookFormSelectInput
          name="country"
          label="Country"
          control={control}
          defaultValue={data?.country || null}
          placeholder="Select your country"
          options={coutriesAsOptions}
          rules={{ required: 'Country is required.' }}
          error={errors.country}
        />

        {/* Zip code input field */}
        <HookFormTextInput
          type="text"
          name="zipCode"
          label="ZIP code"
          control={control}
          defaultValue={data?.zipCode}
          placeholder="Enter your zip code"
          rules={{ required: 'ZIP code is required.' }}
          error={errors.zipCode}
        />
      </div>

      {/* Street address input field */}
      <div className="mb-6">
        <HookFormTextInput
          type="text"
          name="streetAddress"
          label="Street address"
          control={control}
          defaultValue={data?.streetAddress}
          placeholder="Enter your street address"
          rules={{ required: 'Street address is required.' }}
          error={errors.streetAddress}
        />
      </div>

      {/* Submit button */}
      <div className="text-right">
        <PrimaryButton type="submit" disabled={loading}>
          {loading
            ? 'wait a moment...'
            : form_type === 'create'
              ? 'Create'
              : 'Save changes'}
        </PrimaryButton>
      </div>
    </form>
  );
};
