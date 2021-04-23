import { Component } from "react";
import { View, Text } from "@tarojs/components";
import { AtButton } from "taro-ui";
import { AtTabs, AtTabsPane } from "taro-ui";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "taro-ui/dist/style/components/tabs.scss";
import "./orders.less";

export default class Orders extends Component {
  state = {
    message: "Hello",
    current: 0
  };

  componentWillMount() {
    console.log("order");
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleClick(index) {
    this.setState({
      current: index
    });
  }

  render() {
    const tabList = [
      { title: "标签页1" },
      { title: "标签页2" },
      { title: "标签页3" }
    ];
    return (
      <View className="orders">
        <AtTabs
          current={this.state.current}
          tabList={tabList}
          onClick={this.handleClick.bind(this)}
        >
          <AtTabsPane current={this.state.current} index={0}>
            <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
              标签页一的内容
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
              标签页二的内容
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
              标签页三的内容
            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
    );
  }
}
