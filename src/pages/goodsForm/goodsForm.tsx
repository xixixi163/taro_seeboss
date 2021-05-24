import { Button, Form, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React from "react";
import { useState } from "react";
import { AtInput } from "taro-ui";

const GoodsForm = () => {
  const [goodsName, setGoodsName] = useState("");
  const handleSubmit = e => {
    console.log(e);
  };
  const handleGoodsName = value => {
    setGoodsName(value);
  };
  return (
    <View className="form-add">
      <View className="header">
        <View className="title">新增商品</View>
      </View>
      <Form onSubmit={e => handleSubmit(e)}>
        <View
          className="body"
          style={{ boxShadow: "0 0.55467rem 3.47733rem 0 rgb(0 0 0 / 11%)" }}
        >
          <View className="page-section"></View>
          <View className="page-section-input">
            <AtInput
              name="categoryName"
              title="商品名称"
              type="text"
              placeholder="请输入商品名称"
              value={goodsName}
              onChange={value => handleGoodsName(value)}
              required
            />
          </View>
        </View>
        <View className="btn-group">
          <Button formType="submit" className="btn">
            保存
          </Button>
        </View>
      </Form>
    </View>
  );
};
export default GoodsForm;
