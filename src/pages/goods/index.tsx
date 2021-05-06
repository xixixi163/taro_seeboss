import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import { AtTabBar, AtButton } from "taro-ui";

const Index: Taro.FC = () => {
  const [current, setCurrent] = useState(0);

  const goUser = () => {
    Taro.navigateTo({
      url: "/pages/user/user"
    });
  };

  return (
    <View>
      <AtButton onClick={goUser}>点击</AtButton>
    </View>
  );
};

export default Index;
