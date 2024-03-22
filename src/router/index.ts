// src/router/index.js
import {
  createRouter,
  createWebHashHistory,
  NavigationFailure,
  RouteLocationNormalized,
  RouteRecordRaw
} from 'vue-router';
import NProgress from './n-progress.ts';
import { setRouterList } from '@/router/router.tag.ts';
// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: '404'
    },
    component: () => import('@/layout/Layout.vue'),
    children: [
      {
        path: '/404',
        name: '404',
        meta: {
          title: '404'
        },
        component: () => import('@/pages/error/404.vue')
      }
    ]
  },
  {
    path: '/403',
    name: '403',
    meta: {
      title: '403'
    },
    component: () => import('@/layout/Layout.vue'),
    children: [
      {
        path: '/403',
        name: '403',
        meta: {
          title: '403'
        },
        component: () => import('@/pages/error/403.vue')
      }
    ]
  },
  {
    path: '/home',
    name: '首页',
    meta: {
      title: '首页'
    },
    component: () => import('@/layout/Layout.vue'),
    children: [
      {
        path: '/home',
        name: '首页',
        meta: {
          title: '首页'
        },
        component: () => import('@/pages/home/Home.vue')
      }
    ]
  },
  {
    path: '/login',
    name: '登录',
    meta: {
      title: '登录'
    },
    component: () => import('@/pages/login/Login.vue')
  },
  {
    path: '/setting',
    name: '系统设置',
    meta: {
      title: '系统设置'
    },
    component: () => import('@/layout/Layout.vue'),
    children: [
      {
        path: '/setting/user',
        name: '用户管理',
        meta: {
          title: '用户管理'
        },
        component: () => import('@/pages/setting/user/User.vue')
      },
      {
        path: '/setting/role',
        name: '角色管理',
        meta: {
          title: '角色管理'
        },
        component: () => import('@/pages/setting/role/Role.vue')
      },
      {
        path: '/setting/menu',
        name: '菜单管理',
        meta: {
          title: '菜单管理'
        },
        component: () => import('@/pages/setting/menu/Menu.vue')
      },
      {
        path: '/setting/org',
        name: '组织机构管理',
        meta: {
          title: '组织机构管理'
        },
        component: () => import('@/pages/setting/org/Org.vue')
      },
      {
        path: '/setting/dict',
        name: '字典管理',
        meta: {
          title: '字典管理'
        },
        component: () => import('@/pages/setting/dict/Dict.vue')
      },
      {
        path: '/setting/bpmn',
        name: '流程管理',
        meta: {
          title: '流程管理'
        },
        component: () => import('@/pages/setting/bpmn/Bpmn.vue')
      },
      {
        path: '/setting/config',
        name: '全局配置管理',
        meta: {
          title: '全局配置管理'
        },
        component: () => import('@/pages/setting/config/Config.vue')
      }
    ]
  }
];

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
});

// 前置路由
router.beforeEach((_to: any, _from: any, next: any) => {
  setRouterList(_to);
  // 路由守卫
  // 进度条开始
  NProgress.start();
  // 随机增加进度
  NProgress.inc();
  next();
});

// 后置路由
router.afterEach(
  (
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    _failure?: NavigationFailure | void
  ) => {
    if (to.meta.title) {
      document.title = `${document.title.split('-')[0]} - ${
        to.meta.title as string
      }`;
    }
    // 关闭掉进度条
    NProgress.done();
  }
);

/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: '/' }).then(() => {});
  location.reload();
}

export default router;
