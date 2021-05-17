import React, { useState, useEffect } from "react";
import { GoodsCategoryType } from "@/res-req";
import { TableRow, TableHeader } from "@/components/Table/types";
import { getGoodsCategory } from "@/services/goods";
import Table from "@/components/Table/table";
import { View, Switch } from "@tarojs/components";

const CategoryTable = () => {
  const [data, setData] = useState<(GoodsCategoryType & TableRow)[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getGoodsCategory({ currPage: page, pageSize: 2 })
      .then(res => {
        if (res.code === "0000") {
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
      label: "类别名称",
      prop: "categoryName"
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

  return (
    <Table<GoodsCategoryType>
      showToolBar
      tableData={data}
      headers={tableHeader}
      loading={loading}
    />
  );
};

export default CategoryTable;
