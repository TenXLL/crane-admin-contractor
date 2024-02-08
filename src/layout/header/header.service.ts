import service from '@/http';
import { RetVO } from '@/share/types/request.types.ts';
import { TotalBaseInfo } from '@/share/types/header.types.ts';

export function _totalBaseInfo(): Promise<RetVO<TotalBaseInfo>> {
  return service.get('/api/v1.0/public/totalBaseInfo');
}
