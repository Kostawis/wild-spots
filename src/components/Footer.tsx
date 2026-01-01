import { Link } from "react-router-dom";

import { routes } from "../router/routes";
import Heading from "./text/Heading";
import Paragraph from "./text/Paragraph";

const Footer = () => {
  return (
    <footer className="shrink-0 border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="container mx-auto flex flex-row items-center px-5 py-4">
        <Link
          to={routes.home}
          className="flex items-center justify-center font-medium text-gray-900"
        >
          <Heading.H4 noMargin>WildSpots</Heading.H4>
        </Link>
        <Paragraph className="ml-4 mt-0 border-l-2 border-gray-400 pl-4 text-sm">
          KartForge © {new Date().getFullYear()} WildSpots
        </Paragraph>
        <span className="ml-auto mt-4 inline-flex justify-start"></span>
      </div>
    </footer>
  );
};

export default Footer;
