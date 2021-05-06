import { View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React from "react";
import "./index.less";
type TabsProps = {
  current: number;
  tabList: { title: string; image: string }[];
  swipeable?: boolean;
  onClick: (index: number) => void;
};
const Tabs: Taro.FC<TabsProps> = props => {
  const { current, tabList, onClick } = props;
  const styleName = {
    transform: `translate3d(-${100 * current}%, 0px, 0px)`
    // width: `${100 * tabList.length}%`
  };
  return (
    <>
      <View className="tabs">
        {tabList.length > 0 &&
          tabList.map((tab, index) => (
            <View className="tabs-item" onClick={() => onClick(index)}>
              <View className="tabs-item-image">
                <Image
                  src={tab.image}
                  // src={require(`${tab.image}`)}
                  mode="scaleToFill"
                />
              </View>
              <View
                className={`tabs-item-title ${
                  index === current ? "title-choose" : ""
                }`}
              >
                {tab.title}
              </View>
              <View
                className={`tabs-item-line ${
                  index === current ? "item-choose" : ""
                }`}
              ></View>
            </View>
          ))}
      </View>
      <View className="pane-wrap" style={styleName}>
        {props.children}
      </View>
    </>
  );
};
export default Tabs;
