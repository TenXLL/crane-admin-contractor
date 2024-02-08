import service from '@/http';
import { RetVO } from '@/share/types/request.types.ts';
import { UserListVO, UserUpdateDTO } from '@/pages/setting/user/user.types.ts';

export function _selfInfo(): Promise<RetVO<UserListVO>> {
  return service.post('/api/v1.0/user/selfInfo');
}

export function _updateSelf(param: UserUpdateDTO): Promise<RetVO<any>> {
  return service.post('/api/v1.0/user/updateSelfInfo', param);
}
