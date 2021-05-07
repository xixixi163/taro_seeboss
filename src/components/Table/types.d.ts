import React from "react";

export interface TableHeader {
  prop: string;
  width?: number;
  label: string;
  render?: () => React.ReactNode;
}

export interface TableRow {
  id: number;
  name: string;
  isCheck: boolean;
}

export interface TableProps {
  headers: Array<TableHeader>;
  data: Array<TableRow>;
  height?: string;
  width?: number | string;
  tdWidth?: number;
  stripe?: boolean;
  border?: boolean;
  msg?: string;
}
