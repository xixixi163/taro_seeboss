import React, { useState, useEffect } from "react";
import { GoodsRecordType } from "@/res-req";
import { TableRow, TableHeader } from "@/components/Table/types";
import { getGoodsRecord } from "@/services/goods";
import Table from "@/components/Table/table";
import { View, Switch } from "@tarojs/components";

const RecordTable = () => {
  const [data, setData] = useState<(GoodsRecordType & TableRow)[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getGoodsRecord({ currPage: page, pageSize: 2 })
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
      label: "商品名称",
      prop: "goodsName",
      width: 150
    },
    {
      label: "销售价",
      prop: "salePrice",
      width: 150
    },
    {
      label: "进货价",
      prop: "purchasePrice",
      width: 150
    },
    {
      label: "商品状态",
      prop: "goodsState",
      width: 150
    },
    {
      label: "助记码",
      prop: "mnemonicCode",
      width: 150
    },
    {
      label: "保质期",
      prop: "shelfLife",
      width: 150
    },
    {
      label: "保质期单位",
      prop: "shelfLifeUnit",
      width: 150
    },
    {
      label: "商品描述",
      prop: "goodsDescription",
      width: 150
    },
    {
      label: "创建时间",
      prop: "creTime",
      width: 150
    },
    {
      prop: "defaultFlag",
      label: "是否默认",
      width: 150,
      render: () => (
        <>
          <Switch />
        </>
      )
    },
    {
      prop: "operation",
      label: "操作",
      width: 150,
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

  return <Table tableData={data} headers={tableHeader} loading={loading} />;
};

export default RecordTable;
