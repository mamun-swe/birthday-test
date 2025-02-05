import { FC } from 'react';

type PropsTypes = {
  type: 'success' | 'warning' | 'danger' | 'info';
  text: string;
};

export const Badge: FC<PropsTypes> = ({
  type,
  text,
}: PropsTypes): JSX.Element => {
  const typeColors = {
    success: 'bg-green-500/20 text-green-800',
    warning: 'bg-yellow-500/20 text-yellow-800',
    danger: 'bg-red-500/20 text-red-800',
    info: 'bg-blue-500/20 text-blue-800',
  };

  return (
    <div
      className={`inline-flex items-center px-2.5 py-1 rounded-sm ${typeColors[type]}`}
    >
      <p className="text-xs font-normal">{text}</p>
    </div>
  );
};
