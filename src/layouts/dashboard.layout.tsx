import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from 'src/components/navbar';
import { PrimaryDrawer } from 'src/components/drawer';
import { SidebarMenu } from 'src/components/sidebar-menu';

export const DashboardLayout: FC = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="w-full min-h-screen">
      {/* Navbar container in small screen */}
      <Navbar onToggle={() => setOpen(true)} />

      {/* Sidebar drawer in small screen */}
      <PrimaryDrawer open={open} onClick={() => setOpen(false)} />

      {/* Sidebar container in large screen */}
      <div className="fixed top-0 left-0 bottom-0 w-[300px] hidden lg:block overflow-hidden p-6 rounded-r-[45px] bg-themeblack">
        <SidebarMenu />
      </div>

      {/* Outlet container */}
      <div className="lg:grow lg:pl-[324px] p-2 lg:p-6">
        <div className="min-h-[84vh] lg:min-h-[94vh] rounded-3xl p-4 lg:p-10 bg-themelight">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
