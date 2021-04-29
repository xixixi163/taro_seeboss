import request from "../utils/request";
import {
  IResponse,
  GoodsBrandType,
  IRequest,
  GoodsUnitType,
  GoodsCategoryType,
  IRequestUpdateGoodsCategory
} from "../res-req";

const defaultParam: IRequest = {
  currPage: 1,
  pageSize: 10
};

// 获取商品品牌列表
export const getGoodBrandsList = (
  params = defaultParam
): Promise<IResponse<GoodsBrandType>> => {
  return new Promise(resolve => {
    request
      .post("/baseInfo/goodsBrand/listGoodsBrands", params)
      .then(response => {
        resolve(response);
      });
  });
};

// 获取商品单位列表
export const getGoodsUnits = (
  params = defaultParam
): Promise<IResponse<GoodsUnitType>> => {
  return new Promise(resolve => {
    request
      .post("/baseInfo/goodsUnit/listGoodsUnits", params)
      .then(response => {
        resolve(response);
      });
  });
};

// 新增商品单位
export const addGoodsUnits = (params: {
  name: string;
}): Promise<IResponse<GoodsUnitType>> => {
  return new Promise(resolve => {
    request.post("/baseInfo/goodsUnit/addGoodsUnits", params).then(response => {
      resolve(response);
    });
  });
};

// 获取商品类别列表
export const getGoodsCategory = (
  params = defaultParam
): Promise<IResponse<GoodsCategoryType>> => {
  return new Promise(resolve => {
    request
      .post("/baseInfo/goodsCategory/listGoodsCategory", params)
      .then(response => {
        resolve(response);
      });
  });
};

// 新增商品类别
export const addGoodsCategory = (params: {
  name: string;
  parentId?: string;
}): Promise<IResponse<GoodsBrandType>> => {
  return new Promise(resolve => {
    request
      .post("/baseInfo/goodsCategory/addGoodsCategory", params)
      .then(response => {
        resolve(response);
      });
  });
};

// 修改商品类别
export const updateGoodsCategory = (
  params: IRequestUpdateGoodsCategory
): Promise<IResponse<GoodsBrandType>> => {
  return new Promise(resolve => {
    request
      .post("/baseInfo/goodsCategory/updateGoodsCategory", params)
      .then(response => {
        resolve(response);
      });
  });
};

// 删除商品类别
export const removeGoodsCategory = (params: {
  goodsCategoryUuid: string;
}): Promise<IResponse> => {
  return new Promise(resolve => {
    request
      .post("/baseInfo/goodsCategory/removeGoodsCategory", params)
      .then(response => {
        resolve(response);
      });
  });
};
