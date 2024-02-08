export interface TotalBaseInfo {
  menuTree: MenuTree[];
  selfInfoDTO: SelfInfoDTO;
}

export interface MenuTree {
  children?: MenuTree[];
  gmtCreate?: string;
  gmtModified?: string;
  icon?: string;
  id: string;
  title: string;
  orderNumber?: number;
  path: string;
  pid?: string;
}

export interface SelfInfoDTO {
  birthday: string;
  email: string;
  gmtCreate: string;
  gmtModified: string;
  id: string;
  logoId: string;
  logoSrc: string;
  nickname: string;
  password: string;
  phone: string;
  realName: string;
  roleSigns: string[];
  sex: string;
  sign: string;
}
