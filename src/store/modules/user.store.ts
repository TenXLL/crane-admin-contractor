import { defineStore } from 'pinia';

const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<any>();
    const token = ref<string>('');
    const menu = ref<any[]>([]);
    const roles = ref<string[]>([]);
    const perms = ref<string[]>([]);
    const paths = ref<string[]>([]);

    const setUserInfo = (data: any) => {
      userInfo.value = data;
    };

    const setToken = (data: string) => {
      token.value = data;
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

    const logout = () => {
      window.localStorage.removeItem('user');
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
      setRoles,
      setPerms,
      setPaths,
      logout
    };
  },
  {
    persist: true
  }
);

export default useUserStore;
