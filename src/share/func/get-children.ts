import { LabelValue } from '@/share/types/request.types.ts';

export function getChildren(value: string, nodes: LabelValue[]): string[] {
  const result: string[] = [];

  function findNode(node: LabelValue, isAll: boolean = false): void {
    if (node.value === value) {
      isAll = true;
    }

    if (isAll) {
      result.push(node.value);
      if (node.children) {
        for (const childNode of node.children) {
          findNode(childNode, true);
        }
      }
    }

    if (node.children) {
      for (const childNode of node.children) {
        findNode(childNode);
      }
    }
  }

  for (const rootNode of nodes) {
    findNode(rootNode);
  }

  return result;
}
