import { RouteLocationNormalized } from 'vue-router';
import { menuExample } from '@/layout/container/aside/menu/menu.example.ts';
import useRouterStore from '@/store/modules/router.store.ts';
import { Router } from '@/share/types/router.types.ts';
import { findParentNodes } from '@/share/func/get-parent.ts';

export function setRouterList(to: RouteLocationNormalized) {
  menuExample.forEach((i) => {
    if (i.path === to.path) {
      useRouterStore().setRouterList(i as Router);
    }
  });

  const breadData = findParentNodes(menuExample, to.path);
  useRouterStore().setBreadcrumbList(breadData as Router[]);
}
