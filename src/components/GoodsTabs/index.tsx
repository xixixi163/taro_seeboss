import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React from "react";
import "./index.less";
type GoodsTabsProps = {
  current: number;
  goodsTabs: {
    title: string;
  }[];
  onClick: (index: number) => void;
};
const GoodsTabs: Taro.FC<GoodsTabsProps> = props => {
  const { current, goodsTabs, onClick } = props;
  return (
    <>
      <View className="goods-tabs">
        {goodsTabs.length > 0 &&
          goodsTabs.map((tabs, index) => (
            <View
              className={
                current === index ? "goods-tabs-item active" : "goods-tabs-item"
              }
              onClick={() => onClick(index)}
            >
              {tabs.title}
            </View>
          ))}
      </View>
      <View>{props.children}</View>
    </>
  );
};
export default GoodsTabs;
