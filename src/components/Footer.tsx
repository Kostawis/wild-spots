import { Link } from "react-router-dom";

import { useWindowWidthState } from "../context/windowWidthContext";
import { routes } from "../router/routes";
import Heading from "./text/Heading";
import Paragraph from "./text/Paragraph";

const Footer = () => {
  const { isMobile } = useWindowWidthState();

  return (
    <footer className="bg-white border-t border-gray-200 shrink-0 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex flex-row items-center justify-between px-2 py-4 mx-auto sm:px-4">
        <div className="flex flex-row">
          <Link
            to={routes.home}
            className="flex items-center justify-center font-medium text-gray-900"
          >
            <Heading.H4 noMargin>WildSpots</Heading.H4>
          </Link>
          <Paragraph className="pl-4 mt-0 ml-4 text-sm border-l-2 border-gray-400">
            KartForge © {new Date().getFullYear()} WildSpots
          </Paragraph>
        </div>
        {!isMobile && (
          <div>
            <Paragraph className="text-sm underline">
              <Link to={routes.privacyPolicy}>Polityka prywatności</Link>
            </Paragraph>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
