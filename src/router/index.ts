// src/router/index.ts
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
    redirect: '/home'
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
    _to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    _failure?: NavigationFailure | void
  ) => {
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
