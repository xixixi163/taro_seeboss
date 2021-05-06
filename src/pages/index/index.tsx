import React, { useState, useEffect } from "react";
import { View, ScrollView } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import Taro from "@tarojs/taro";
import Table from "../../components/Table/table";
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
  }, []);

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

  const tableHeader = [
    {
      prop: "datetime",
      width: 150,
      label: "日期"
    },
    {
      prop: "sign_in_time",
      width: 150,
      label: "上班时间"
    },
    {
      prop: "sign_out_time",
      width: 150,
      label: "下班时间"
    },
    {
      prop: "work_hour",
      width: 150,
      label: "工时"
    },
    {
      prop: "status",
      width: 150,
      label: "状态"
    }
  ];

  const tableHeader2 = [
    {
      prop: "datetime",
      width: 150,
      label: "日期",
      color: "#55C355"
    },
    {
      prop: "sign_in_time",
      width: 152,
      label: "上班时间"
    },
    {
      prop: "sign_out_time",
      width: 152,
      label: "下班时间"
    },
    {
      prop: "work_hour",
      width: 110,
      label: "工时"
    },
    {
      prop: "status",
      width: 110,
      label: "状态"
    },
    {
      prop: "sign_out_time",
      width: 200,
      label: "下班时间"
    },
    {
      prop: "work_hour",
      width: 200,
      label: "工时"
    },
    {
      prop: "status",
      width: 200,
      label: "状态"
    }
  ];

  const row = [
    {
      id: 1,
      status: "正常",
      datetime: "04-01",
      sign_in_time: "09:30:00",
      sign_out_time: "18:30:00",
      work_hour: 8
    },
    {
      id: 2,
      status: "迟到",
      datetime: "04-02",
      sign_in_time: "10:30:00",
      sign_out_time: "18:30:00",
      work_hour: 7
    },
    {
      id: 29,
      status: "正常",
      datetime: "04-03",
      sign_in_time: "09:30:00",
      sign_out_time: "18:30:00",
      work_hour: 8
    },
    {
      id: 318,
      status: "休息日",
      datetime: "04-04",
      sign_in_time: "",
      sign_out_time: "",
      work_hour: ""
    },
    {
      id: 319,
      status: "正常",
      datetime: "04-05",
      sign_in_time: "09:30:00",
      sign_out_time: "18:30:00",
      work_hour: 8
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
          <Table data={row} headers={tableHeader} border stripe />
        </TabsPane>
        <TabsPane current={current} index={1}>
          <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
            标签页二的内容
          </View>
        </TabsPane>
        <TabsPane current={current} index={2}>
          <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
            标签页三的内容
          </View>
        </TabsPane>
        <TabsPane current={current} index={3}>
          <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
            标签页四的内容
          </View>
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
