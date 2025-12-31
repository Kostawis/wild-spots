import { Outlet } from "react-router-dom";

const AccountTemplate = () => {
  return (
    <section className="flex w-screen py-4 min-h-full-content bg-gray-50 dark:bg-gray-800">
      <div className="container flex flex-col py-4 mx-auto rounded-md sm:px-3 dark:bg-transparent">
        <Outlet />
      </div>
    </section>
  );
};

export default AccountTemplate;
