import { PageDTO } from '@/share/types/request.types.ts';

export interface QueryDictDTO extends PageDTO {
  type?: string;
  moduleName?: string;
}

export interface DictListVO {
  description: string;
  gmtCreate: string;
  gmtModified: string;
  id: string;
  moduleName: string;
  type: string;
  value: string;
}

export interface AddDictDTO {
  description: string;
  moduleName: string;
  type: string;
  value: string;
}

export interface UpdateDictDTO extends AddDictDTO {
  id: string;
}
