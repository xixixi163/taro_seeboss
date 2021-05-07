import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Checkbox,
  CheckboxGroup,
  Button
} from "@tarojs/components";
import "./index.less";
import Taro from "@tarojs/taro";
import { TableProps, TableHeader, TableRow } from "./types";

const Table: React.FC<TableProps> = props => {
  const { headers, data, stripe, msg, border, tdWidth, width, height } = props;
  const [scrollWidth, setScrollWidth] = useState("100%");
  const [tableItem, setTableItem] = useState<TableRow[]>(data);
  const [isAll, setIsAll] = useState(false);

  useEffect(() => {
    const reducer = function reducer(accumulator, currentValue: TableHeader) {
      return accumulator + currentValue.width;
    };

    const scrollWidth = headers.reduce(reducer, 0);
    setScrollWidth(scrollWidth);
  }, [headers]);

  useEffect(() => {
    if (isAll) {
      setTableItem(tableItem.map(item => ({ ...item, isCheck: true })));
    } else {
      setTableItem(tableItem.map(item => ({ ...item, isCheck: false })));
    }
  }, [isAll]);

  const checkAll = () => {
    setIsAll(!isAll);
  };

  const Row: React.FC<{ stripe?: boolean; border?: boolean }> = ({
    children,
    stripe,
    border
  }) => (
    <View
      className={`tbody-tr ${stripe ? "tbody-tr-stripe" : ""} ${
        border ? "tbody-tr-border" : ""
      }`}
    >
      {children}
    </View>
  );

  const Column: React.FC<{ width?: string | number }> = ({
    children,
    width
  }) => (
    <View className="td" style={{ width: width ? width + "rpx" : "" }}>
      {children}
    </View>
  );

  return (
    <View className="table">
      <View className="button-group">
        <Button className="btn btn-primary">清空商品</Button>
        <Button
          className="btn btn-secondary"
          onClick={() => Taro.navigateTo({ url: "/pages/form/index" })}
        >
          新增商品
        </Button>
      </View>
      <ScrollView scrollX={true} style={{ width: "100%" }} className="table">
        <View
          className={`thead ${border ? "thead-border" : ""}`}
          style={{ width: `${scrollWidth}rpx` }}
        >
          <Column width="150">
            <CheckboxGroup onChange={checkAll}>
              <Checkbox value="全选" checked={isAll}></Checkbox>
            </CheckboxGroup>
          </Column>
          {headers.map((header, index) => (
            <Column key={header.prop} width={header.width}>
              {header.label}
            </Column>
          ))}
        </View>

        <ScrollView
          scrollY={true}
          className="tbody"
          style={{
            width: `${scrollWidth}rpx`,
            height: height ? height : "auto"
          }}
        >
          <CheckboxGroup>
            {tableItem.length > 0 ? (
              tableItem.map((item, i) => (
                <Row>
                  <Column width={150}>
                    <Checkbox
                      value={"" + item.id}
                      checked={item.isCheck || false}
                    ></Checkbox>
                  </Column>
                  {headers.map((header, index) => (
                    <Column width={header.width} key={item.id}>
                      {header.render ? header.render() : item[header["prop"]]}
                    </Column>
                  ))}
                </Row>
              ))
            ) : (
              <View className="no-data">{msg || `暂无数据`}</View>
            )}
          </CheckboxGroup>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default Table;
