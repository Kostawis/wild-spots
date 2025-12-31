import { FC } from "react";
import Heading from "../../components/text/Heading";
import Paragraph from "../../components/text/Paragraph";
import { Tag } from "../../components/atoms/Tag";
import { Enums } from "../../supabase/database.types";

type PlaceTailProps = {
  name: string;
  description: string;
  status: Enums<"place_status">;
};

export const PlaceTail: FC<PlaceTailProps> = ({
  name,
  description,
  status,
}) => {
  return (
    <div className="rounded-md border border-gray-100 bg-white p-4 shadow-md dark:border-gray-600 dark:bg-gray-700">
      <span className="flex justify-between">
        <Heading.H3>{name}</Heading.H3>
        <Tag variant="status" value={status} className="mt-1" />
      </span>
      <Paragraph>{description}</Paragraph>
    </div>
  );
};
