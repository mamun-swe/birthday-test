import { FC } from 'react';
import { Link } from 'react-router-dom';
import { MdLockOutline } from 'react-icons/md';
import { isValidEmail } from 'src/utilities/helper';
import { PrimaryButton } from 'src/components/button';
import { ILogin } from 'src/interfaces/auth.intefaces';
import { useForm, SubmitHandler } from 'react-hook-form';
import { HookFormCheckbox, HookFormTextInput } from 'src/components/input';

type FormProps = {
  loading: boolean;
  onSubmit: SubmitHandler<ILogin>;
};

export const LoginForm: FC<FormProps> = ({
  loading,
  onSubmit,
}: FormProps): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();

  // Handle form submit
  const handleFormSubmit: SubmitHandler<ILogin> = (data) => onSubmit(data);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {/* Email input field */}
      <div className="mb-8">
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
      </div>

      {/* Password input field */}
      <div className="mb-4">
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
      </div>

      {/* Forgot password link */}
      <div className="flex justify-between mb-10">
        <div>
          <HookFormCheckbox
            name="remember"
            label="Remember me"
            control={control}
            onChange={(value) => console.log(value)}
          />
        </div>
        <Link
          to="/forgot-password"
          className="text-sm text-blue-600 hidden sm:block"
        >
          Forgot your password?
        </Link>
      </div>

      {/* Submit button */}
      <div className="mb-4">
        <PrimaryButton type="submit" className="w-full" disabled={loading}>
          {loading ? 'Wait a moment...' : 'Login'}
        </PrimaryButton>
      </div>

      {/* Don't have an account link */}
      <div className="text-right">
        <span className="text-sm text-gray-400">
          {"Don't have an account? "}
          <Link to="/register" className="font-semibold text-blue-600">
            Sign Up
          </Link>{' '}
          Here
        </span>
      </div>

      {/* Forgot password link for large screens */}
      <div className="block sm:hidden text-right">
        <Link to="/forgot-password" className="text-sm text-blue-600">
          Forgot your password?
        </Link>
      </div>
    </form>
  );
};
