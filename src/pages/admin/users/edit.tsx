import { FC, Fragment, useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HttpServices } from 'src/services';
import { NoContent } from 'src/components/204';
import { HotToast } from 'src/components/toaster';
import { PageHeader } from 'src/components/page-header';
import { SomethingGoingWrong } from 'src/components/500';
import { HttpErrorHandeller } from 'src/utilities/helper';
import { UserForm } from 'src/components/forms/admin/user.form';
import { FormPreloader } from 'src/components/preloader/form.preloader';
import { IUser, IUserUpdate } from 'src/interfaces/admin/user.interface';

export const UserEdit: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<IUser | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [serverError, setServerError] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);

  // Fetch user data
  const getUserData = useCallback(async ({ id }: { id: number }) => {
    try {
      const response = await HttpServices.admin.user.show(id);
      if (response && response.status === 200) {
        setData(response.data?.data);
      }

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setServerError(true);
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (id) {
      getUserData({ id: Number(id) });
    }
  }, [getUserData, id]);

  // handle form submit
  const handleFormSubmit = async (data: IUserUpdate) => {
    try {
      setUpdating(true);
      const response = await HttpServices.admin.user.update({
        id: Number(id),
        data,
      });

      if (response && response.status === 200) {
        HotToast.Success({ message: response.data?.message });
        navigate('/admin/users');
      }

      setUpdating(false);
    } catch (error: any) {
      setUpdating(false);
      HttpErrorHandeller(error);
    }
  };

  return (
    <Fragment>
      <PageHeader
        title="Edit user information"
        icon="back"
        path="/admin/users"
      />

      {/* Loading preview */}
      {isLoading && !serverError && !data && <FormPreloader />}

      {/* Data not found preview */}
      {!isLoading && !serverError && !data && (
        <NoContent message="User not found!" />
      )}

      {/* Server error preview */}
      {!isLoading && !data && serverError && <SomethingGoingWrong />}

      {/* Form preview */}
      {!isLoading && !serverError && data && (
        <UserForm
          data={data}
          loading={updating}
          form_type="update"
          onSubmit={handleFormSubmit}
        />
      )}
    </Fragment>
  );
};
