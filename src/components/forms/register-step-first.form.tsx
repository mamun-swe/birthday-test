import { FC, useEffect } from 'react';
import { PrimaryButton } from 'src/components/button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IRegisterStepFirst } from 'src/interfaces/auth.intefaces';
import {
  HookFormDateInput,
  HookFormPhoneInput,
  HookFormTextInput,
} from 'src/components/input';
import customHijriDate from 'src/utilities/hijri-date';

type FormProps = {
  defaultValues: IRegisterStepFirst | null;
  onSubmit: SubmitHandler<IRegisterStepFirst>;
};

export const RegisterStepFirstForm: FC<FormProps> = ({
  onSubmit,
  defaultValues,
}: FormProps): JSX.Element => {
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IRegisterStepFirst>({
    defaultValues: {
      firstName: defaultValues?.firstName || '',
      middleName: defaultValues?.middleName || '',
      lastName: defaultValues?.lastName || '',
      contactNumber: defaultValues?.contactNumber || '',
      whatsAppNumber: defaultValues?.whatsAppNumber || '',
      dateOfBirthEnglish: defaultValues?.dateOfBirthEnglish || '',
      dateOfBirthMisri: defaultValues?.dateOfBirthMisri || '',
    },
  });

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
  const handleFormSubmit: SubmitHandler<IRegisterStepFirst> = (data) => {
    const formData = {
      ...data,
      contactNumber: data.contactNumber ? '+' + data.contactNumber : '',
      whatsAppNumber: data.whatsAppNumber ? '+' + data.whatsAppNumber : '',
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* First name input field */}
        <HookFormTextInput
          type="text"
          name="firstName"
          label="First name"
          control={control}
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
          rules={{ required: 'Contact number is required.' }}
        />

        {/* Whatsapp number input field */}
        <HookFormPhoneInput
          name="whatsAppNumber"
          control={control}
          label="WhatsApp number"
          error={errors.whatsAppNumber}
          rules={{ required: 'WhatsApp number is required.' }}
        />

        {/* Date of birth(English) input field */}
        <HookFormDateInput
          name="dateOfBirthEnglish"
          label="Date of birth (English)"
          control={control}
          rules={{ required: 'Date of birth (English) is required.' }}
          error={errors.dateOfBirthEnglish}
        />

        {/* Date of birth(Misri) input field */}
        <HookFormTextInput
          type="text"
          name="dateOfBirthMisri"
          label="Date of birth (Misri)"
          control={control}
          rules={{ required: 'Date of birth (Misri) is required.' }}
          error={errors.dateOfBirthMisri}
          disabled
        />
      </div>

      {/* Next button */}
      <div className="text-right">
        <PrimaryButton type="submit">Next</PrimaryButton>
      </div>
    </form>
  );
};
