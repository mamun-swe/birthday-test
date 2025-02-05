import { FC, Fragment, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import { DataTable } from 'src/components/datatable';
import { PageHeader } from 'src/components/page-header';
import { TableColumn } from 'react-data-table-component';
import { IconOutlineButton } from 'src/components/button';
import { IUser } from 'src/interfaces/admin/user.interface';
import { HttpServices } from 'src/services';

export const UserIndex: FC = (): JSX.Element => {
  const [data, setData] = useState<IUser[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [totalRows, setTotalRows] = useState<number>(0);

  // Fetch users data
  const getUsers = useCallback(async ({ page }: { page: number }) => {
    try {
      const response = await HttpServices.admin.user.index({ page });
      if (response && response.status === 200) {
        setData(response.data?.data?.data);
        setTotalRows(response.data?.data?.total);
      }

      setLoading(false);
    } catch (error: any) {
      if (error) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    getUsers({ page: currentPage });
  }, [getUsers, currentPage]);

  // handle per rows change
  const handlePageChange = () => {
    setCurrentPage(currentPage + 1);
  };

  /* data columns */
  const columns: TableColumn<IUser>[] = [
    {
      name: 'id',
      width: '50px',
      cell: (_, index) => index + 1,
    },
    {
      name: 'Name',
      width: '200px',
      selector: (row) =>
        row.firstName + ' ' + row.middleName + ' ' + row.lastName,
    },
    {
      name: 'Contact',
      cell: (row) => (
        <div className="min-w-28">
          <p>{row.contactNumber}</p>
        </div>
      ),
    },
    {
      name: 'Email',
      cell: (row) => (
        <div className="min-w-60">
          <p>{row.email}</p>
        </div>
      ),
    },
    {
      name: 'Birthday (English)',
      width: '160px',
      selector: (row) => row.dateOfBirthEnglish,
    },
    {
      name: 'Birthday (Misri)',
      width: '220px',
      selector: (row) => row.dateOfBirthMisri,
    },
    {
      name: 'Action',
      width: '90px',
      cell: (row) => (
        <Link to={`/admin/users/${row.id}/edit`}>
          <IconOutlineButton
            type="button"
            size="sm"
            icon={<MdEdit size={20} />}
          />
        </Link>
      ),
    },
  ];

  return (
    <Fragment>
      <PageHeader title="List of users" />

      <DataTable
        data={data}
        columns={columns}
        loading={isLoading}
        pagination={true}
        paginationServer={true}
        totalRows={totalRows}
        handlePageChange={handlePageChange}
        noDataMessage="No available users yet."
      />
    </Fragment>
  );
};
