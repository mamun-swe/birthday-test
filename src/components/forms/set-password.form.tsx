import { FC } from 'react';
import { MdLockOutline } from 'react-icons/md';
import { PrimaryButton } from 'src/components/button';
import { HookFormTextInput } from 'src/components/input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ISetPassword } from 'src/interfaces/auth.intefaces';

type FormProps = {
  loading: boolean;
  onSubmit: SubmitHandler<ISetPassword>;
};

export const SetPasswordForm: FC<FormProps> = ({
  loading,
  onSubmit,
}: FormProps): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISetPassword>();

  // Handle form submit
  const handleFormSubmit: SubmitHandler<ISetPassword> = (data) =>
    onSubmit(data);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="space-y-8">
        {/* Password input field */}
        <HookFormTextInput
          type="password"
          name="password"
          label="Password"
          control={control}
          placeholder="*****"
          icon={<MdLockOutline />}
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
          icon={<MdLockOutline />}
          rules={{
            required: 'Confirm password is required.',
            validate: (value: string) =>
              value === control._formValues.password ||
              'Confirm password does not match.',
          }}
          error={errors.confirmPassword}
        />

        <PrimaryButton type="submit" className="w-full" disabled={loading}>
          {loading ? 'Wait a moment...' : 'Save Password'}
        </PrimaryButton>
      </div>
    </form>
  );
};
