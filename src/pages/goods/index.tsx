import { View } from "@tarojs/components";
import Taro, { Config } from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import GoodsList from "../../components/GoodsList";
import GoodsTabs from "../../components/GoodsTabs";
import GoodsPane from "../../components/GoodsTabs/GoodsPane";
import Search from "../../components/Search";
import "./index.less";

const Goods: Taro.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {}, []);
  const goUser = () => {
    Taro.navigateTo({
      url: "/pages/user/user"
    });
  };
  const goodsTabs = [{ title: "综合" }, { title: "新品" }, { title: "热卖" }];
  const goodsList = [
    {
      goodsUuid: "0327a761baac1e9a66b4586585cd429d",
      goodsName: "轩妈蛋黄酥",
      sellingPrice: 13.9,
      goodsImg: ""
    },
    {
      goodsUuid: "0327a761baac1e9a66b4586585cd429d",
      goodsName: "一麦番半熟芝士蛋糕",
      sellingPrice: 9.8,
      goodsImg: ""
    },
    {
      goodsUuid: "529d9bdd8ce1bf37c600635000686f3f",
      goodsName: "轩妈蛋黄酥",
      sellingPrice: 13.9,
      goodsImg: ""
    },
    {
      goodsUuid: "529d9bdd8ce1bf37c600635000686f3f",
      goodsName: "一麦番半熟芝士蛋糕",
      sellingPrice: 9.8,
      goodsImg: ""
    },
    {
      goodsUuid: "5",
      goodsName: "轩妈蛋黄酥",
      sellingPrice: 13.9,
      goodsImg: ""
    },
    {
      goodsUuid: "6",
      goodsName: "一麦番半熟芝士蛋糕",
      sellingPrice: 9.8,
      goodsImg: ""
    },
    {
      goodsUuid: "7",
      goodsName: "轩妈蛋黄酥",
      sellingPrice: 13.9,
      goodsImg: ""
    },
    {
      goodsUuid: "8",
      goodsName: "一麦番半熟芝士蛋糕",
      sellingPrice: 9.8,
      goodsImg: ""
    },
    {
      goodsUuid: "9",
      goodsName: "轩妈蛋黄酥",
      sellingPrice: 13.9,
      goodsImg: ""
    }
  ];
  const onClick = (index: number) => {
    setCurrent(index);
  };
  return (
    <View className="goods">
      <View className="goods-search">
        <Search style={{ backgroundColor: "#f2f3f8" }}></Search>
      </View>
      <GoodsTabs
        goodsTabs={goodsTabs}
        current={current}
        onClick={index => onClick(index)}
      >
        <GoodsPane current={current} index={0}>
          <GoodsList goodsList={goodsList}></GoodsList>
        </GoodsPane>
        <GoodsPane current={current} index={1}>
          2
        </GoodsPane>
      </GoodsTabs>
    </View>
  );
};

export default Goods;
