import React, { useState } from "react";
import { View } from "@tarojs/components";
import "./index.less";
import Taro, { usePullDownRefresh } from "@tarojs/taro";
import Search from "@/components/Search";
import Tabs from "@/components/Tabs";
import TabsPane from "@/components/Tabs/TabsPane";
import {
  BrandTable,
  UnitTable,
  CategoryTable,
  RecordTable
} from "./components";

const tabList = [
  {
    title: "品牌管理",
    image:
      "https://caidc.oss-cn-beijing.aliyuncs.com/taro-boss/brands-manage.png"
  },
  {
    title: "类别管理",
    image:
      "https://caidc.oss-cn-beijing.aliyuncs.com/taro-boss/category-manage.png"
  },
  {
    title: "商品管理",
    image:
      "https://caidc.oss-cn-beijing.aliyuncs.com/taro-boss/goods-manage.png"
  },
  {
    title: "单位管理",
    image: "https://caidc.oss-cn-beijing.aliyuncs.com/taro-boss/unit-manage.png"
  }
];

const Goods: Taro.FC = () => {
  const [current, setCurrent] = useState(0);
  usePullDownRefresh(() => {
    console.log("下拉刷新");
    setTimeout(() => {
      // 停止下拉刷新
      Taro.stopPullDownRefresh();
    }, 1000);
  });
  // useReachBottom(() => {
  //   console.log("onReachBottom");
  //   if (current === 0) {
  //     setBrandPage(() => {
  //       let current = brandPage;
  //       return (current += 1);
  //     });
  //   }
  // });
  // const loadMore = () => {
  //   console.log("load");
  //   if (current === 0) {
  //     setBrandPage(() => {
  //       let cur = brandPage;
  //       return (cur += 1);
  //     });
  //   } else if (current === 1) {
  //     setCatagoryPage(() => {
  //       let cur = catagoryPage;
  //       return (cur += 1);
  //     });
  //   } else if (current === 2) {
  //     setGoodsPage(() => {
  //       let cur = goodsPage;
  //       return (cur += 1);
  //     });
  //   } else if (current === 3) {
  //     setUnitPage(() => {
  //       let cur = unitPage;
  //       return (cur += 1);
  //     });
  //   }
  // };

  const handleClick = async (index: number) => {
    setCurrent(index);
  };

  return (
    <View className="base">
      <View className="base-head">
        <View className="head-title">老板通</View>
        <View className="head-search">
          <Search></Search>
        </View>
      </View>
      <Tabs
        current={current}
        tabList={tabList}
        swipeable={false}
        onClick={index => handleClick(index)}
      >
        <TabsPane current={current} index={0}>
          <BrandTable />
        </TabsPane>
        <TabsPane current={current} index={1}>
          <CategoryTable />
        </TabsPane>
        <TabsPane current={current} index={2}>
          <RecordTable />
        </TabsPane>
        <TabsPane current={current} index={3}>
          <UnitTable />
        </TabsPane>
      </Tabs>
    </View>
  );
};

export default Goods;
