import React, { useState } from "react";
import { View } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import Taro from "@tarojs/taro";
import MobileTable from "@yrobot/react-mobile-table";
import "@yrobot/react-mobile-table/lib/index.css";

const Goods: Taro.FC = () => {
  const [current, setCurrent] = useState(0);

  const tabList = [
    { title: "商品列表" },
    { title: "品牌管理" },
    { title: "类别管理" },
    { title: "单位管理" }
  ];

  const data = [
    ["ID", "姓名", "Age", "Address", "Name", "Family"], // title line
    [
      "1",
      "杨弱爆",
      32,
      "New York No. 1 Lake Park, New York No. 1 Lake Park",
      "2131",
      "123123123123"
    ],
    [
      "2",
      "杨弱爆",
      42,
      "London No. 2 Lake Park, London No. 2 Lake Park",
      "3121313123",
      "31231231233"
    ],
    [
      "3",
      "杨弱爆",
      32,
      "Sidney No. 1 Lake Park, Sidney No. 1 Lake Park",
      "312313123",
      "31231323233"
    ],
    ["4", "杨弱爆 jsdkk sdkksdqww", 36, "Sidney NOOOOOO", "2133", "12321313"]
  ];

  const handleClick = index => {
    setCurrent(index);
  };

  return (
    <View>
      <AtTabs
        current={current}
        tabList={tabList}
        swipeable={false}
        onClick={index => handleClick(index)}
      >
        <AtTabsPane current={current} index={0}>
          <View style={{ width: "100%" }}>
            <MobileTable data={data} columnMinWidth={60} />
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
            标签页二的内容
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={2}>
          <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
            标签页三的内容
          </View>
        </AtTabsPane>
      </AtTabs>
    </View>
  );
};

export default Goods;
