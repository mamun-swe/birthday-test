import { Images } from 'src/utilities/images';

export const SomethingGoingWrong: React.FC = (): JSX.Element => {
  return (
    <div className="p-5 2xl:p-10 w-full rounded-xl mx-auto overflow-hidden sm:w-[500px] text-center bg-white">
      <img
        src={Images.NoContent}
        alt="No content available."
        className="mx-auto w-[250px] h-[250px] sm:w-[280px] sm:h-[280px]"
      />
      <p className="text-lg font-medium text-muted mt-4">
        Something going wrong!!!
      </p>
      <p className="text-sm font-normal text-muted">Please, try again later.</p>
    </div>
  );
};
