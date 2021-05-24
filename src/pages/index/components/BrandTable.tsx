import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { GoodsBrandType } from "@/res-req";
import { TableRow, TableHeader } from "@/components/Table/types";
import { getGoodBrandsList } from "@/services/goods";
import Table from "@/components/Table/table";
import { View, Switch } from "@tarojs/components";
import { AtLoadMore } from "taro-ui";

const BrandTable = <T extends object>() => {
  const [data, setData] = useState<(GoodsBrandType & TableRow)[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getGoodBrandsList({ currPage: page, pageSize: 10 })
      .then(res => {
        if (res.code === "0000") {
          console.log(res);
          setCount(res.data.count);
          setData([...data, ...res.data.data]);
          setLoading(false);
        }
      })
      .catch(err => {
        setLoading(true);
      });
  }, [page]);

  const deleteItem = (tableItem: GoodsBrandType) => {
    Taro.showModal({
      content: `确定要删除【品牌名称：${tableItem.brandName}，id：${tableItem.goodsBrandUuid}】这条数据?`
    });
  };

  // 批量删除
  const deleteByGroup = (tableItems: GoodsBrandType[]) => {
    if (tableItems.length < 1) {
      Taro.showToast({
        title: "请勾选至少一条数据",
        icon: "none"
      });
    } else {
      Taro.showModal({
        title: "提示",
        content: `确定要删除选中的${tableItems.length}条数据吗`,
        success: function(res) {
          if (res.confirm) {
            console.log("用户点击确定");
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    }
  };

  const tableHeader: TableHeader<GoodsBrandType>[] = [
    {
      prop: "brandName",
      label: "品牌名称"
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
      render: entity => (
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
            onClick={() => deleteItem(entity)}
          ></View>
        </>
      )
    }
  ];

  const handleCheckAll = (checked: boolean) => {
    if (checked) {
      setData(data.map(brand => ({ ...brand, isCheck: true })));
    } else {
      setData(data.map(brand => ({ ...brand, isCheck: false })));
    }
  };

  const handleCheck = (item: GoodsBrandType) => {
    setData(
      data.map(brand =>
        brand.goodsBrandUuid === item.goodsBrandUuid
          ? { ...brand, isCheck: !brand.isCheck }
          : brand
      )
    );
  };

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
    <Table<GoodsBrandType>
      showToolBar
      onCheck={checkedItem => handleCheck(checkedItem)}
      onCheckAll={checked => handleCheckAll(checked)}
      onAddButtonClick={() => Taro.navigateTo({ url: "/pages/form/index" })}
      onDeleteButtonClick={tableItems => deleteByGroup(tableItems)}
      tableData={data}
      headers={tableHeader}
      loading={loading}
      loadMore={() => {
        loadMore();
      }}
    />
  );
};

export default BrandTable;
