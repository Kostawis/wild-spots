import { Outlet } from "react-router-dom";

const HomeTemplate = () => {
  return (
    <section className="flex flex-1 bg-gray-50 dark:bg-gray-800">
      <Outlet />
    </section>
  );
};

export default HomeTemplate;
