import { FC, Fragment, useState } from 'react';
import { Images } from 'src/utilities/images';
import { useNavigate } from 'react-router-dom';
import {
  IRegisterStepFirst,
  IRegisterStepSecond,
} from 'src/interfaces/auth.intefaces';
import { HttpServices } from 'src/services';
import { HotToast } from 'src/components/toaster';
import { HttpErrorHandeller } from 'src/utilities/helper';
import { RegisterStepFirstForm } from 'src/components/forms/register-step-first.form';
import { RegisterStepSecondForm } from 'src/components/forms/register-step-second.form';

interface IRegister extends IRegisterStepFirst, IRegisterStepSecond {}

export const Register: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState<number>(1);
  const [firstStepFormData, setFirstStepFormData] =
    useState<IRegisterStepFirst | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  // handle first step form submit
  const handleFirstStepFormSubmit = (data: IRegisterStepFirst) => {
    setFormStep(2);
    setFirstStepFormData(data);
  };

  // handle form submit
  const handleFormSubmit = async (data: IRegisterStepSecond) => {
    try {
      setLoading(true);
      const formData = { ...firstStepFormData, ...data };

      const response = await HttpServices.auth.register(formData as IRegister);
      if (response && response.status === 200) {
        HotToast.Success({ message: response.data?.message });
        navigate('/');
      }

      setLoading(false);
    } catch (error: any) {
      if (error) {
        setLoading(false);
        HttpErrorHandeller(error);
      }
    }
  };

  return (
    <Fragment>
      <div className="lg:flex items-center justify-center lg:h-screen py-10 lg:pt-0">
        <div className="w-full h-[1150px] lg:h-[80vh] lg:w-11/12 mx-auto rounded-2xl relative bg-themelight">
          {/* Surprise theme image */}
          <img
            src={Images.Surprise}
            alt="Surprise"
            className="absolute top-5 right-0 max-h-52"
          />

          {/* Register form section */}
          <div className="absolute top-0 left-0 w-full h-full z-50 px-5 lg:px-10 py-10 lg:py-14">
            <div className="w-full mx-auto">
              <p className="text-3xl font-semibold mb-6 text-themeblack">
                Register
              </p>
              <div className="mb-10 max-w-sm mx-auto">
                <div className="h-2 rounded-full bg-muted/10">
                  <div
                    className={`h-2 rounded-full transition-all bg-primary ${
                      formStep === 1 ? 'w-1/2' : 'w-full'
                    }`}
                  />
                </div>
              </div>

              {formStep === 1 ? (
                <RegisterStepFirstForm
                  defaultValues={firstStepFormData}
                  onSubmit={handleFirstStepFormSubmit}
                />
              ) : formStep === 2 ? (
                <RegisterStepSecondForm
                  loading={isLoading}
                  goBack={() => setFormStep(1)}
                  onSubmit={handleFormSubmit}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
