import { Button } from "@tarojs/components";
import React, { useState } from "react";
import TableTabs from "./TableTabs";

const Table = () => {
  const [isShowState, setIsShow] = useState(true);
  const tabs = [
    {
      tabText: "全部移除",
      tabIcon: "../../assets/goods.png"
    },
    {
      tabText: "取消",
      tabIcon: "../../assets/goods.png"
    }
  ];
  const handleClick = () => {
    setIsShow(!isShowState);
  };
  return (
    <>
      <Button onClick={handleClick.bind(this)}>选择</Button>
      <TableTabs hidden={isShowState} tabData={tabs}></TableTabs>
    </>
  );
};
export default Table;
