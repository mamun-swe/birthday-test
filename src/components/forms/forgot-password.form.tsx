import { FC } from 'react';
import { MdOutlineEmail } from 'react-icons/md';
import { isValidEmail } from 'src/utilities/helper';
import { PrimaryButton } from 'src/components/button';
import { HookFormTextInput } from 'src/components/input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IForgotPassword } from 'src/interfaces/auth.intefaces';

type FormProps = {
  loading: boolean;
  onSubmit: SubmitHandler<IForgotPassword>;
};

export const ForgotPasswordForm: FC<FormProps> = ({
  loading,
  onSubmit,
}: FormProps): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPassword>();

  // Handle form submit
  const handleFormSubmit: SubmitHandler<IForgotPassword> = (data) =>
    onSubmit(data);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="space-y-8">
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
          icon={<MdOutlineEmail />}
        />

        <PrimaryButton type="submit" className="w-full" disabled={loading}>
          {loading ? 'Wait a moment...' : 'Reset Password'}
        </PrimaryButton>
      </div>
    </form>
  );
};
