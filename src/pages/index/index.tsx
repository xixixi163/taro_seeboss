import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import { AtTabBar, AtButton } from "taro-ui";
import "taro-ui/dist/style/components/tab-bar.scss";
import "taro-ui/dist/style/components/badge.scss";
import "taro-ui/dist/style/components/button.scss";

const Index: Taro.FC = () => {
  const [current, setCurrent] = useState(0);

  const goUser = () => {
    Taro.navigateTo({
      url: "/pages/user/user"
    });
  };

  return (
    <View>
      报表
      <AtButton onClick={goUser}>点击</AtButton>
    </View>
  );
};

export default Index;
