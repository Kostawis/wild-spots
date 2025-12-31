import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { twMerge } from "tailwind-merge";
import { routes } from "../../router/routes";

const linkClassNames = ({ isActive }: { isActive: boolean }) =>
  twMerge(
    "pr-3 py-px text-white border-gray-500 transition-colors hover:text-primary",
    classNames({
      "text-primary": isActive,
    }),
  );

const SettingsTemplate = () => {
  return (
    <div className="flex gap-x-6">
      <nav className="flex flex-col gap-y-2 border-r border-gray-500 px-4 py-2">
        <NavLink
          to={routes.dashboard.settings.accountSettings}
          end
          className={linkClassNames}
        >
          Ustawienia konta
        </NavLink>
        <NavLink
          to={routes.dashboard.settings.pilotInformations}
          className={linkClassNames}
        >
          Informacje o pilocie
        </NavLink>
      </nav>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsTemplate;
