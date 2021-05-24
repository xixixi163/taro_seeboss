import React, { useState, useEffect } from "react";
import { TableRow, TableHeader } from "@/components/Table/types";
import Table from "@/components/Table/table";
import { View, Switch } from "@tarojs/components";
import { getGoodsUnits } from "@/services/goods";
import { GoodsUnitType } from "@/res-req";

const UnitTable = () => {
  const [data, setData] = useState<(GoodsUnitType & TableRow)[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getGoodsUnits({ currPage: page, pageSize: 10 })
      .then(res => {
        if (res.code === "0000") {
          setCount(res.data.count);
          setData([...data, ...res.data.data]);
          setLoading(false);
        }
      })
      .catch(err => {
        setLoading(true);
      });
  }, [page]);

  const tableHeader: TableHeader[] = [
    {
      label: "单位名称",
      prop: "unitName"
    },
    {
      prop: "defaultFlag",
      label: "是否默认",
      render: () => (
        <>
          <Switch />
        </>
      )
    },
    {
      prop: "operation",
      label: "操作",
      render: () => (
        <>
          <View
            className="fa fa-pencil"
            style={{
              marginRight: "30rpx",
              fontSize: "24px",
              color: "#0096FC"
            }}
          ></View>

          <View
            className="fa fa-trash-o"
            style={{ fontSize: "24px", color: "#0096FC" }}
          ></View>
        </>
      )
    }
  ];

  const loadMore = () => {
    if (data.length < count) {
      setPage(() => {
        let curpage = page;
        return (curpage += 1);
      });
    } else {
      Taro.showToast({
        title: "没有更多",
        icon: "none",
        duration: 2000
      });
    }
  };
  return (
    <Table
      tableData={data}
      headers={tableHeader}
      loading={loading}
      loadMore={() => loadMore()}
      height={55 * data.length > 540 ? "540px" : ""}
    />
  );
};

export default UnitTable;
