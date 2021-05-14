const { Random } = require("mockjs");

const goodListTemplate = {
  goodsUuid: Random.string("number", 32),
  mrchUuid: Random.integer(0, 100),
  mrchName: "测试商户",
  goodsCategoryUuid: Random.toString(32).substr(2),
  goodsUnitUuid: Random.toString(32).substr(2),
  goodsBrandUuid: Random.toString(32).substr(2),
  goodsNo: "1",
  purchasePrice: "0.00",
  salePirce: "3.00",
  sellingPrice: Math.floor(Math.random() * 100).toFixed(1),
  goodsState: Random.integer(0, 1),
  goodsTypes: Random.integer(0, 1),
  pricingMethod: Random.integer(0, 1),
  inputTaxRate: Math.floor(Math.random() * 100).toFixed(1),
  mnemonicCode: "LSSP",
  specificationModel: "散装",
  shelfLife: Random.integer(0, 180),
  shelfLifeUnit: Random.integer(0, 10),
  creTime: parseInt(Random.time("T")),
  creUserId: Random.integer(1, 100)
};

const genGoodsList = () => {
  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      customBarcode: `LS${i}`,
      goodsName: `临时商品${i}`,
      goodsAbbreviation: `临时${i}`,
      goodsDescription: `普通商品${i}`,
      ...goodListTemplate
    });
  }
  return data;
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

const addGoods = (req, res) => {
  res.json({
    code: "0000",
    msg: "SUCCESS"
  });
};

const editGoods = (req, res) => {
  res.json({
    code: "0000",
    msg: "SUCCESS"
  });
};

module.exports = {
  "POST /api/baseInfo/goods/listGoods": getGoodsList,
  "POST /api/baseInfo/goods/addGoods": addGoods
};
