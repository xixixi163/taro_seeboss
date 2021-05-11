const { Random } = require("mockjs");

const goodsCategoryTemplate = {
  goodsCategoryUuid: Random.string("number", 32),
  merchantId: Random.integer(0, 100),
  defaultFlag: 1,
  creTime: parseInt(Random.time("T")),
  updTime: parseInt(Random.time("T")),
  creUserId: "22",
  updUserId: "22",
  parentUuid: "0"
};

const genGoodsCategory = () => {
  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      ...goodsCategoryTemplate,
      name: "临时类别" + i
    });
  }
  return data;
};

let goodsCategoryList = genGoodsCategory();
const getGoodsCategory = (req, res) => {
  res.json({
    code: "0000",
    msg: "SUCCESS",
    data: goodsCategoryList
  });
};

const addGoodsCategory = (req, res) => {
  const { name, parentUuid = 0 } = req.body;
  const newCategory = {
    ...goodsCategoryTemplate,
    name,
    parentUuid
  };
  goodsCategoryList.push(newCategory);
  res.json({
    code: "0000",
    msg: "SUCCESS",
    data: newCategory
  });
};

const updateGoodsCategory = (req, res) => {
  const { goodsCategoryUuid, parentUuid, goodsCategoryName } = req.body;
  const index = goodsCategoryList.findIndex(
    goods => goods.id === goodsCategoryUuid
  );
  goodsCategoryList[index].parentUuid = parentUuid;
  goodsCategoryList[index].goodsCategoryName = goodsCategoryName;
  res.json({
    code: "0000",
    msg: "SUCCESS",
    data: goodsCategoryList[index]
  });
};

const removeGoodsCategory = (req, res) => {
  const { goodsCategoryUuid } = req.body;
  goodsCategoryList = goodsCategoryList.filter(
    goods => goods.goodsCategoryUuid !== goodsCategoryUuid
  );
  res.json({
    code: "0000",
    msg: "SUCCESS"
  });
};

const goodsCategoryDetail = (req, res) => {
  const { goodsCategoryUuid } = req.body;
  const index = goodsCategoryList.findIndex(
    good => good.goodsCategoryUuid === goodsCategoryUuid
  );
  res.json({
    data: goodsCategoryList[index],
    msg: "SUCCESS",
    code: "0000"
  });
};

module.exports = {
  "POST /api/baseInfo/goodsCategory/listGoodsCategory": getGoodsCategory,
  "POST /api/baseInfo/goodsCategory/addGoodsCategory": addGoodsCategory,
  "POST /api/baseInfo/goodsCategory/updateGoodsCategory": updateGoodsCategory,
  "POST /api/baseInfo/goodsCategory/removeGoodsCategory": removeGoodsCategory,
  "POST /api/baseInfo/goodsCategory/getGoodsCategory": goodsCategoryDetail
};
