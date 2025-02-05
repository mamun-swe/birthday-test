import { AxiosError } from 'axios';
import { FC, Fragment, useState } from 'react';
import { HttpServices } from 'src/services';
import { Images } from 'src/utilities/images';
import { useNavigate } from 'react-router-dom';
import { HotToast } from 'src/components/toaster';
import { HttpErrorHandeller } from 'src/utilities/helper';
import { IOTPVerification } from 'src/interfaces/auth.intefaces';
import { IHttpErrorResponse } from 'src/interfaces/exception.interface';
import { OTPVerificationForm } from 'src/components/forms/otp-verification.form';

export const OTPVerification: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(false);

  // handle form submit
  const handleFormSubmit = async (data: string) => {
    try {
      setLoading(true);
      const email = sessionStorage.getItem('password-reset-email') || '';
      const formData: IOTPVerification = { otpCode: data, email };
      const response = await HttpServices.auth.otpVerification(formData);
      if (response && response.status === 200) {
        HotToast.Success({ message: response.data?.message });
        navigate(`/set-password?ref=${response.data?.data?.ref}`);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      HttpErrorHandeller(error as AxiosError<IHttpErrorResponse>);
    }
  };

  return (
    <Fragment>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full min-h-[80vh] lg:w-11/12 mx-auto rounded-2xl relative bg-themelight">
          {/* Surprise theme image */}
          <img
            src={Images.Surprise}
            alt="Surprise"
            className="absolute top-5 right-0 max-h-52"
          />

          {/* Reset form section */}
          <div className="absolute top-0 left-0 w-full h-full z-50 px-5 py-10 lg:py-14">
            <div className="w-full max-w-md mx-auto">
              <p className="text-3xl font-semibold mb-3 text-themeblack">
                Verify OTP
              </p>
              <p className="text-sm mb-10 text-muted">
                Please enter the OTP sent to your email.
              </p>
              <OTPVerificationForm
                loading={isLoading}
                onSubmit={handleFormSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
