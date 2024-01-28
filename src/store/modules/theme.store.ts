import { defineStore } from 'pinia';
import { ref } from 'vue';

const useThemeStore = defineStore(
  'theme',
  () => {
    const isLightThem = ref<boolean>(false);

    const setTheme = (tokenValue: boolean) => {
      isLightThem.value = tokenValue;
    };

    return {
      isLightThem,
      setTheme
    };
  },
  {
    persist: true
  }
);

export default useThemeStore;
