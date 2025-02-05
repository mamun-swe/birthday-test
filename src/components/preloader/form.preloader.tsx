import { FC, Fragment } from 'react';
import { generateArrayFromNumber } from 'src/utilities/helper';

// form preloader component
export const FormPreloader: FC = (): JSX.Element => (
  <Fragment>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {generateArrayFromNumber(6).map((_, i) => (
        <div
          key={i}
          className="w-full h-[56px] bg-slate-200 animate-pulse rounded-md"
        />
      ))}
    </div>

    <div className="text-right">
      <div className="w-32 h-[50px] bg-slate-200 animate-pulse rounded-md mx-auto" />
    </div>
  </Fragment>
);
