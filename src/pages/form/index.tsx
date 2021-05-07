import React, { useState } from "react";
import "./index.less";
import { View } from "@tarojs/components";
import { AtInput, AtButton } from "taro-ui";
import { AtForm } from "taro-ui";

interface FormType {}

const AddForm = () => {
  const [name, setName] = useState<string | number>("");

  const handleChange = (value: string | number) => {
    setName(value);
  };

  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <View className="form">
      <View className="header">
        <View className="title">新增商品单位</View>
      </View>
      <View
        className="body"
        style={{ boxShadow: "0 0.55467rem 3.47733rem 0 rgb(0 0 0 / 11%)" }}
      >
        <AtForm onSubmit={handleSubmit}>
          <AtInput
            name="value"
            title="商品单位名称"
            type="text"
            placeholder="请输入商品单位名称"
            value={name as string}
            onChange={value => handleChange(value)}
            required
          />
        </AtForm>
      </View>
      <AtButton type="primary" formType="submit">
        保存
      </AtButton>
    </View>
  );
};

export default AddForm;
