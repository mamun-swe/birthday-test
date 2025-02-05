import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { HttpServices } from 'src/services';
import { MdPeopleOutline } from 'react-icons/md';
import { PageHeader } from 'src/components/page-header';
import { HttpErrorHandeller } from 'src/utilities/helper';
import { DashboardCard } from 'src/components/card/dashboard.card';
import { IDashboard } from 'src/interfaces/admin/dashboard.interface';

export const Dashboard: FC = (): JSX.Element => {
  const [data, setData] = useState<IDashboard | null>(null);

  // Fetch dashboard data
  const getDashboardData = useCallback(async () => {
    try {
      const response = await HttpServices.admin.dashboard.index();
      if (response && response.status === 200) {
        setData(response.data?.data);
      }
    } catch (error: any) {
      if (error) {
        HttpErrorHandeller(error);
      }
    }
  }, []);

  useEffect(() => {
    getDashboardData();
  }, [getDashboardData]);

  return (
    <Fragment>
      <PageHeader title="Welcome Back!" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <DashboardCard
          icon={<MdPeopleOutline size={20} />}
          title={data?.admins?.toString() || '0'}
          description={'Total admin'}
        />

        <DashboardCard
          icon={<MdPeopleOutline size={20} />}
          title={data?.users?.toString() || '0'}
          description={'Total user'}
        />

        <DashboardCard
          icon={<MdPeopleOutline size={20} />}
          title={'0'}
          description={'XXX XXX'}
        />

        <DashboardCard
          icon={<MdPeopleOutline size={20} />}
          title={'0'}
          description={'XXX XXX'}
        />
      </div>
    </Fragment>
  );
};
