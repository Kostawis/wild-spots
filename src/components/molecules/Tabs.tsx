import { FC } from "react";
import TabItem from "../atoms/TabItem";

type TabsProps = {
  tabs: {
    name: string;
    route: string;
    hasNestedUrl?: boolean;
  }[];
};

const Tabs: FC<TabsProps> = (props) => {
  const { tabs } = props;

  return (
    <ul className="mb-6 flex w-max list-none gap-x-3 border-b border-gray-700">
      {tabs.map(({ route, name, hasNestedUrl }) => {
        return (
          <TabItem
            key={`${route}_${name}`}
            to={route}
            hasNestedUrl={hasNestedUrl}
          >
            {name}
          </TabItem>
        );
      })}
    </ul>
  );
};

export default Tabs;
