import React, { useState, useEffect, useRef } from "react";
import Taro from "@tarojs/taro";
import { GoodsCategoryType } from "@/res-req";
import { TableRow, TableHeader } from "@/components/Table/types";
import { getGoodsCategory, removeGoodsCategory } from "@/services/goods";
import Table from "@/components/Table/table";
import { View, Switch } from "@tarojs/components";

const CategoryTable = () => {
  const [data, setData] = useState<(GoodsCategoryType & TableRow)[]>([]);
  const [loading, setLoading] = useState(true);
  const page = useRef(1);
  const size = useRef(3);
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    getCategotyList(page.current, size.current);
  }, [flag]);

  const deleteItem = (tableItem: GoodsCategoryType) => {
    Taro.showModal({
      title: "提示",
      content: `确定要删除【品牌名称：${tableItem.categoryName}，id：${tableItem.goodsCategoryUuid}】这条数据?`,
      success: res => {
        if (res.confirm) {
          const goodsCategoryUuid = tableItem.goodsCategoryUuid;
          if (goodsCategoryUuid) {
            removeGoodsCategory({
              goodsCategoryUuid
            })
              .then(res => {
                console.log(res);
                if (res.code === "0000") {
                  Taro.showToast({
                    title: "删除成功",
                    icon: "success",
                    duration: 2000
                  });
                  let len = data.length - 1;
                  if (len < size.current) {
                    len = size.current;
                  }
                  getGoodsCategory({ currPage: 1, pageSize: len })
                    .then(res => {
                      if (res.code === "0000") {
                        page.current = 1;
                        if (len % size.current === 0 && len >= size.current) {
                          page.current = len / size.current;
                        } else if (
                          len % size.current != 0 &&
                          len > size.current
                        ) {
                          size.current = len;
                        }
                        setCount(res.data.count);
                        setData(res.data.data);
                        setLoading(false);
                      }
                    })
                    .catch(err => {
                      setLoading(true);
                    });
                } else {
                  Taro.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 2000
                  });
                }
              })
              .catch(err => {
                console.log(err);
                Taro.showToast({
                  title: "删除失败",
                  icon: "none",
                  duration: 2000
                });
              });
          }
        }
      }
    });
  };

  // 请求列表
  const getCategotyList = async (page: number, size: number) => {
    getGoodsCategory({ currPage: page, pageSize: size })
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
  };

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

  const loadMore = () => {
    console.log(data.length, count);

    if (data.length < count) {
      // setPage(() => {
      //   let curpage = page;
      //   return (curpage += 1);
      // });
      page.current += 1;
      setFlag(!flag);
    } else {
      Taro.showToast({
        title: "没有更多",
        icon: "none",
        duration: 2000
      });
    }
  };
  return (
    <Table<GoodsCategoryType>
      showToolBar
      tableData={data}
      headers={tableHeader}
      loading={loading}
      onAddButtonClick={() =>
        Taro.navigateTo({
          url: "/pages/catagoryForm/catagoryForm",
          events: {
            getNewData: (newValue: any) => {
              // console.log(newValue);
              setData(newValue);
            }
          }
        })
      }
      loadMore={() => {
        loadMore();
      }}
      height={55 * data.length > 540 ? "540px" : ""}
    />
  );
};

export default CategoryTable;
