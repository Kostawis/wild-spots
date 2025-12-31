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
    <ul className="flex mb-6 list-none border-b border-gray-700 w-max gap-x-3">
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
