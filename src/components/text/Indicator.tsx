import { FC } from 'react';

const Indicator: FC<{ children: string }> = ({ children }) => {
  return (
    <p className="text-sm font-medium text-primary-500 dark:text-primary-400">
      {children}
    </p>
  );
};

export default Indicator;
