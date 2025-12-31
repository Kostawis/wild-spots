import { FC } from "react";
import { Outlet } from "react-router-dom";

const FullPageInfoTemplate: FC = () => {
  return (
    <section className="dark:bg-gray-800">
      <div className="container flex items-center px-6 py-12 mx-auto">
        <div className="mb-[18vh] mt-[24%]">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default FullPageInfoTemplate;
