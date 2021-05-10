const Mock = require("mockjs");
const Goods = require("./goods.ts");

module.exports = {
  ...Goods,
  "GET /api/user": (req, res) => {
    res.status(200).send({
      code: "0000",
      data: {
        name: Mock.Random.string("number", 32)
      },
      msg: "SUCCESS"
    });
  }
};
