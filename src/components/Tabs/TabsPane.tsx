import { View } from "@tarojs/components";
import React from "react";
import "./index.less";
type TabsPaneProps = {
  current: number;
  index: number;
};
const TabsPane: Taro.FC<TabsPaneProps> = props => {
  const { current, index } = props;

  return <View className="tabs-pane">{props.children}</View>;
};
export default TabsPane;
