import { RouteLocationNormalized } from 'vue-router';

import useRouterStore from '@/store/modules/router.store.ts';
import { Router } from '@/share/types/router.types.ts';
import { findParentNodes } from '@/share/func/get-parent.ts';
import useUserStore from '@/store/modules/user.store.ts';
import { MenuTree } from '@/share/types/header.types.ts';

export function setRouterList(to: RouteLocationNormalized) {
  dfs(useUserStore().menu, to.path);

  const breadData = findParentNodes(useUserStore().menu, to.path);
  useRouterStore().setBreadcrumbList(breadData as Router[]);
}

const dfs = (menu: MenuTree[], path: string) => {
  menu.forEach((i) => {
    if (i.path === path) {
      useRouterStore().setRouterList(i);
    } else if (i.children) {
      dfs(i.children, path);
    }
  });
};
