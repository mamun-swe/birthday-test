import { FC, Fragment, useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HotToast } from 'src/components/toaster';
import { PageHeader } from 'src/components/page-header';
import { SomethingGoingWrong } from 'src/components/500';
import { HttpErrorHandeller } from 'src/utilities/helper';
import { ContactsForm } from 'src/components/forms/user/contacts.form';
import { FormPreloader } from 'src/components/preloader/form.preloader';
import {
  IContactCreate,
  IContact,
} from 'src/interfaces/user/contacts.interface';
import { HttpServices } from 'src/services';

export const EditContact: FC = (): JSX.Element => {
  const { id } = useParams();
  const [data, setData] = useState<IContact | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [serverError, setServerError] = useState<boolean>(false);
  const [isUpdating, setUpdating] = useState<boolean>(false);

  // Fetch contact data
  const getContactData = useCallback(async ({ id }: { id: number }) => {
    try {
      const response = await HttpServices.user.contact.show(id);
      if (response && response.status === 200) {
        setData(response.data?.data);
        setLoading(false);
      }
    } catch (error: any) {
      if (error) {
        setLoading(false);
        setServerError(true);
      }
    }
  }, []);

  useEffect(() => {
    getContactData({ id: Number(id) });
  }, [getContactData, id]);

  // handle form submit
  const handleFormSubmit = async (data: IContactCreate) => {
    try {
      setUpdating(true);
      const response = await HttpServices.user.contact.update(Number(id), data);
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
      <PageHeader title="Update Contact" />
      {/* Preloading preview */}
      {isLoading && !serverError && !data && <FormPreloader />}

      {/* Something went wrong preview */}
      {!isLoading && !data && serverError && <SomethingGoingWrong />}

      {/* Profile form preview */}
      {data && !isLoading && !serverError && (
        <ContactsForm
          data={data}
          loading={isUpdating}
          onSubmit={handleFormSubmit}
        />
      )}
    </Fragment>
  );
};
