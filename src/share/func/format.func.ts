import { LabelValue } from '@/share/types/request.types.ts';

export function formatTreeData(
  treeNodes: any[],
  labelName: string,
  valueName: string
): LabelValue[] {
  return treeNodes.map((node) => ({
    label: node[labelName],
    value: node[valueName],
    children: node.children
      ? formatTreeData(node.children, labelName, valueName)
      : undefined
  }));
}
