import { Component } from "react";
import { View, Text } from "@tarojs/components";
import { AtButton } from "taro-ui";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./orders.less";

export default class Orders extends Component {
  state = {
    message: "Hello"
  };

  componentWillMount() {
    console.log("order");
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="orders">
        <Text>{`orders ${this.state.message}`}</Text>
        <AtButton type="primary">order</AtButton>
      </View>
    );
  }
}
