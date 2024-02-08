import service from '@/http';
import { LabelValue, PageVO, RetVO } from '@/share/types/request.types.ts';
import {
  DelUserFromOrgDTO,
  OrgAddDTO,
  OrgTreeVO,
  OrgUpdateDTO,
  OrgUserPageDTO,
  User2OrgDTO
} from '@/pages/setting/org/org.types.ts';
import { UserListVO } from '@/pages/setting/user/user.types.ts';
import { formatTreeData } from '@/share/func/format.func.ts';

export function _treeList(): Promise<RetVO<OrgTreeVO[]>> {
  return service.post('/api/v1.0/org/treeList');
}

export function _getOrgUserList(
  orgUserPageDTO: OrgUserPageDTO
): Promise<RetVO<PageVO<UserListVO[]>>> {
  return service.post('/api/v1.0/org/getOrgUserList', orgUserPageDTO);
}

export function _treeSelect(): Promise<LabelValue[]> {
  return new Promise((resolve) => {
    _treeList().then((res) => {
      resolve(formatTreeData(res.data, 'name', 'id'));
    });
  });
}

export function _addOrg(data: OrgAddDTO): Promise<RetVO<void>> {
  return service.post('/api/v1.0/org/add', data);
}

export function _removeOrg(id: string): Promise<RetVO<void>> {
  return service.post('/api/v1.0/org/remove', { id });
}

export function _detailOrg(id: string): Promise<RetVO<OrgTreeVO>> {
  return service.post('/api/v1.0/org/detail', { id });
}

export function _updateOrg(data: OrgUpdateDTO): Promise<RetVO<void>> {
  return service.post('/api/v1.0/org/update', data);
}

export function _getUserSelect() {
  return new Promise((resolve) => {
    service.post('/api/v1.0/user/getUserList').then((res) => {
      resolve(res.data);
    });
  });
}

export function _setUser2Org(param: User2OrgDTO): Promise<RetVO<void>> {
  return service.post('/api/v1.0/org/setUser2Org', param);
}

export function _removeUserFromOrg(
  param: DelUserFromOrgDTO
): Promise<RetVO<void>> {
  return service.post('/api/v1.0/org/removeUserFromOrg', param);
}
