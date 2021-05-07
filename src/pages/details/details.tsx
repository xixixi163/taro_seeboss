import { View, Image } from "@tarojs/components";
import React, { useState } from "react";
import Taro, { getCurrentInstance, useDidShow, useReady } from "@tarojs/taro";
import { getGoodsRecordById } from "../../services/goods";
import { IResponse } from "../../res-req";
import "./details.less";
import { AtButton } from "taro-ui";

const Details = () => {
  const [goodsCategoryUuid, setGoodsCategoryUuid] = useState(
    getCurrentInstance().router.params.goodsId
  );
  const [goodsDetail, setGoodsDetail] = useState({
    goodsName: "轩妈蛋黄酥",
    purchasePrice: 800,
    sellingPrice: 600
  });
  useDidShow(async () => {
    console.log(goodsCategoryUuid);
    console.log(getCurrentInstance().router);

    // 请求商品数据
    try {
      const res: IResponse = await getGoodsRecordById(
        getCurrentInstance().router.params.goodsId
      );
      if (res.code === "0000") {
        setGoodsDetail(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  });
  useReady(() => {});
  return (
    <View className="goods-detail">
      <View className="goods-detail-img">
        <Image
          src={require("../../assets/images/goodimg.png")}
          mode="aspectFill"
        />
      </View>
      <View className="goods-detail-info">
        <View className="title">轩妈蛋黄酥</View>
        <View className="price">
          <View className="inline">
            采购价：<View className="red">800</View>
          </View>
          <View className="inline">
            零售价：<View className="red">600</View>
          </View>
          <View className="inline">
            批发价：<View className="red">680</View>
          </View>
          <View className="inline">
            参考进货价：<View className="red">800</View>
          </View>
        </View>
        <View className="list">
          <View>
            商品库存：<View className="black">2000</View>
          </View>
          <View>
            商品规格：<View className="black">500克</View>
          </View>
        </View>
      </View>
      <View className="goods-detail-info">
        <View className="title">商品信息</View>
        <View className="list space">
          <View>
            商品名称：<View className="black">轩妈</View>
          </View>
          <View>
            商品分类：<View className="black">蛋糕饼干</View>
          </View>
          <View>
            内部编码：<View className="black">A1234567890</View>
          </View>
        </View>
        <View className="operation">
          <View className="operation-btn inline">下架</View>
          <View className="operation-btn inline">禁用</View>
          <View className="operation-update">修改商品</View>
        </View>
      </View>
    </View>
  );
};
export default Details;
