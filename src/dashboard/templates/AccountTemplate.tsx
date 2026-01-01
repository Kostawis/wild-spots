import { Outlet } from "react-router-dom";

const AccountTemplate = () => {
  return (
    <section className="flex w-screen flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto flex flex-col rounded-md px-2 py-4 sm:px-3 dark:bg-transparent">
        <Outlet />
      </div>
    </section>
  );
};

export default AccountTemplate;
