import { Input, View, Image } from "@tarojs/components";
import React, { useState } from "react";
import "./index.less";
import searchIcon from "../../assets/images/search.png";

type SearchProps = {
  style?: {};
};
const Search: Taro.FC<SearchProps> = props => {
  const { style } = props;
  const [keyValueState, setKeyValue] = useState("");
  return (
    <View className="search" style={style}>
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
