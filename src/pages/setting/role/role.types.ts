import { PageDTO } from '@/share/types/request.types.ts';

export interface RoleListVO {
  id: string;
  roleName: string;
  roleSign: string;
  deleted: string;
  tenantId: string;
  gmtCreate: string;
  gmtModified: string;
}

export interface RolePageDTO extends PageDTO {
  roleName?: string;
  roleSign?: string;
}

export interface RoleAddDTO {
  roleName: string;
  roleSign: string;
}

export interface RoleUpdateDTO extends RoleAddDTO {
  id: string;
}

export interface PermissionAssignmentDTO {
  roleId: string;
  menuIdList: string[];
}
