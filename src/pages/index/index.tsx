import { View } from "@tarojs/components";
import { Component } from "react";
class Index extends Component {
  state = {
    msg: "Hello World!"
  };

  onReady() {
    console.log("onReady");
  }

  render() {
    return <View>{this.state.msg}</View>;
  }
}

export default Index;
