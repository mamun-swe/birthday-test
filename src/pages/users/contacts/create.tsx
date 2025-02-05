import { FC, Fragment, useState } from 'react';
import { HotToast } from 'src/components/toaster';
import { PageHeader } from 'src/components/page-header';
import { HttpErrorHandeller } from 'src/utilities/helper';
import { ContactsForm } from 'src/components/forms/user/contacts.form';
import { IContactCreate } from 'src/interfaces/user/contacts.interface';
import { HttpServices } from 'src/services';

export const CreateContact: FC = (): JSX.Element => {
  const [isLoading, setLoading] = useState<boolean>(false);

  // handle form submit
  const handleFormSubmit = async (data: IContactCreate) => {
    try {
      setLoading(true);
      const response = await HttpServices.user.contact.create(data);
      if (response && response.status === 200) {
        HotToast.Success({ message: response.data?.message });
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
      <PageHeader title="Add Contacts" />
      <ContactsForm
        data={null}
        loading={isLoading}
        onSubmit={handleFormSubmit}
      />
    </Fragment>
  );
};
