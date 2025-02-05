import { FC, Fragment, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { HttpServices } from 'src/services';
import { MdDelete, MdEdit } from 'react-icons/md';
import { DataTable } from 'src/components/datatable';
import { PageHeader } from 'src/components/page-header';
import { TableColumn } from 'react-data-table-component';
import { IconOutlineButton } from 'src/components/button';
import { IContact } from 'src/interfaces/user/contacts.interface';
import { ConfirmationModal } from 'src/components/modals/confirmation.modal';
import { IWillDelete } from 'src/interfaces';
import { HotToast } from 'src/components/toaster';

export const Dashboard: FC = (): JSX.Element => {
  const [data, setData] = useState<IContact[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [willDelete, setWillDelete] = useState<IWillDelete>({
    id: null,
    show: false,
    loading: false,
  });

  // Fetch users data
  const getUsers = useCallback(async () => {
    try {
      const response = await HttpServices.user.contact.index();
      if (response && response.status === 200) {
        setData(response.data?.data);
        setTotalRows(0);
      }

      setLoading(false);
    } catch (error: any) {
      if (error) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // handle per rows change
  const handlePageChange = () => {
    setCurrentPage(currentPage + 1);
  };

  // handle delete
  const handleDelete = async () => {
    try {
      setWillDelete({ ...willDelete, loading: true });
      const response = await HttpServices.user.contact.destroy(
        Number(willDelete.id),
      );
      if (response && response.status === 200) {
        HotToast.Success({ message: response.data?.message });
      }

      setWillDelete({ id: null, show: false, loading: false });
      getUsers();
    } catch (error: any) {
      if (error) {
        setWillDelete({ ...willDelete, loading: false });
      }
    }
  };

  /* data columns */
  const columns: TableColumn<IContact>[] = [
    {
      name: '#',
      width: '50px',
      cell: (_, index) => index + 1,
    },
    {
      name: 'Name',
      selector: (row) =>
        row.firstName + ' ' + row.middleName + ' ' + row.lastName,
    },
    {
      name: 'Relationship',
      width: '160px',
      selector: (row) => row.relationship,
    },
    {
      name: 'Birthday (English)',
      width: '160px',
      selector: (row) => row.dateOfBirthEnglish,
    },
    {
      name: 'Birthday (Misri)',
      width: '160px',
      selector: (row) => row.dateOfBirthMisri,
    },
    {
      name: 'Actions',
      width: '120px',
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Link to={`/user/contact-edit/${row.id}`}>
            <IconOutlineButton
              type="button"
              size="sm"
              icon={<MdEdit size={20} />}
            />
          </Link>
          <IconOutlineButton
            type="button"
            size="sm"
            icon={<MdDelete size={20} />}
            onClick={() =>
              setWillDelete({ id: row.id, show: true, loading: false })
            }
          />
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      <PageHeader title="Dashboard" icon="plus" path="/user/contact-create" />

      <DataTable
        data={data}
        columns={columns}
        loading={isLoading}
        pagination={false}
        paginationServer={false}
        totalRows={totalRows}
        handlePageChange={handlePageChange}
        noDataMessage="No available data yet."
      />

      {/* delete confirmation modal */}
      <ConfirmationModal
        open={willDelete.show}
        loading={willDelete.loading}
        message="Are you sure you want to delete this item?"
        onConfirm={handleDelete}
        onClose={() => setWillDelete({ id: null, show: false, loading: false })}
      />
    </Fragment>
  );
};
