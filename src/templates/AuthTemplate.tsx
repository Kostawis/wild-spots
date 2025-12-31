import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../context/sessionContext";

export const AuthTemplate: FC = () => {
  const { session } = useSession();
  if (session) return <Navigate to="/" />;

  return (
    <section className="h-full-content w-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex h-full justify-center">
        <div
          className={
            "mb-40 h-fit w-almost-full rounded-lg bg-white shadow sm:max-w-lg md:mt-10 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800"
          }
        >
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};
