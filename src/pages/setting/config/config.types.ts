import { PageDTO } from '@/share/types/request.types.ts';

export interface ConfigListDTO {
  configName: string;
  configValue: string;
  description: string;
}

export interface ConfigPageDTO extends PageDTO {
  configName?: string;
  description?: string;
}

export interface ConfigAddDTO {
  configName: string;
  configValue: string;
  description: string;
}

export interface ConfigUpdateDTO extends ConfigAddDTO {
  id: string;
}
