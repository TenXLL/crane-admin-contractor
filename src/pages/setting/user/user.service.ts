import service from '@/http';
import { PageVO, RetVO } from '@/share/types/request.types.ts';
import {
  UserAddDTO,
  UserListVO,
  UserPageDTO,
  UserUpdateDTO
} from '@/pages/setting/user/user.types.ts';

export function _pageUserList(
  param: UserPageDTO
): Promise<RetVO<PageVO<UserListVO[]>>> {
  return service.post('/api/v1.0/user/pageUserList', param);
}

export function _addUser(param: UserAddDTO): Promise<RetVO<any>> {
  return service.post('/api/v1.0/user/add', param);
}

export function _removeUser(id: string): Promise<RetVO<any>> {
  return service.post('/api/v1.0/user/remove', { id });
}

export function _getUserById(id: string): Promise<RetVO<UserListVO>> {
  return service.post('/api/v1.0/user/detail', { id });
}

export function _updateUser(param: UserUpdateDTO): Promise<RetVO<any>> {
  return service.post('/api/v1.0/user/update', param);
}

export function _getRoleSelects(): Promise<RetVO<any>> {
  return new Promise((resolve) => {
    service.get('/api/v1.0/role/getRoleSelects').then((res) => {
      resolve(res.data);
    });
  });
}
