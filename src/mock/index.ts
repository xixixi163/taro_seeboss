const Mock = require("mockjs");
const Goods = require("./goods.ts");
const Category = require("./category.ts");
const Record = require("./record.ts");

module.exports = {
  ...Goods,
  ...Category,
  ...Record,
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
