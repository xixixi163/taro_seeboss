import { Input, View, Image } from "@tarojs/components";
import React, { useState } from "react";
import "./index.less";
import searchIcon from "../../assets/images/search.png";

const Search = () => {
  const [keyValueState, setKeyValue] = useState("");
  return (
    <View className="search">
      <View className="search-text">
        <Input
          className="search-text-wrap"
          placeholder="搜索商品"
          value={keyValueState}
        ></Input>
      </View>
      <View className="search-icon">
        <Image src={searchIcon} mode="scaleToFill" />
      </View>
    </View>
  );
};
export default Search;
