import { MenuTree } from '@/share/types/header.types.ts';

/**
 * 根据树子节点ID查找所有父节点ID
 * @param {array} dataSource 树形结构数据源
 * @param {number} path 子节点ID
 */
export function findParentNodes(
  dataSource: MenuTree[],
  path: string
): MenuTree[] {
  const parentNode: MenuTree[] = []; // 用于存储所有父节点ID的数组

  // 定义一个递归函数，用于遍历整棵树并查找子节点的所有父节点
  function traverse(node: MenuTree) {
    if (node.path === path) {
      parentNode.push(node);
      // 如果当前节点的ID等于子节点的ID，则表示已经找到了子节点，可以开始向上查找父节点
      return true; // 返回true表示已经找到了子节点
    }

    if (node.children) {
      // 如果当前节点有子节点，则继续遍历子节点
      for (const childNode of node.children) {
        if (traverse(childNode)) {
          // 如果在子节点中找到了子节点的父节点，则将当前节点的ID添加到父节点ID数组中，并返回true表示已经找到了子节点
          parentNode.push(node);
          return true;
        }
      }
    }

    return false; // 如果当前节点不是子节点的父节点，则返回false
  }

  // 从根节点开始遍历整棵树，并调用递归函数查找子节点的所有父节点
  for (const node of dataSource) {
    if (traverse(node)) {
      // 如果在当前节点的子树中找到了子节点的父节点，则直接退出循环
      break;
    }
  }

  return parentNode
    .map((i) => {
      return {
        id: i.id,
        title: i.title,
        icon: i.icon,
        path: i.path
      };
    })
    .reverse(); // 返回所有父节点ID的数组
}
