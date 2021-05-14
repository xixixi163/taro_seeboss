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

module.exports = {
  "POST /api/baseInfo/goodsBrand/listGoodsBrands": getGoodsBrands,
  "POST /api/baseInfo/goodsUnit/listGoodsUnits": getGoodsUnits,
  "POST /api/baseInfo/goodsUnit/addGoodsUnits": addGoodsUnits
};
