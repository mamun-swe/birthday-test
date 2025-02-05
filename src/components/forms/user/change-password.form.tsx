import { FC } from 'react';
import { MdLockOutline } from 'react-icons/md';
import { PrimaryButton } from 'src/components/button';
import { HookFormTextInput } from 'src/components/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IChangePassword } from 'src/interfaces/user/settings.interface';

type FormProps = {
  loading: boolean;
  onSubmit: SubmitHandler<IChangePassword>;
};

export const ChangePasswordForm: FC<FormProps> = ({
  loading,
  onSubmit,
}: FormProps): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangePassword>();

  // Handle form submit
  const handleFormSubmit: SubmitHandler<IChangePassword> = (data) =>
    onSubmit(data);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="space-y-6">
        {/* Old password input field */}
        <HookFormTextInput
          type="password"
          name="oldPassword"
          label="Old password"
          control={control}
          placeholder="*****"
          icon={<MdLockOutline />}
          rules={{
            required: 'Old password is required.',
            minLength: {
              value: 8,
              message: 'Old password must be at least 8 characters.',
            },
          }}
          error={errors.oldPassword}
        />

        {/* New password input field */}
        <HookFormTextInput
          type="password"
          name="newPassword"
          label="New password"
          control={control}
          placeholder="*****"
          icon={<MdLockOutline />}
          rules={{
            required: 'New password is required.',
            minLength: {
              value: 8,
              message: 'New password must be at least 8 characters.',
            },
          }}
          error={errors.newPassword}
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
              value === control._formValues.newPassword ||
              'Confirm password does not match.',
          }}
          error={errors.confirmPassword}
        />

        {/* Submit button */}
        <div className="text-right">
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Wait a moment...' : 'Save Password'}
          </PrimaryButton>
        </div>
      </div>
    </form>
  );
};
