import React, { FC } from 'react';
import { MdArrowUpward } from 'react-icons/md';

type PropsTypes = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export const DashboardCard: FC<PropsTypes> = ({
  icon,
  title,
  description,
}: PropsTypes): JSX.Element => {
  return (
    <div className="w-full rounded-2xl p-6 shadow-sm bg-white">
      <div className="w-10 h-10 flex items-center justify-center rounded-full text-sm mb-5 bg-primary/10 text-secondary">
        {icon}
      </div>
      <div className="mb-1">
        <p className="text-3xl font-light text-black">{title}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">{description}</p>
        <div className="flex items-center gap-1 text-primary">
          <p className="text-xs">%4.3</p>
          <MdArrowUpward className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};
