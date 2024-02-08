import { UserPageDTO } from '@/pages/setting/user/user.types.ts';

export interface OrgTreeVO {
  children: OrgTreeVO[];
  fullPath: string;
  gmtCreate: string;
  gmtModified: string;
  id: string;
  leaderId: string;
  name: string;
  orderNumber: number;
  path: string;
  pid: string;
}

export interface OrgUserPageDTO extends UserPageDTO {
  orgId?: string;
}

export interface OrgAddDTO {
  name: string;
  path: string;
  pid: string;
  orderNumber: number;
}

export interface OrgUpdateDTO extends OrgAddDTO {
  id: string;
}

export interface User2OrgDTO {
  orgId: string;
  userId: string;
}

export interface DelUserFromOrgDTO {
  orgId: string;
  userId: string;
}
