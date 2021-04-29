/** 请求的数据参数 */
export interface IRequest {
  currPage?: number;
  pageSize?: number;
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
  data?: Array<T>;
  msg: string;
}

/** 商品通用类型 */
interface GoodsType {
  /** @name 商户id */
  mrchId: number;
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

/** 商品品牌  */
export interface GoodsBrandType extends GoodsType {
  /** @name 单位Id*/
  goodsBrandUuid: string;
  /** @name 品牌名称*/
  name: string;
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
