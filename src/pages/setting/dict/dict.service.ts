import service from '@/http';
import {
  AddDictDTO,
  DictListVO,
  QueryDictDTO,
  UpdateDictDTO
} from '@/pages/setting/dict/dict.types.ts';
import { PageVO, RetVO } from '@/share/types/request.types.ts';

export function _getDictList(
  params: QueryDictDTO
): Promise<RetVO<PageVO<DictListVO[]>>> {
  return service.post('/api/v1.0/dict/getDictList', params);
}

export function _addDict(param: AddDictDTO): Promise<RetVO<any>> {
  return service.post('/api/v1.0/dict/add', param);
}

export function _removeDict(id: string): Promise<RetVO<any>> {
  return service.post('/api/v1.0/dict/remove', { id });
}

export function _detailDict(id: string): Promise<RetVO<DictListVO>> {
  return service.post('/api/v1.0/dict/detail', { id });
}

export function _updateDict(param: UpdateDictDTO): Promise<RetVO<any>> {
  return service.post('/api/v1.0/dict/update', param);
}
