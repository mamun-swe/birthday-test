export const AppVersion: React.FC = (): JSX.Element => {
  return (
    <div className="fixed bottom-0 right-0 inline-flex px-2.5 py-1 text-center bg-black">
      <p className="text-xs font-normal text-white">V.{__APP_VERSION__}</p>
    </div>
  );
};
