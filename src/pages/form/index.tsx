import React, { useState } from "react";
import { AtInput } from "taro-ui";
import { Form, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.less";
import { View } from "@tarojs/components";
import { addGoodsUnits, getGoodsUnits } from "../../services/goods";

interface FormProps {}

const AddForm = () => {
  const [name, setName] = useState<string | number>("");

  const handleChange = (value: string | number) => {
    setName(value);
  };

  const handleSubmit = e => {
    addGoodsUnits({ unitName: name as string }).then(res => {
      if (res.code === "0000") {
        getGoodsUnits();
        Taro.showToast({
          title: "成功",
          icon: "success",
          duration: 2000
        }).then(() => {
          Taro.hideToast();
          Taro.switchTab({ url: "/pages/index/index" });
        });
      } else {
        Taro.showToast({
          title: "失败",
          icon: "none",
          duration: 2000
        });
      }
    });
  };

  return (
    <View className="form-add">
      <View className="header">
        <View className="title">新增商品单位</View>
      </View>
      <Form onSubmit={e => handleSubmit(e)}>
        <View
          className="body"
          style={{ boxShadow: "0 0.55467rem 3.47733rem 0 rgb(0 0 0 / 11%)" }}
        >
          <AtInput
            name="value"
            title="商品单位名称"
            type="text"
            placeholder="请输入商品单位名称"
            value={name as string}
            onChange={value => handleChange(value)}
            required
          />
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

export default AddForm;
