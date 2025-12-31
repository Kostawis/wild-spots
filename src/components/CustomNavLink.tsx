import classNames from "classnames";
import { NavLink } from "react-router-dom";

export const CustomNavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classNames(
          "px-4 py-2 text-base font-semibold text-gray-900 hover:text-primary dark:text-white",
          {
            ["text-primary dark:text-primary"]: isActive,
          }
        )
      }
    >
      {children}
    </NavLink>
  );
};
