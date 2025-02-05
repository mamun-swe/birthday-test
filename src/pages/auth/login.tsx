import { FC, Fragment, useState } from 'react';
import { HttpServices } from 'src/services';
import { Images } from 'src/utilities/images';
import { useNavigate } from 'react-router-dom';
import { HotToast } from 'src/components/toaster';
import { ILogin } from 'src/interfaces/auth.intefaces';
import { LoginForm } from 'src/components/forms/login.form';
import {
  setToken,
  getUserRole,
  HttpErrorHandeller,
} from 'src/utilities/helper';

export const Login: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(false);

  // handle form submit
  const handleFormSubmit = async (data: ILogin) => {
    try {
      setLoading(true);
      const response = await HttpServices.auth.login(data);
      if (response && response.status === 200) {
        HotToast.Success({ message: response.data?.message });
        setToken(response.data?.data?.token);

        const role = getUserRole({ token: response.data?.data?.token });
        if (role === 'ADMIN') {
          navigate('/admin/dashboard');
        } else if (role === 'USER') {
          navigate('/user/dashboard');
        }
      }

      setLoading(false);
    } catch (error: any) {
      if (error) {
        console.log(error);
        setLoading(false);
        HttpErrorHandeller(error);
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

          {/* Login form section */}
          <div className="absolute top-0 left-0 w-full h-full z-50 px-5 py-10 lg:py-14">
            <div className="w-full max-w-md mx-auto">
              <p className="text-3xl font-semibold mb-3 text-themeblack">
                Login
              </p>
              <p className="text-sm mb-10 text-muted">
                Please enter your login detail to sign in
              </p>
              <LoginForm loading={isLoading} onSubmit={handleFormSubmit} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
