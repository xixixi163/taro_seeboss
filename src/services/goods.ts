import request from "../utils/request";
import {
  IResponse,
  GoodsBrandType,
  IRequest,
  GoodsUnitType,
  GoodsCategoryType,
  IRequestUpdateGoodsCategory,
  GoodsCategoryDetailType,
  AllGoodsCategoryType,
  IRequestQueryGoodsRecord,
  GoodsRecordType,
  IRequestAddGoodsRecord,
  IRequestUpdateGoodsRecord,
  IRequestStockGoodsRecord,
  IRequestSuppliers
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
  unitName: string;
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
  categoryName: string;
  parentUuid?: string;
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
// 获取商品类别详情
export const getGoodsCategoryById = (params: {
  goodsCategoryUuid: string;
}): Promise<IResponse<GoodsCategoryDetailType>> => {
  return new Promise(resolve => {
    request
      .post("/baseInfo/goodsCategory/getGoodsCategory", params)
      .then(response => {
        resolve(response);
      });
  });
};
// 查询全部商品类别
export const getAllGoodsCategory = (): Promise<IResponse<
  AllGoodsCategoryType
>> => {
  return new Promise(resolve => {
    request.post("/baseInfo/goodsCategory/findAll").then(response => {
      resolve(response);
    });
  });
};

// 商品档案
// 获得商品档案列表
export const getGoodsRecord = (
  params: IRequestQueryGoodsRecord
): Promise<IResponse<GoodsRecordType>> => {
  return new Promise(resolve => {
    request.post("/baseInfo/goods/listGoods", params).then(response => {
      resolve(response);
    });
  });
};

// 添加商品档案
export const addGoodsRecord = (
  params: IRequestAddGoodsRecord
): Promise<IResponse<GoodsRecordType>> => {
  return new Promise(resolve => {
    request.post("/baseInfo/goods/addGoods", params).then(response => {
      resolve(response);
    });
  });
};

// 修改商品档案
export const updateGoodsRecord = (
  params: IRequestUpdateGoodsRecord
): Promise<IResponse<GoodsRecordType>> => {
  return new Promise(resolve => {
    return request.post("/baseInfo/goods/editGoods", params).then(response => {
      resolve(response);
    });
  });
};

// 删除商品档案
export const removeGoodsRecord = (params: {
  goodsUuid: string;
}): Promise<IResponse> => {
  return new Promise(resolve => {
    request.post("/baseInfo/goods/removeGoods", params).then(response => {
      resolve(response);
    });
  });
};

// 查询商品档案详情
export const getGoodsRecordById = (params: string) => {
  return new Promise(resolve => {
    request
      .get(`/baseInfo/goods/getGoods?goodsUuid=${params}`)
      .then(response => {
        resolve(response);
      });
  });
};

// 获取商品档案列表(含库存数量）
export const getGoodsRecordWithStock = (params: IRequestStockGoodsRecord) => {
  return new Promise(resolve => {
    request.post("/baseInfo/goods/listStockGoods", params).then(response => {
      resolve(response);
    });
  });
};

// 商品上架
export const putGoodsShelves = (params: {
  goodsUuid: string;
}): Promise<IResponse> => {
  return new Promise(resolve => {
    request.post("/baseInfo/goods/stackGoods", params).then(response => {
      resolve(response);
    });
  });
};
// 商品下架
export const offGoodsShelves = (params: {
  goodsUuid: string;
}): Promise<IResponse> => {
  return new Promise(resolve => {
    request.post("/baseInfo/goods/unStackGoods", params).then(response => {
      resolve(response);
    });
  });
};

// 供应商档案列表
export const getSuppliersRecord = (
  params: IRequestSuppliers
): Promise<IResponse> => {
  return new Promise(resolve => {
    request.post("/baseInfo/supplier/listSuppliers", params).then(response => {
      resolve(response);
    });
  });
};
