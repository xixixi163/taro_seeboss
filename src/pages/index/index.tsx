import React, { useState, useEffect } from "react";
import { View, ScrollView, Switch } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import Taro from "@tarojs/taro";
import Table from "../../components/Table/table";
import { TableHeader, TableRow } from "../../components/Table/types";
import { GoodsUnitType } from "../../res-req";
import {
  // getGoodBrandsList,
  getGoodsUnits,
  addGoodsUnits,
  // getGoodsCategory,
  getGoodBrandsList,
  getGoodsCategoryById,
  getAllGoodsCategory,
  getGoodsRecord,
  addGoodsRecord,
  updateGoodsRecord,
  removeGoodsRecord,
  getGoodsRecordById,
  getGoodsRecordWithStock,
  putGoodsShelves,
  offGoodsShelves,
  getSuppliersRecord
} from "../../services/goods";
import "./index.less";
import Search from "../../components/Search";
import Tabs from "../../components/Tabs";
import TabsPane from "../../components/Tabs/TabsPane";

const tabList = [
  {
    title: "品牌管理",
    image: require("../../assets/images/brands-manage.png")
  },
  {
    title: "类别管理",
    image: require("../../assets/images/category-manage.png")
  },
  {
    title: "商品管理",
    image: require("../../assets/images/goods-manage.png")
  },
  { title: "单位管理", image: require("../../assets/images/unit-manage.png") }
];

const brandData: TableRow[] = [
  {
    id: 1,
    name: "蛋黄酥",
    isCheck: false
  },
  {
    id: 2,
    isCheck: false,
    name: "乐事薯片"
  },
  {
    id: 29,
    name: "上好佳洋葱鱿鱼圈",
    isCheck: false
  },
  {
    id: 318,
    name: "七喜",
    isCheck: false
  },
  {
    id: 319,
    name: "芬达橙味汽水",
    isCheck: false
  }
];

const unitData = [
  {
    id: 123,
    name: "单位1",
    isCheck: false
  }
];

const Goods: Taro.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // getGoodBrandsList().then(response => console.log(response));
    // getGoodsUnits().then(response => console.log(response));
    // getGoodsCategory();
    // addGoodsUnits({ name: "个" });
    // getGoodsCategoryById({
    //   goodsCategoryUuid: "02cf176f06eed6610f0b1c5c0262bd58"
    // });
    // getAllGoodsCategory();
    // getGoodsRecord({ currPage: 1, pageSize: 2 });
    // addGoodsRecord();
    // updateGoodsRecord();
    // removeGoodsRecord({ goodsUuid: "ed6ca791f201d631cd70f4c769551137" });
    // getGoodsRecordWithStock({ currPage: 1, pageSize: 2 });
    // offGoodsShelves({
    //   goodsUuid: "cbc6c084f864fc18e06d9750d7302a8a"
    // });
    // getSuppliersRecord({
    //   currPage: 1,
    //   pageSize: 2
    // });
    getGoodsRecordById("08e2665750f0ab4e195b9795f55e468a");
  }, []);

  const tableHeader: TableHeader[] = [
    {
      prop: "name",
      label: "品牌名称"
    },
    {
      prop: "status",
      label: "是否默认",
      render: () => (
        <>
          <Switch />
        </>
      )
    },
    {
      prop: "operation",
      label: "操作",
      render: () => (
        <>
          <View
            className="fa fa-pencil"
            style={{
              marginRight: "30rpx",
              fontSize: "24px",
              color: "#0096FC"
            }}
          ></View>

          <View
            className="fa fa-trash-o"
            style={{ fontSize: "24px", color: "#0096FC" }}
          ></View>
        </>
      )
    }
  ];

  const tableHeader2: TableHeader[] = [
    {
      label: "单位名称",
      prop: "name"
    },
    {
      prop: "status",
      label: "是否默认",
      render: () => (
        <>
          <Switch />
        </>
      )
    },
    {
      prop: "operation",
      label: "操作",
      render: () => (
        <>
          <View
            className="fa fa-pencil"
            style={{
              marginRight: "30rpx",
              fontSize: "24px",
              color: "#0096FC"
            }}
          ></View>

          <View
            className="fa fa-trash-o"
            style={{ fontSize: "24px", color: "#0096FC" }}
          ></View>
        </>
      )
    }
  ];

  const handleClick = index => {
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
          <Table data={brandData} headers={tableHeader} />
        </TabsPane>
        <TabsPane current={current} index={1}>
          <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
            标签页二的内容
          </View>
        </TabsPane>
        <TabsPane current={current} index={2}></TabsPane>
        <TabsPane current={current} index={3}>
          <Table data={unitData} headers={tableHeader2} />
        </TabsPane>
      </Tabs>
      {/* <AtTabs
        current={current}
        tabList={tabList}
        swipeable={false}
        onClick={index => handleClick(index)}
      >
        <AtTabsPane current={current} index={0}>
          <Table data={row} headers={tableHeader} border stripe />
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
      </AtTabs> */}
    </View>
  );
};

export default Goods;
