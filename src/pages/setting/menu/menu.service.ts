import service from '@/http';
import {
  MenuAddDTO,
  MenuUpdateDTO,
  QueryMenuDTO
} from '@/pages/setting/menu/menu.types.ts';
import { LabelValue, RetVO } from '@/share/types/request.types.ts';
import { MenuTree } from '@/share/types/header.types.ts';

export function _getMenuTree(param: QueryMenuDTO): Promise<RetVO<MenuTree[]>> {
  return service.post('/api/v1.0/menu/getMenuTree', param);
}

export function _addMenu(param: MenuAddDTO): Promise<RetVO<any>> {
  return service.post('/api/v1.0/menu/add', param);
}

export function _removeMenu(id: string): Promise<RetVO<any>> {
  return service.post('/api/v1.0/menu/remove', { id });
}

export function _detailMenu(id: string): Promise<RetVO<any>> {
  return service.post('/api/v1.0/menu/detail', { id });
}

export function _updateMenu(param: MenuUpdateDTO): Promise<RetVO<any>> {
  return service.post('/api/v1.0/menu/update', param);
}

export function _getMenuTreeSelect(): Promise<LabelValue[]> {
  return new Promise((resolve) => {
    _getMenuTree({}).then((res) => {
      const tree = convertTreeStructure(res.data);
      resolve(tree);
    });
  });
}

function convertTreeStructure(originalNodes: MenuTree[]): LabelValue[] {
  return originalNodes.map((originalNode) => {
    const { title, id, children } = originalNode;
    const transformedNode: LabelValue = {
      label: title,
      value: id
    };

    if (children) {
      transformedNode.children = convertTreeStructure(children);
    }

    return transformedNode;
  });
}
