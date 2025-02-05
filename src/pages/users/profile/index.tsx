import { FC, Fragment, useState, useCallback, useEffect } from 'react';
import { HttpServices } from 'src/services';
import { IUser } from 'src/interfaces/user/user.interface';
import { HotToast } from 'src/components/toaster';
import { PageHeader } from 'src/components/page-header';
import { SomethingGoingWrong } from 'src/components/500';
import { HttpErrorHandeller } from 'src/utilities/helper';
import { ProfileForm } from 'src/components/forms/user/profile.form';
import { FormPreloader } from 'src/components/preloader/form.preloader';

export const Profile: FC = (): JSX.Element => {
  const [data, setData] = useState<IUser | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [serverError, setServerError] = useState<boolean>(false);
  const [isupdating, setUpdating] = useState<boolean>(false);

  // Fetch profile data
  const getProfileData = useCallback(async () => {
    try {
      const response = await HttpServices.user.profile.index();
      if (response && response.status === 200) {
        setData(response.data?.data);
      }

      setLoading(false);
    } catch (error: any) {
      if (error) {
        setLoading(false);
        setServerError(true);
      }
    }
  }, []);

  useEffect(() => {
    getProfileData();
  }, [getProfileData]);

  // handle form submit
  const handleFormSubmit = async (data: IUser) => {
    try {
      setUpdating(true);
      const response = await HttpServices.user.profile.update(data);
      if (response && response.status === 200) {
        HotToast.Success({ message: response.data?.message });
      }

      setUpdating(false);
    } catch (error: any) {
      if (error) {
        setUpdating(false);
        HttpErrorHandeller(error);
      }
    }
  };

  return (
    <Fragment>
      <PageHeader title="Edit profile" />
      {/* Preloading preview */}
      {isLoading && !serverError && !data && <FormPreloader />}

      {/* Something went wrong preview */}
      {!isLoading && !data && serverError && <SomethingGoingWrong />}

      {/* Profile form preview */}
      {data && !isLoading && !serverError && (
        <ProfileForm
          data={data}
          loading={isupdating}
          onSubmit={handleFormSubmit}
        />
      )}
    </Fragment>
  );
};
