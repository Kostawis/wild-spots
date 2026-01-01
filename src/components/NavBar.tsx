import { Link } from "react-router-dom";
import { routes } from "../router/routes";
import Button from "./Button";
// import { CustomNavLink } from "./CustomNavLink";
import { useSession } from "../context/sessionContext";
import { UserMenu } from "./UserMenu";

export const NavBar = () => {
  const { session } = useSession();
  const isLoggedIn = !!session?.user;

  return (
    <nav className="z-10 shrink-0 border-b border-gray-200 bg-white px-2 py-2.5 sm:px-4 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <div className="flex flex-nowrap items-center">
          <Link to={routes.home}>
            <span className="whitespace-nowrap text-xl font-semibold text-gray-900 dark:text-white">
              WildSpots
            </span>
          </Link>
        </div>
        <div className="flex w-full items-center justify-center space-x-2">
          {/* <CustomNavLink to={routes.home}>Home</CustomNavLink> */}
        </div>

        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <div className="flex space-x-2">
            <Link to={routes.login}>
              <Button>Zaloguj się</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
