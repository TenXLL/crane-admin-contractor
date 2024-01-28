import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Router } from '@/share/types/router.types.ts';

const useRouterStore = defineStore(
  'router',
  () => {
    const routerList = ref<Router[]>([]);
    const breadcrumbList = ref<Router[]>([]);

    const setRouterList = (router: Router) => {
      const canPush = routerList.value.filter((i) => {
        return i.path === router.path;
      });

      if (canPush.length > 0) return;

      routerList.value.forEach((i: Router) => {
        i.active = false;
      });
      router.active = true;
      routerList.value.push(router);
    };

    const setBreadcrumbList = (router: Router[]) => {
      breadcrumbList.value = router;
    };

    return {
      routerList,
      breadcrumbList,
      setRouterList,
      setBreadcrumbList
    };
  },
  {
    persist: true
  }
);

export default useRouterStore;
