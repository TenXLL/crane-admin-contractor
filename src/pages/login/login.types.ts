export interface LoginDTO {
  username?: string;
  phone?: string;
  password: string;
  code: string;
}
export interface LoginVO {
  tokenName: string;
  tokenValue: string;
  isLogin: boolean;
  loginId: string;
  loginType: string;
  tokenTimeout: number;
  sessionTimeout: number;
  tokenSessionTimeout: number;
  tokenActiveTimeout: number;
  loginDevice: string;
  tag: any;
}
