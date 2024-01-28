// 修改主题
import useThemeStore from '@/store/modules/theme.store.ts';

const changeThem = () => {
  // 主题切换
  const changeThemItem = () => {
    if (useThemeStore().isLightThem) {
      document.querySelector('html')?.removeAttribute('class');
    } else {
      document.querySelector('html')?.setAttribute('class', 'dark');
    }
  };
  return { changeThemItem };
};

const initThem = () => {
  if (useThemeStore().isLightThem) {
    document.querySelector('html')?.removeAttribute('class');
  } else {
    document.querySelector('html')?.setAttribute('class', 'dark');
  }
};

export { changeThem, initThem };
