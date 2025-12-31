import classNames from 'classnames';
import React, { FC } from 'react';
import { twMerge } from 'tailwind-merge';

const mainStyles = 'font-semibold text-gray-700 dark:text-white';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  noMargin?: boolean;
  indicator?: boolean;
}

const H1: FC<HeadingProps> = ({ children, noMargin }) => {
  return (
    <h1
      className={classNames('text-3xl', {
        [mainStyles]: true,
        'mb-3': !noMargin,
      })}
    >
      {children}
    </h1>
  );
};

const H2: FC<HeadingProps> = ({ children, noMargin, indicator, className }) => {
  return (
    <h2
      className={classNames(twMerge('text-2xl', className), {
        [mainStyles]: true,
        'mb-2': !noMargin,
        relative: indicator,
      })}
    >
      <span className="relative z-10">{children}</span>
      {indicator && (
        <span className="absolute bottom-0.5 left-0 h-1.5 w-12 rounded-r-lg bg-primary dark:bg-primary"></span>
      )}
    </h2>
  );
};

const H3: FC<HeadingProps> = ({ children, noMargin, className }) => {
  return (
    <h3
      className={twMerge(
        mainStyles,
        classNames('text-xl', {
          'mb-2': !noMargin,
        }),
        className,
      )}
    >
      {children}
    </h3>
  );
};

const H4: FC<HeadingProps> = ({ children, noMargin, className, ...props }) => {
  return (
    <h4
      className={twMerge(
        mainStyles,
        classNames('text-base', {
          'mb-2': !noMargin,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </h4>
  );
};

const H5: FC<HeadingProps> = ({ children, noMargin, className }) => {
  return (
    <h5
      className={twMerge(
        mainStyles,
        classNames('text-sm', {
          'mb-1': !noMargin,
        }),
        className,
      )}
    >
      {children}
    </h5>
  );
};

const H6: FC<HeadingProps> = ({ children, noMargin, className }) => {
  return (
    <h6
      className={twMerge(
        mainStyles,
        classNames('text-xs', {
          [mainStyles]: true,
          'mb-2=1': !noMargin,
        }),
        className,
      )}
    >
      {children}
    </h6>
  );
};

const Heading = { H1, H2, H3, H4, H5, H6 };
export default Heading;
