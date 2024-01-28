// import { RouteLocationNormalized } from 'vue-router';
// import { Ref } from 'vue';
// import NProgress from '@/router/n-progress.ts';
// import useUserStore from '@/store/modules/user.store.ts';
//
// const excludePaths = ['/login', '/404', '/403', '/'];
//
// export function guard(
//   to: RouteLocationNormalized,
//   _from: RouteLocationNormalized,
//   next: any,
//   forbiddenCount: Ref<number>
// ) {
//   const { paths } = useUserStore();
//   const targetPath = to.path;
//
//   // 排除基础路由
//   if (excludePaths.includes(targetPath)) {
//     // 进度条开始
//     NProgress.start();
//     // 随机增加进度
//     NProgress.inc();
//     next();
//     return;
//   }
//
//   if (!paths.includes(targetPath)) {
//     if (forbiddenCount.value === 0) {
//       forbiddenCount.value++;
//       next('/403');
//     } else {
//       forbiddenCount.value = 0;
//     }
//   }
// }
