import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const TabItem: FC<{
  to: string;
  hasNestedUrl?: boolean;
  children: string;
}> = (props) => {
  const { to, hasNestedUrl, children } = props;

  return (
    <li>
      <NavLink
        to={to}
        end={!hasNestedUrl}
        className={({ isActive }) =>
          twMerge(
            'block cursor-pointer rounded-t-md border-b border-transparent px-4 py-1.5 tracking-wide text-gray-700 transition-colors hover:border-primary dark:text-white',
            classNames({
              'dark:text-primary text-primary border-primary': isActive,
            }),
          )
        }
      >
        {children}
      </NavLink>
    </li>
  );
};

export default TabItem;
