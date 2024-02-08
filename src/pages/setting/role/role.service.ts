import {
  PermissionAssignmentDTO,
  RoleAddDTO,
  RoleListVO,
  RolePageDTO,
  RoleUpdateDTO
} from '@/pages/setting/role/role.types.ts';
import service from '@/http';
import { PageVO, RetVO } from '@/share/types/request.types.ts';

export function _pageRoleList(
  param: RolePageDTO
): Promise<RetVO<PageVO<RolePageDTO[]>>> {
  return service.post('/api/v1.0/role/pageRoleList', param);
}

export function _removeRole(id: string): Promise<RetVO<void>> {
  return service.post(`/api/v1.0/role/remove`, { id });
}

export function _addRole(param: RoleAddDTO): Promise<RetVO<void>> {
  return service.post('/api/v1.0/role/add', param);
}

export function _updateRole(param: RoleUpdateDTO): Promise<RetVO<void>> {
  return service.post('/api/v1.0/role/update', param);
}

export function _getRoleById(id: string): Promise<RetVO<RoleListVO>> {
  return service.post('/api/v1.0/role/detail', { id });
}

export function _permissionAssignment(
  param: PermissionAssignmentDTO
): Promise<RetVO<any>> {
  return service.post('/api/v1.0/menu/permissionAssignment', param);
}

export function _getPermissionList(id: string): Promise<RetVO<string[]>> {
  return service.post('/api/v1.0/menu/getPermissionList', { id });
}
