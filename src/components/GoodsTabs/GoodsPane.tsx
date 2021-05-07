import { View } from "@tarojs/components";
import React from "react";
import Taro from "@tarojs/taro";
type GoodsPaneProps = {
  current: number;
  index: number;
};
const CoodsPane: Taro.FC<GoodsPaneProps> = props => {
  const { current, index } = props;
  return <>{current === index && <View>{props.children}</View>}</>;
};
export default CoodsPane;
