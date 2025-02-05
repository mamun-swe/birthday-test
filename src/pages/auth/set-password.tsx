import { FC, Fragment, useState } from 'react';
import { AxiosError } from 'axios';
import { HttpServices } from 'src/services';
import { Images } from 'src/utilities/images';
import { HotToast } from 'src/components/toaster';
import { HttpErrorHandeller } from 'src/utilities/helper';
import { ISetPassword } from 'src/interfaces/auth.intefaces';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IHttpErrorResponse } from 'src/interfaces/exception.interface';
import { SetPasswordForm } from 'src/components/forms/set-password.form';

export const SetPassword: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setLoading] = useState<boolean>(false);

  const ref = searchParams.get('ref') || '';

  // handle form submit
  const handleFormSubmit = async (data: ISetPassword) => {
    try {
      setLoading(true);
      const formData: ISetPassword = { ...data, ref };
      const response = await HttpServices.auth.setPassword(formData);
      if (response && response.status === 200) {
        HotToast.Success({ message: response.data?.message });
        navigate('/');
      }

      setLoading(false);
    } catch (error) {
      if (error) {
        setLoading(false);
        HttpErrorHandeller(error as AxiosError<IHttpErrorResponse>);
      }
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
                Set New Password
              </p>
              <p className="text-sm mb-10 text-muted">
                Make sure you save your password in password Manager
              </p>
              <SetPasswordForm
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
