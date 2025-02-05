import React, { Fragment } from 'react';
import { SidebarMenu } from 'src/components/sidebar-menu';

type PropsTypes = {
  open: boolean;
  onClick: () => void;
};

export const PrimaryDrawer: React.FC<PropsTypes> = ({
  open,
  onClick,
}: PropsTypes): JSX.Element => {
  return (
    <Fragment>
      {open && (
        <div
          onClick={onClick}
          className="fixed inset-0 bg-white bg-opacity-90 z-40 transition-opacity duration-300 lg:hidden"
        />
      )}
      <div
        className={`p-6 fixed top-0 left-0 h-full w-72 z-50 rounded-r-[45px] transform transition-transform duration-300 ease-in-out lg:hidden bg-themeblack text-white ${
          open ? 'translate-x-0' : '-translate-x-full'
        } `}
      >
        <SidebarMenu />
      </div>
    </Fragment>
  );
};
