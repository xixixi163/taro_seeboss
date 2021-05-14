import React, { useState, useEffect } from "react";
import { View, ScrollView, Switch } from "@tarojs/components";
import "./index.less";
import Taro, {
  useDidShow,
  usePullDownRefresh,
  useReachBottom,
  useReady
} from "@tarojs/taro";
import Table from "../../components/Table/table";
import { TableHeader, TableRow } from "../../components/Table/types";
import { GoodsCategoryType, GoodsBrandType } from "../../res-req";
import {
  getGoodBrandsList,
  getGoodsUnits,
  addGoodsUnits,
  getGoodsCategoryById,
  getAllGoodsCategory,
  getGoodsRecord,
  addGoodsRecord,
  updateGoodsRecord,
  removeGoodsRecord,
  getGoodsRecordById,
  getGoodsRecordWithStock,
  putGoodsShelves,
  offGoodsShelves,
  getSuppliersRecord,
  getGoodsCategory
} from "../../services/goods";
import Search from "../../components/Search";
import Tabs from "../../components/Tabs";
import TabsPane from "../../components/Tabs/TabsPane";
import request from "../../utils/request";

const tabList = [
  {
    title: "品牌管理",
    image:
      "https://caidc.oss-cn-beijing.aliyuncs.com/taro-boss/brands-manage.png"
  },
  {
    title: "类别管理",
    image:
      "https://caidc.oss-cn-beijing.aliyuncs.com/taro-boss/category-manage.png"
  },
  {
    title: "商品管理",
    image:
      "https://caidc.oss-cn-beijing.aliyuncs.com/taro-boss/goods-manage.png"
  },
  {
    title: "单位管理",
    image: "https://caidc.oss-cn-beijing.aliyuncs.com/taro-boss/unit-manage.png"
  }
];

const unitData = [
  {
    id: 123,
    name: "单位1",
    isCheck: false
  }
];

const Goods: Taro.FC = () => {
  const [current, setCurrent] = useState(0);
  const [brandData, setBrandData] = useState<(GoodsBrandType & TableRow)[]>([]);
  const [catagoryData, setCatagoryData] = useState<GoodsCategoryType[]>([]);
  const [goodsData, setGoodsData] = useState([]);
  const [unitData, setUnitData] = useState([]);
  const [visiblityBrand, setVisiblityBrand] = useState(true);
  const [visiblityCatagory, setVisiblityCatagory] = useState(true);
  const [visiblityGoods, setVisiblityGoods] = useState(true);
  const [visiblityUnit, setVisiblityUnit] = useState(true);
  const [brandPage, setBrandPage] = useState(1);
  const [unitPage, setUnitPage] = useState(1);
  const [catagoryPage, setCatagoryPage] = useState(1);
  const [goodsPage, setGoodsPage] = useState(1);

  useEffect(() => {
    getGoodBrandsList({ currPage: brandPage, pageSize: 10 })
      .then(res => {
        if (res.code === "0000") {
          setBrandData([...brandData, ...res.data.data]);
          setVisiblityBrand(false);
        }
      })
      .catch(err => {
        setVisiblityBrand(true);
      });

    // getGoodsUnits().then(response => console.log(response));
    // getGoodsCategory();
    // addGoodsUnits({ name: "个" });
    // getGoodsCategoryById({
    //   goodsCategoryUuid: "02cf176f06eed6610f0b1c5c0262bd58"
    // });
    // getAllGoodsCategory();
    // getGoodsRecord({ currPage: 1, pageSize: 2 });
    // addGoodsRecord({
    //   customBarcode: "Go2",
    //   goodsName: "水杯",
    //   goodsCategoryUuid: "ebf915ef1a90709d9eaac3fee3a4c671",
    //   goodsUnitUuid: "2ad26dd3e182c02f9012cfb24b1ca080",
    //   goodsBrandUuid: "ebf915ef1a90709d9eaac3fee3a4c671",
    //   goodsState: 0,
    //   goodsTypes: 0,
    //   purchasePrice: 5,
    //   sellingPrice: 10,
    //   supplierUuid: "ca2b901ff68f904522254513d4cbc45f",
    //   pricingMethod: 0,
    //   inputTaxRate: 0.1,
    //   quantity: 20,
    //   goodsAbbreviation: "水杯",
    //   mnemonicCode: "SHUIBEI",
    //   specificationModel: "500ml",
    //   shelfLife: 180,
    //   shelfLifeUnit: 3,
    //   goodsDescription: "普通商品",
    //   stockSetting: 2,
    //   productionDate: "946684800000"
    // });
    // updateGoodsRecord();
    // removeGoodsRecord({ goodsUuid: "ed6ca791f201d631cd70f4c769551137" });
    // getGoodsRecordWithStock({ currPage: 1, pageSize: 2 });
    // offGoodsShelves({
    //   goodsUuid: "cbc6c084f864fc18e06d9750d7302a8a"
    // });
    // getSuppliersRecord({
    //   currPage: 1,
    //   pageSize: 2
    // });
    // getGoodsRecordById("08e2665750f0ab4e195b9795f55e468a");
  }, [brandPage]);
  useEffect(() => {
    getGoodsRecord({ currPage: goodsPage, pageSize: 2 })
      .then(res => {
        if (res.code === "0000") {
          setGoodsData([goodsData, ...res.data.data]);
          setVisiblityGoods(false);
        }
      })
      .catch(err => {
        setVisiblityGoods(true);
      });
  }, [goodsPage]);

  useEffect(() => {
    getGoodsCategory({ currPage: catagoryPage, pageSize: 2 })
      .then(res => {
        if (res.code === "0000") {
          setCatagoryData([...catagoryData, ...res.data.data]);
          setVisiblityCatagory(false);
        }
      })
      .catch(err => {
        setVisiblityCatagory(true);
      });
  }, [catagoryPage]);
  useEffect(() => {
    getGoodsUnits({ currPage: unitPage, pageSize: 3 })
      .then(res => {
        if (res.code === "0000") {
          setUnitData([...unitData, ...res.data.data]);
          setVisiblityUnit(false);
        }
      })
      .catch(err => {
        setVisiblityUnit(true);
      });
  }, [unitPage]);
  usePullDownRefresh(() => {
    console.log("下拉刷新");
    setTimeout(() => {
      // 停止下拉刷新
      Taro.stopPullDownRefresh();
    }, 1000);
  });
  // useReachBottom(() => {
  //   console.log("onReachBottom");
  //   if (current === 0) {
  //     setBrandPage(() => {
  //       let current = brandPage;
  //       return (current += 1);
  //     });
  //   }
  // });
  const loadMore = () => {
    console.log("load");
    if (current === 0) {
      setBrandPage(() => {
        let cur = brandPage;
        return (cur += 1);
      });
    } else if (current === 1) {
      setCatagoryPage(() => {
        let cur = catagoryPage;
        return (cur += 1);
      });
    } else if (current === 2) {
      setGoodsPage(() => {
        let cur = goodsPage;
        return (cur += 1);
      });
    } else if (current === 3) {
      setUnitPage(() => {
        let cur = unitPage;
        return (cur += 1);
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

  const tableHeader2: TableHeader[] = [
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
  const tableHeader3: TableHeader[] = [
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
  const tableHeader4: TableHeader[] = [
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
      prop: "status",
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

  const handleClick = async index => {
    setCurrent(index);
  };

  const handleCheckAll = (checked: boolean) => {
    if (checked) {
      setBrandData(brandData.map(brand => ({ ...brand, isCheck: true })));
    } else {
      setBrandData(brandData.map(brand => ({ ...brand, isCheck: false })));
    }
  };

  const handleCheck = (item: GoodsBrandType) => {
    setBrandData(
      brandData.map(brand =>
        brand.goodsBrandUuid === item.goodsBrandUuid
          ? { ...brand, isCheck: !brand.isCheck }
          : brand
      )
    );
  };

  const deleteItem = (tableItem: GoodsBrandType) => {
    Taro.showModal({
      content: `确定要删除【品牌名称：${tableItem.name}，id：${tableItem.goodsBrandUuid}】这条数据?`
    });
  };

  const deleteByGroup = (tableItems: []) => {
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

  return (
    <View className="base">
      <View className="base-head">
        <View className="head-title">老板通</View>
        <View className="head-search">
          <Search></Search>
        </View>
      </View>
      <Tabs
        current={current}
        tabList={tabList}
        swipeable={false}
        onClick={index => handleClick(index)}
      >
        <TabsPane current={current} index={0}>
          <Table<GoodsBrandType>
            showToolBar
            onCheck={checkedItem => handleCheck(checkedItem)}
            onCheckAll={checked => handleCheckAll(checked)}
            onAddButtonClick={() =>
              Taro.navigateTo({ url: "/pages/form/index" })
            }
            onDeleteButtonClick={tableItems => deleteByGroup(tableItems)}
            data={brandData}
            headers={tableHeader}
            loading={visiblityBrand}
            loadMore={() => {
              console.log("loedmore");
            }}
          />
        </TabsPane>
        <TabsPane current={current} index={1}>
          <Table<GoodsCategoryType>
            showToolBar
            data={catagoryData}
            headers={tableHeader3}
            loading={visiblityCatagory}
          />
        </TabsPane>
        <TabsPane current={current} index={2}>
          <Table
            data={goodsData}
            headers={tableHeader4}
            loading={visiblityGoods}
          />
        </TabsPane>
        <TabsPane current={current} index={3}>
          <Table
            data={unitData}
            headers={tableHeader2}
            loading={visiblityUnit}
          />
        </TabsPane>
      </Tabs>
    </View>
  );
};

export default Goods;
