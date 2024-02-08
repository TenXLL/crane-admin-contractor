import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Router } from '@/share/types/router.types.ts';
import router from '@/router';

const useRouterStore = defineStore(
  'router',
  () => {
    const routerList = ref<Router[]>([]);
    const breadcrumbList = ref<Router[]>([]);

    const setRouterList = (router: Router) => {
      router.active = true;
      const canPush = routerList.value.filter((i) => {
        return i.path === router.path;
      });

      routerList.value.forEach((i: Router) => {
        i.active = false;
      });

      if (canPush.length > 0) {
        routerList.value.forEach((i) => {
          if (i.path === router.path) {
            i.active = true;
          }
        });
        return;
      }

      routerList.value = [...routerList.value, router];
    };

    const setBreadcrumbList = (router: Router[]) => {
      breadcrumbList.value = router;
    };

    const close = (path: string) => {
      if (routerList.value.length <= 1) {
        return;
      }
      routerList.value = routerList.value.filter((i) => i.path !== path);
      router
        .push(routerList.value[routerList.value.length - 1].path)
        .then(() => {});
    };

    return {
      routerList,
      breadcrumbList,
      setRouterList,
      setBreadcrumbList,
      close
    };
  },
  {
    persist: true
  }
);

export default useRouterStore;
