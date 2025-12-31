import { FC } from "react";
import Heading from "./text/Heading";
import Paragraph from "./text/Paragraph";

interface InformationBoxProps {
  title?: string;
  children: React.ReactNode;
}

export const InformationBox: FC<InformationBoxProps> = ({
  title,
  children,
}) => {
  return (
    <div className="rounded-md border border-orange-300 bg-orange-50 px-4 py-2">
      <Heading.H4 className="-mb-.5 text-orange-500">{title}</Heading.H4>
      <Paragraph className="text-sm text-orange-400">{children}</Paragraph>
    </div>
  );
};
