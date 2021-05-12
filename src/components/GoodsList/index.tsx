import { View, Image } from "@tarojs/components";
import React from "react";
import Taro from "@tarojs/taro";
import "./index.less";

type GoodsListProps = {
  goodsList: {
    goodsUuid: string;
    /**@name 商品名称 */
    goodsName: string;
    /**@name 销售价 */
    sellingPrice: number;
    goodsImg: string;
  }[];
};
const GoodsList: Taro.FC<GoodsListProps> = props => {
  const { goodsList } = props;

  const toPrice = (price: number) => `¥ ${price}`;
  const getGoodsDetail = (goodsId: string) => {
    console.log(goodsId);

    Taro.navigateTo({
      url: `/pages/details/details?goodsId=${goodsId}`
    });
  };
  return (
    <View className="goods-list">
      {goodsList.length > 0 &&
        goodsList.map((item, index) => (
          <View
            className="goods-list-item"
            onClick={() => getGoodsDetail(item.goodsUuid)}
          >
            <View className="img">
              <Image
                src="https://caidc.oss-cn-beijing.aliyuncs.com/taro-boss/goodimg.png"
                mode="aspectFill"
              />
            </View>
            <View className="info">
              <View className="info-name">{item.goodsName}</View>
              <View className="info-price">{toPrice(item.sellingPrice)}</View>
            </View>
          </View>
        ))}
    </View>
  );
};
export default GoodsList;
