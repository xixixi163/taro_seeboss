import { View, Image } from "@tarojs/components";
import "./index.less";

type TableTabsProps = {
  hidden?: boolean;
  tabData: {
    tabText: string;
    tabIcon: string;
  }[];
};
const TableTabs: React.FC<TableTabsProps> = props => {
  const { hidden, tabData } = props;
  console.log(tabData);

  const className = hidden ? `table-tabs hide` : `table-tabs show`;
  return (
    <View className={className} hidden={hidden}>
      {tabData.length > 0 &&
        tabData.map(item => (
          <View className="table-tabs-item">
            <View className="icon">
              <Image src={item.tabIcon} hidden={!item.tabIcon} />
            </View>
            <View className="text">{item.tabText}</View>
          </View>
        ))}
    </View>
  );
};
export default TableTabs;
