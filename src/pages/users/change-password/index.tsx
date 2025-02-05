import { FC, Fragment, useState } from 'react';
import { HttpServices } from 'src/services';
import { useNavigate } from 'react-router-dom';
import { HotToast } from 'src/components/toaster';
import { PageHeader } from 'src/components/page-header';
import { HttpErrorHandeller } from 'src/utilities/helper';
import { IChangePassword } from 'src/interfaces/user/settings.interface';
import { ChangePasswordForm } from 'src/components/forms/user/change-password.form';

export const ChangePassword: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(false);

  // handle form submit
  const handleFormSubmit = async (data: IChangePassword) => {
    try {
      setLoading(true);
      const response = await HttpServices.user.settings.changePassword(data);
      if (response && response.status === 200) {
        HotToast.Success({ message: response.data?.message });
        localStorage.clear();
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
      <PageHeader title="Change Password" />
      <div className="w-full lg:max-w-md">
        <ChangePasswordForm loading={isLoading} onSubmit={handleFormSubmit} />
      </div>
    </Fragment>
  );
};
