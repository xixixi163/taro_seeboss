import React, { useState, useEffect } from "react";
import { ScrollView, View } from "@tarojs/components";
import "./index.less";

interface TableHeader {
  prop: string;
  width?: number;
  label: string;
}

interface TableRow {
  id: number;
  status: string;
  datetime: string;
  sign_in_time: string;
  sign_out_time: string;
  work_hour: number | string;
}

interface TableProps {
  headers: Array<TableHeader>;
  data: Array<TableRow>;
  height?: string;
  width?: number | string;
  tdWidth?: number;
  stripe?: boolean;
  border?: boolean;
  msg?: string;
}

const Table: React.FC<TableProps> = props => {
  const { headers, data, stripe, msg, border, tdWidth, width, height } = props;
  const [scrollWidth, setScrollWidth] = useState("100%");

  useEffect(() => {
    const reducer = function reducer(accumulator, currentValue: TableHeader) {
      return accumulator + currentValue.width;
    };

    const scrollWidth = headers.reduce(reducer, 0);
    setScrollWidth(scrollWidth);
  }, [headers]);

  return (
    <ScrollView scrollX={true} style={{ width: "100%" }} className="table">
      <View
        className={`thead ${border ? "thead-border" : ""}`}
        style={{ width: `${scrollWidth}rpx` }}
      >
        {headers.map(header => (
          <View
            className="td"
            key={header.prop}
            style={{ width: header.width + "rpx" }}
          >
            {header.label}
          </View>
        ))}
      </View>

      <ScrollView
        scrollY={true}
        className="tbody"
        style={{ width: `${scrollWidth}rpx`, height: height ? height : "auto" }}
      >
        {data.length > 0 ? (
          data.map((data, i) => (
            <View
              className={`tbody-tr ${stripe ? "tbody-tr-stripe" : ""} ${
                border ? "tbody-tr-border" : ""
              }`}
            >
              {headers.map((header, index) => (
                <View className="td" style={{ width: `${header.width}rpx` }}>
                  {data[header["prop"]]}
                </View>
              ))}
            </View>
          ))
        ) : (
          <View className="no-data">{msg || `暂无数据`}</View>
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default Table;
