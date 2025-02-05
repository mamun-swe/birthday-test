import { FC } from 'react';
import { isValidEmail } from 'src/utilities/helper';
import { PrimaryButton, PrimaryOutlineButton } from 'src/components/button';
import { HookFormTextInput } from 'src/components/input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { HookFormSelectInput } from 'src/components/input/select';
import { IRegisterStepSecond } from 'src/interfaces/auth.intefaces';
import { coutriesAsOptions } from 'src/utilities/countries';

type FormProps = {
  loading: boolean;
  goBack: () => void;
  onSubmit: SubmitHandler<IRegisterStepSecond>;
};

export const RegisterStepSecondForm: FC<FormProps> = ({
  loading,
  goBack,
  onSubmit,
}: FormProps): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterStepSecond>();

  // Handle form submit
  const handleFormSubmit: SubmitHandler<IRegisterStepSecond> = (data) =>
    onSubmit(data);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Street address input field */}
        <HookFormTextInput
          type="text"
          name="streetAddress"
          label="Street address"
          control={control}
          placeholder="Enter your street address"
          rules={{ required: 'Street address is required.' }}
          error={errors.streetAddress}
        />

        {/* City input field */}
        <HookFormTextInput
          type="text"
          name="city"
          label="City"
          control={control}
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
          placeholder="Enter your state"
          rules={{ required: 'State is required.' }}
          error={errors.state}
        />

        {/* Country select field */}
        <HookFormSelectInput
          name="country"
          label="Country"
          control={control}
          placeholder="Select your country"
          options={coutriesAsOptions}
          rules={{ required: 'Country is required.' }}
          error={errors.country}
          defaultValue={null}
        />

        {/* Zip code input field */}
        <HookFormTextInput
          type="text"
          name="zipCode"
          label="ZIP code"
          control={control}
          placeholder="Enter your zip code"
          rules={{ required: 'ZIP code is required.' }}
          error={errors.zipCode}
        />

        {/* Email address input field */}
        <HookFormTextInput
          type="text"
          name="email"
          label="Email address"
          control={control}
          placeholder="example@me.com"
          rules={{
            required: 'Email address is required.',
            pattern: {
              value: isValidEmail(),
              message: 'Please enter a valid email address.',
            },
          }}
          error={errors.email}
        />

        {/* Password input field */}
        <HookFormTextInput
          type="password"
          name="password"
          label="Password"
          control={control}
          placeholder="*****"
          rules={{
            required: 'Password is required.',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters.',
            },
          }}
          error={errors.password}
        />

        {/* Confirm password input field */}
        <HookFormTextInput
          type="password"
          name="confirmPassword"
          label="Confirm password"
          control={control}
          placeholder="*****"
          rules={{
            required: 'Confirm password is required.',
            validate: (value: string) =>
              value === control._formValues.password ||
              'Confirm password does not match.',
          }}
          error={errors.confirmPassword}
        />
      </div>

      {/* Submit button */}
      <div className="flex justify-between">
        <PrimaryOutlineButton type="button" onClick={goBack}>
          Previous
        </PrimaryOutlineButton>
        <PrimaryButton type="submit" disabled={loading}>
          {loading ? 'wait a moment...' : 'Submit'}
        </PrimaryButton>
      </div>
    </form>
  );
};
