/** 请求的数据参数 */
export interface IRequest {
  currPage?: number;
  pageSize?: number;
}

export interface ILogin {
  userName: string;
  password: string;
  t: string;
}

export interface IRequestGoodsCategory extends IRequest {
  name?: string;
  /** 模板限制，限制该条件后只返回该门店经营范围内的类别，默认为0，取值 0：不限制 1：限制 */
  templateLimit?: 0 | 1;
}

export interface IRequestUpdateGoodsCategory {
  goodsCategoryId: string;
  parentId: string;
  goodsCategoryName: string;
}

/** 后端返回的数据 */
export interface IResponse<T = any> {
  code: string;
  data?: {
    count: number;
    data: T[];
  };
  msg: string;
}

/** 商品通用类型 */
interface GoodsType {
  /** @name 商户id */
  mrchId: number;
  /** @name 是否默认0非默认1默认 */
  defaultFlag: 0 | 1;
  /** @name 创建时间(ms) */
  creTime: number;
  /** @name 修改时间*/
  updTime: number;
  /** @name 创建者ID*/
  creUserId: string;
  /** @name 修改者ID*/
  updUserId: string;
}

type GoodsUnion =
  | GoodsBrandType
  | GoodsCategoryType
  | GoodsRecordType
  | GoodsUnitType;

/** 商品品牌  */
export interface GoodsBrandType extends GoodsType {
  /** @name 单位Id*/
  goodsBrandUuid: string;
  /** @name 品牌名称*/
  name: string;
  data: [];
}

/** 商品单位列表 */
interface GoodsUnitType extends GoodsType {
  /** @name 单位Id */
  goodsUnitUuid: string;
  /** @name 单位名称 */
  unitName: string;
}

/** 商品类别列表 */
interface GoodsCategoryType extends GoodsType {
  /** @name 类别Id */
  goodsCategoryId: string;
  /** @name 	类别Id */
  goodsCategoryUuid: string;
  /** @name 父类别Id */
  parentId: string;
  /** @name 类别父ID */
  parentUuid: string;
  /** @name 类别名称 */
  name: string;
  /** @name 类别名称*/
  goodsCategoryName: string;
}

/** 商品类别详情 */
export interface GoodsCategoryDetailType extends GoodsType {
  /**@name 类别Id */
  goodsCategoryId: string;
  /** @name 父类别Id */
  parentUuid: string;
  /** @name 类别名称 */
  categoryName: string;
}
/** 全部商品类别 */
interface AllGoodsCategoryType {
  /**@name 类别Id */
  goodsCategoryId: string;
  /**@name 商户Id */
  merchantId: string;
  /** @name 父类别名称 */
  parentId: string;
  /** @name 类别名称 */
  name: string;
  /** @name 是否默认 */
  defaultFlag: 0 | 1;
  /** @name 创建时间(ms) */
  creTime: number;
  /** @name 修改时间*/
  updTime: number;
  /** @name 创建者ID*/
  creUserId: string;
  /** @name 修改者ID*/
  updUserId: string;
}

/** 商品档案类型 */

/** 商品通用 */
interface GoodsRecord {
  /**@name 商品自定义条码 */
  customBarcode: string;
  /**@name 商品名称 */
  goodsName: string;
  /**@name 进项税率 */
  inputTaxRate: number;
  /**@name 销售价 */
  sellingPrice: number;
  /**@name 商品状态 */
  goodsState: number;
  /**@name 商品类型 */
  goodsTypes: number;
  /**@name 计价方式 */
  pricingMethod: number;
  /**@name 商品简称 */
  goodsAbbreviation?: string;
  /**@name 助记码 */
  mnemonicCode?: string;
  /**@name 规格型号 */
  specificationModel?: string;
  /**@name 保质期 */
  shelfLife?: number;
  /**@name 保质期单位 */
  shelfLifeUnit?: number;
  /**@name 商品描述 */
  goodsDescription?: string;
}

/** 商品档案列表请求参数 */
interface IRequestQueryGoodsRecord extends IRequest {
  /**@name 商品类别Id */
  goodsCategoryUuid?: string;
  /**@name 商品自定义条码 */
  customBarcode?: string;
  /**@name 商品名称 */
  goodsName?: string;
  /**@name 商品状态 */
  goodsState?: number;
}
/** 商品档案列表 */
interface GoodsRecordType extends GoodsRecord {
  /**@name 商品ID */
  goodsUuid: string;
  /**@name 商户Id */
  mrchUuid: number;
  /**@name 类别Id */
  goodsCategoryUuid: string;
  /**@name 单位Id */
  goodsUnitUuid: string;
  /**@name 品牌Id */
  goodsBrandUuid: string;
  /**@name 创建时间 */
  creTime: number;
  /**@name 创建者ID */
  creUserUuid: number;
}
/** 商品档案新增参数 */
interface IRequestAddGoodsRecord extends GoodsRecord {
  /**@name 品牌Id */
  goodsBrandUuid: string;
  /**@name 类别Id */
  goodsCategoryUuid: string;
  /**@name 单位Id */
  goodsUnitUuid: string;
  /**@name 供应商Id */
  supplierUuid: string;
  /**@name 商品国际条码 */
  integerernationalBarcode?: string;
  /**@name 货号 */
  goodsNo?: string;
  /**@name 初始库存 */
  quantity: number;
  /**@name 进货价 */
  purchasePrice: number;
  /**@name 最低售价 */
  lowestSellingPrice?: number;
  /**@name 库存设置 */
  stockSetting: number;
  /**@name 生产日期 */
  productionDate?: string;
}
/** 新增商品档案 */
interface IRequestUpdateGoodsRecord extends GoodsRecord {
  /** @name 商品ID */
  goodsUuid: string;
  /**@name 品牌Id */
  goodsBrandUuid: string;
  /**@name 类别Id */
  goodsCategoryUuid: string;
  /**@name 单位Id */
  goodsUnitUuid: string;
  /**@name 进货价 */
  purchasePrice: number;
  /**@name 库存设置 */
  stockSetting: number;
  /**@name 货号 */
  goodsNo?: string;
  /**@name 最低售价 */
  lowestSellingPrice?: number;
}
/** 商品档案列表（含库存数量）请求参数 */
interface IRequestStockGoodsRecord extends IRequest {
  /**@name 商品类别Id */
  goodsCategoryUuid?: string;
  /**@name 商品自定义条码 */
  customBarcode?: string;
  /**@name 商品名称 */
  goodsName?: string;
  /**@name 商品状态 */
  goodsState?: number;
}
/** 供应商档案列表请求参数 */
interface IRequestSuppliers extends IRequest {
  /**@name 供应商名称 */
  name?: string;
}
