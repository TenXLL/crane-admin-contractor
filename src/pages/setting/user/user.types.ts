import { PageDTO } from '@/share/types/request.types.ts';

export interface UserPageDTO extends PageDTO {
  nickname?: string;
  phone?: string;
}

export interface UserListVO {
  id: string;
  username?: string;
  nickname?: string;
  phone?: string;
  email?: string;
  logoId: string;
  logoSrc: string;
  sex: string;
  sexDesc: string;
  realName?: string;
  idCard?: string;
  birthday?: string;
  deleted: boolean;
  tenantId: string;
  wxOpenId?: string;
  wxPhone?: string;
  address?: string;
  personalSignature?: string;
  gmtCreate: string;
  gmtModified: string;
}

export interface UserAddDTO {
  username?: string;
  nickname?: string;
  phone?: string;
  email?: string;
  logoId?: string;
  sex?: string;
  realName?: string;
  idCard?: string;
  birthday?: string;
  wxOpenId?: string;
  wxPhone?: string;
  address?: string;
  personalSignature?: string;
}

export interface UserUpdateDTO extends UserAddDTO {
  id: string;
}
