import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { FC } from "react";
import Subtitle from "../text/Subtitle";
import Paragraph from "../text/Paragraph";

const AccountHeaderMainInfoTail: FC<{
  title: string;
  value: string;
  icon: IconDefinition;
}> = ({ title, value, icon }) => (
  <div className="flex items-center gap-x-3">
    <FontAwesomeIcon icon={icon} className="text-3xl text-gray-300" />
    <div>
      <Subtitle className="text-sm">{title}</Subtitle>
      <Paragraph className="font-bold tracking-wider">{value}</Paragraph>
    </div>
  </div>
);

export default AccountHeaderMainInfoTail;
