import { FC } from "react";
import { Link } from "react-router-dom";
import Heading from "../../components/text/Heading";
import Paragraph from "../../components/text/Paragraph";

type DashboardTailProps = {
  title: string;
  route: string;
  description: string;
};

export const DashboardTail: FC<DashboardTailProps> = ({
  title,
  route,
  description,
}) => {
  return (
    <Link
      to={route}
      className="block rounded-md border border-gray-100 bg-white p-4 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-xl dark:border-gray-600 dark:bg-gray-700"
    >
      <Heading.H3 className="mb-0">{title}</Heading.H3>
      <Paragraph className="text-sm text-gray-500">{description}</Paragraph>
    </Link>
  );
};
