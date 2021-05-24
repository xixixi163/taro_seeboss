import { AllGoodsCategoryType } from "@/res-req";
import {
  getAllGoodsCategory,
  getGoodsCategory,
  addGoodsCategory
} from "@/services/goods";
import { Form, View, Text, Picker, Button } from "@tarojs/components";
import React from "react";
import Taro, {
  getCurrentInstance,
  getCurrentPages,
  useDidHide,
  useDidShow
} from "@tarojs/taro";
import { useEffect } from "react";
import { useState } from "react";
import { AtInput, AtList } from "taro-ui";
import "./catagoryForm.less";
import { Events } from "@tarojs/taro";
import { useRef } from "react";

const CatagoryFrom = () => {
  const [selector, setSelector] = useState<AllGoodsCategoryType[]>([]);
  const [selectorChecked, setSelectorChecked] = useState<number>(-1);
  const [categoryName, setCatagoryName] = useState<string>("");
  const data = useRef([]);
  useEffect(() => {
    getAllCatagory();
  }, []);
  const handleSubmit = e => {
    console.log(e);
    let params: { categoryName: string; parentUuid?: string } = {
      categoryName
    };
    if (selectorChecked != -1) {
      params["parentUuid"] = selector[selectorChecked].goodsCategoryUuid;
    }
    addGoodsCategory(params).then(res => {
      console.log(res);

      if (res.code === "0000") {
        getAllCatagory();
        getGoodsCategory({ pageSize: 3, currPage: 1 }).then(res => {
          if (res.code === "0000") {
            data.current = res.data.data;
            const pages = getCurrentPages();
            const current = pages[pages.length - 1];
            const eventChannel = current.getOpenerEventChannel();
            eventChannel.emit("getNewData", res.data.data);
            console.log(res.data.data, eventChannel);
          }
        });
        Taro.showToast({
          title: "成功",
          icon: "success",
          duration: 2000
        });
      } else {
        Taro.showToast({
          title: res.msg,
          icon: "none",
          duration: 2000
        });
      }
    });
  };
  const getAllCatagory = () => {
    getAllGoodsCategory().then(res => {
      if (res.code === "0000") {
        setSelector(res.data);
      }
    });
  };
  const sortChange = e => {
    setSelectorChecked(e.detail.value || -1);
  };
  const handleCatagoryChange = (value: string) => {
    setCatagoryName(value);
  };
  return (
    <View className="form-add">
      <View className="header">
        <View className="title">新增商品类别</View>
      </View>
      <Form onSubmit={e => handleSubmit(e)}>
        <View
          className="body"
          style={{ boxShadow: "0 0.55467rem 3.47733rem 0 rgb(0 0 0 / 11%)" }}
        >
          <View className="page-section">
            <Text className="selector-title">父级商品类别</Text>
            <View className="selector-wrap">
              <Picker
                mode="selector"
                value={selectorChecked}
                range={selector}
                rangeKey="categoryName"
                onChange={sortChange}
              >
                <AtList>
                  <View className="selector-item">
                    <View className="item-content">类别</View>
                    <View className="item-extro">
                      {selector?.length > 0 && selectorChecked > -1
                        ? selector[selectorChecked].categoryName
                        : "无"}
                    </View>
                  </View>
                </AtList>
              </Picker>
            </View>
          </View>
          <View className="page-section-input">
            <AtInput
              name="categoryName"
              title="商品类别名称"
              type="text"
              placeholder="请输入商品类别名称"
              value={categoryName}
              onChange={value => handleCatagoryChange(value)}
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
export default CatagoryFrom;
