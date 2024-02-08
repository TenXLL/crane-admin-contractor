import { defineStore } from 'pinia';
import { MenuTree, SelfInfoDTO } from '@/share/types/header.types.ts';

const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<SelfInfoDTO>(<SelfInfoDTO>{});
    const token = ref<string>('');
    const menu = ref<MenuTree[]>([]);
    const roles = ref<string[]>([]);
    const perms = ref<string[]>([]);
    const paths = ref<string[]>([]);

    const setUserInfo = (data: any) => {
      userInfo.value = data;
    };

    const setToken = (data: string) => {
      token.value = data;
    };

    const setMenu = (data: MenuTree[]) => {
      menu.value = data;
    };

    const setRoles = (data: string[]) => {
      roles.value = data;
    };

    const setPerms = (data: string[]) => {
      perms.value = data;
    };

    const setPaths = (data: string[]) => {
      paths.value = data;
    };

    return {
      userInfo,
      token,
      menu,
      roles,
      perms,
      paths,
      setUserInfo,
      setToken,
      setMenu,
      setRoles,
      setPerms,
      setPaths
    };
  },
  {
    persist: true
  }
);

export default useUserStore;
