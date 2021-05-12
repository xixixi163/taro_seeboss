const { Random } = require("mockjs");
const goodsBrands = [
  "蛋黄酥",
  "乐事薯片",
  "上好佳洋葱鱿鱼圈",
  "七喜",
  "芬达汽水"
];

const genGoodsBrandsList = (page, pageSize) => {
  const data = [];
  for (let i = 0; i < pageSize; i++) {
    const index = (page - 1) * 10 + i;
    data.push({
      goodsBrandUuid: Random.string("number", 32),
      mrchId: index,
      name: goodsBrands[Math.floor(Math.random() * 5)],
      defualtFlag: 1,
      creTime: parseInt(Random.time("T"))
    });
  }
  return data;
};

const genGoodsUnitsList = () => {
  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      goodsUnitUuid: Random.string("number", 32),
      mrchId: Random.integer(0, 100),
      name: "商品单位" + i,
      defualtFlag: 1,
      creTime: parseInt(Random.time("T")),
      creUserId: "22"
    });
  }
  return data;
};

const goodsBrandsList = genGoodsBrandsList(1, 100);
const genGoodsList = () => {
  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      goodsUuid: Random.string("number", 32),
      mrchUuid: Random.integer(0, 100),
      goodsCategoryUuid: Random.toString(32).substr(2),
      goodsUnitUuid: Random.toString(32).substr(2),
      goodsBrandUuid: Random.toString(32).substr(2),
      customBarcode: `LS${i}`,
      goodsName: `临时商品${i}`,
      sellingPrice: Math.floor(Math.random() * 100).toFixed(1),
      goodsState: Random.integer(0, 1),
      goodsTypes: Random.integer(0, 1),
      pricingMethod: Random.integer(0, 1),
      inputTaxRate: Math.floor(Math.random() * 100).toFixed(1),
      goodsAbbreviation: `临时${i}`,
      mnemonicCode: "LSSP",
      specificationModel: "散装",
      shelfLife: Random.integer(0, 180),
      shelfLifeUnit: Random.integer(0, 10),
      goodsDescription: `普通商品${i}`,
      creTime: new Date().getDate(),
      creUserId: Random.integer(1, 100)
    });
  }
  return data;
};

const getGoodsBrands = (req, res) => {
  const { currPage = 1, pageSize = 10 } = req.body;
  let dataSource = [...goodsBrandsList].slice(
    (currPage - 1) * pageSize,
    currPage * pageSize
  );
  res.json({
    code: "0000",
    count: goodsBrandsList.length,
    data: dataSource,
    msg: "SUCCESS"
  });
};

const goodsUnitsList = genGoodsUnitsList();
const getGoodsUnits = (req, res) => {
  res.json({
    code: "0000",
    count: goodsUnitsList.length,
    data: goodsUnitsList,
    msg: "SUCCESS"
  });
};

const addGoodsUnits = (req, res) => {
  goodsUnitsList.push({
    goodsUnitUuid: Random.string("number", 32),
    mrchId: Random.integer(0, 100),
    name: req.body.name,
    defualtFlag: 1,
    creTime: parseInt(Random.time("T")),
    creUserId: "22"
  });
  res.json({
    code: "0000",
    msg: "SUCESS"
  });
};
const goods = genGoodsList();
const getGoodsList = (req, res) => {
  res.json({
    code: "0000",
    msg: "SUCCESS",
    count: goods.length,
    data: goods
  });
};
module.exports = {
  "POST /api/baseInfo/goodsBrand/listGoodsBrands": getGoodsBrands,
  "POST /api/baseInfo/goodsUnit/listGoodsUnits": getGoodsUnits,
  "POST /api/baseInfo/goodsUnit/addGoodsUnits": addGoodsUnits,
  "POST /api/baseInfo/goods/listGoods": getGoodsList
};
