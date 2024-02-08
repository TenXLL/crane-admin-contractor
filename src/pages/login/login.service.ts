import service from '@/http';
import { RetVO } from '@/share/types/request.types.ts';
import { LoginDTO, LoginVO } from '@/pages/login/login.types.ts';

export function _login(param: LoginDTO): Promise<RetVO<LoginVO>> {
  return service.post('/api/v1.0/login/login_pc', param);
}

export function _getVerify(): Promise<Blob> {
  return service.get('/api/v1.0/login/getVerify', {
    responseType: 'blob' // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  });
}

export function _logout(): Promise<RetVO> {
  return service.get('/api/v1.0/login/logout');
}
