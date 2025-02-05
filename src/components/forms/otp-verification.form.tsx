import { FC, useState } from 'react';
import { PrimaryButton } from '../button';
import OtpInput from 'react-otp-input';

type PropsTypes = {
  loading: boolean;
  onSubmit: (data: string) => void;
};
export const OTPVerificationForm: FC<PropsTypes> = (
  props: PropsTypes,
): JSX.Element => {
  const [otpValue, setOtpValue] = useState<string>('');
  const [isError, setError] = useState<boolean>(false);

  // handle input change
  const handleInputChange = (vlaue: string) => {
    setOtpValue(vlaue);
    setError(false);
  };

  // Handle form submit
  const onSubmit = (): void => {
    if (!otpValue) {
      return setError(true);
    }
    props.onSubmit(otpValue);
  };

  return (
    <div className="flex flex-col">
      <OtpInput
        numInputs={4}
        value={otpValue}
        inputType="number"
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
        containerStyle="!justify-center !mb-6"
        inputStyle={`border !h-16 !w-16 rounded-lg !mx-2 font-normal  text-lg focus:outline-none focus-visible:none text-black bg-white ${
          isError ? '!border-red-400' : ''
        }`}
        onChange={handleInputChange}
      />

      {/* Submit Button */}
      <PrimaryButton
        type="button"
        disabled={props.loading}
        className="w-full"
        onClick={onSubmit}
      >
        {props.loading ? 'Verifying...' : 'Verify'}
      </PrimaryButton>
    </div>
  );
};
