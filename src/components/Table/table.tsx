import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Checkbox,
  CheckboxGroup,
  Button
} from "@tarojs/components";
import "./index.less";
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

  return (
    <View className="table">
      <View className="button-group">
        <Button className="btn btn-primary">清空商品</Button>
        <Button className="btn btn-secondary">新增商品</Button>
      </View>
      <ScrollView scrollX={true} style={{ width: "100%" }} className="table">
        <View
          className={`thead ${border ? "thead-border" : ""}`}
          style={{ width: `${scrollWidth}rpx` }}
        >
          {headers.map((header, index) => (
            <View
              className="td"
              key={header.prop}
              style={{ width: header.width + "rpx" }}
            >
              {index === 0 ? (
                <CheckboxGroup onChange={checkAll}>
                  <Checkbox value="全选" checked={isAll}></Checkbox>
                </CheckboxGroup>
              ) : (
                header.label
              )}
            </View>
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
                <View
                  className={`tbody-tr ${stripe ? "tbody-tr-stripe" : ""} ${
                    border ? "tbody-tr-border" : ""
                  }`}
                >
                  {headers.map((header, index) => (
                    <View
                      className="td"
                      style={{ width: `${header.width}rpx` }}
                      key={item.id}
                    >
                      {index === 0 ? (
                        <Checkbox
                          value={"" + item.id}
                          checked={item.isCheck}
                        ></Checkbox>
                      ) : header.render ? (
                        header.render()
                      ) : (
                        item[header["prop"]]
                      )}
                    </View>
                  ))}
                </View>
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
