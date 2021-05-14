import React from "react";
import { GoodsBrandType } from "../../res-req";

export interface TableHeader<T = any> {
  prop: string;
  width?: number;
  label: string;
  render?: (entity: T) => React.ReactNode;
}

export interface TableRow {
  id?: number;
  name?: string;
  isCheck?: boolean;
}
export interface TableProps<T> {
  headers: Array<TableHeader>;
  data: T[];
  height?: string;
  width?: number | string;
  tdWidth?: number;
  stripe?: boolean;
  border?: boolean;
  msg?: string;
  loading?: boolean;
  loadMore?: Function;
  onAddButtonClick?: () => void;
  onDeleteButtonClick?: (_: T[]) => void;
  onCheck?: (_: T & TableRow) => void;
  onCheckAll?: (checked: boolean) => void;
  showToolBar?: boolean;
}
