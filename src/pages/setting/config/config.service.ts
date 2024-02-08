import service from '@/http';
import { PageVO, RetVO } from '@/share/types/request.types.ts';
import {
  ConfigAddDTO,
  ConfigListDTO,
  ConfigPageDTO,
  ConfigUpdateDTO
} from '@/pages/setting/config/config.types.ts';

export function _getConfigList(
  param: ConfigPageDTO
): Promise<RetVO<PageVO<ConfigListDTO[]>>> {
  return service.post('/api/v1.0/config/getConfigList', param);
}

export function _addConfig(param: ConfigAddDTO): Promise<RetVO<any>> {
  return service.post('/api/v1.0/config/add', param);
}

export function _updateConfig(param: ConfigUpdateDTO): Promise<RetVO<any>> {
  return service.post('/api/v1.0/config/update', param);
}

export function _detailConfig(id: string): Promise<RetVO<ConfigListDTO>> {
  return service.post('/api/v1.0/config/detail', { id });
}

export function _removeConfig(id: string): Promise<RetVO<any>> {
  return service.post('/api/v1.0/config/remove', { id });
}
