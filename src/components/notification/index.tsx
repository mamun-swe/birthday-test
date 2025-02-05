import { FC } from 'react';
import { FaBirthdayCake } from 'react-icons/fa';

type PropsTypes = {
  title: string;
  description: string;
  is_last_item: boolean;
};

export const Notification: FC<PropsTypes> = ({
  title,
  description,
  is_last_item,
}: PropsTypes): JSX.Element => {
  return (
    <div
      className={`w-full p-4 flex gap-3 items-center bg-white ${
        !is_last_item ? 'border-b' : ''
      }`}
    >
      <div className="w-6 h-6 flex-none">
        <FaBirthdayCake size={23} className="text-secondary" />
      </div>
      <div className="flex-grow">
        <p className="text-sm font-semibold mb-0.5 text-themeblack">{title}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
};

// Notification preloader
export const NotificationPreloader: FC = (): JSX.Element => {
  return (
    <div className="w-full p-4 flex gap-3 items-center bg-white border-b">
      <div className="w-8 h-8 bg-slate-200 animate-pulse" />
      <div className="flex-grow">
        <div className="w-1/3 h-2 rounded-full mb-2 bg-slate-200 animate-pulse" />
        <div className="w-1/2 h-2 rounded-full bg-slate-200 animate-pulse" />
      </div>
    </div>
  );
};
