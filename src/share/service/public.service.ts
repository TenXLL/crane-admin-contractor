import service from '@/http/index.ts';
import { LabelValue } from '@/share/types/request.types.ts';

export function _getSelect(type: string): Promise<LabelValue[]> {
  return new Promise((resolve) => {
    service.get(`/api/v1.0/dict/getSelects?type=${type}`).then((res) => {
      resolve(res.data);
    });
  });
}
