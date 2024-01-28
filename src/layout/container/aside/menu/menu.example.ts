import { MenuTree } from '@/share/types/header.types.ts';

export const menuExample: MenuTree[] = [
  {
    id: '1',
    path: '/home',
    title: '首页',
    icon: 'House'
  },
  {
    id: '2',
    path: '/setting',
    title: '系统设置',
    icon: 'Setting',
    children: [
      {
        id: '3',
        path: '/setting/user',
        title: '用户管理',
        icon: 'User'
      }
    ]
  }
];
