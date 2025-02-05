import { FC } from 'react';
import { MdMenu } from 'react-icons/md';
import { Images } from 'src/utilities/images';
import { IconOutlineButton } from 'src/components/button';

type PropsTypes = {
  onToggle: () => void;
};

export const Navbar: FC<PropsTypes> = ({
  onToggle,
}: PropsTypes): JSX.Element => {
  return (
    <div className="lg:hidden sticky top-0 left-0 z-40 p-2">
      <div className="w-full p-3 rounded-xl flex justify-between items-center bg-themeblack">
        <div className="w-11 h-11 rounded-full overflow-hidden">
          <img src={Images.Logo} alt="Logo" className="min-w-full min-h-full" />
        </div>

        <div>
          <IconOutlineButton
            type="button"
            className="!p-2.5 !border-none !text-black"
            icon={<MdMenu size={24} />}
            onClick={onToggle}
          />
        </div>
      </div>
    </div>
  );
};
