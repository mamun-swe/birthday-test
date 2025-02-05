import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconOutlineButton } from 'src/components/button';
import { MdAdd, MdKeyboardArrowLeft } from 'react-icons/md';

type PropsTypes = {
  title: string;
  icon?: 'back' | 'plus';
  path?: string;
  onClick?: () => void;
};

export const PageHeader: FC<PropsTypes> = ({
  title,
  icon,
  path,
  onClick,
}: PropsTypes): JSX.Element => {
  const navigate = useNavigate();

  // handle button click
  const handleButtonClick = () => {
    if (path) {
      navigate(path);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <p className="text-2xl lg:text-3xl font-semibold">{title}</p>

      {icon && path ? (
        <IconOutlineButton
          type="button"
          className="!p-1.5"
          icon={
            icon === 'back' ? (
              <MdKeyboardArrowLeft size={24} />
            ) : (
              <MdAdd size={24} />
            )
          }
          onClick={handleButtonClick}
        />
      ) : icon && onClick ? (
        <IconOutlineButton
          type="button"
          className="!p-1.5"
          icon={
            icon === 'back' ? (
              <MdKeyboardArrowLeft size={24} />
            ) : (
              <MdAdd size={24} />
            )
          }
          onClick={handleButtonClick}
        />
      ) : null}
    </div>
  );
};
