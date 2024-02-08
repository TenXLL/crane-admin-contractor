export enum ResponseCode {
  SUCCESS = 200,
  ERROR = 500,
  TOKEN_TIME_OUT = 11011,
  TOKEN_FREEZE = 11016
}

export interface RetVO<T = any> {
  code: ResponseCode;
  msg?: string;
  data: T;
}

export interface PageDTO {
  pageNum: number;
  pageSize: number;
  total?: number;
}

export interface PageVO<T = any> {
  current: number;
  pages: number;
  records: T;
  size: number;
  total: number;
}

export interface LabelValue {
  label: string;
  value: string;
  children?: LabelValue[];
}
