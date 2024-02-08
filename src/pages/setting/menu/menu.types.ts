export interface QueryMenuDTO {
  title?: string;
  path?: string;
}

export interface MenuAddDTO {
  pid: string;
  title: string;
  path: string;
  menuType: string;
  orderNumber: number;
  icon: string;
  authority: string;
  target: string;
  hide: boolean;
}

export interface MenuUpdateDTO extends MenuAddDTO {
  id: string;
}
