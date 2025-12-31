import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { routes } from "../../router/routes";
import { useSession } from "../../context/sessionContext";

const PrivateRoute: FC = () => {
  const { session } = useSession();

  return session !== undefined ? <Outlet /> : <Navigate to={routes.home} />;
};

export default PrivateRoute;
