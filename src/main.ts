import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import pinia from './store';
import router from './router';

import App from './App.vue';
import 'virtual:svg-icons-register';
import 'uno.css';
import 'animate.css';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import 'crane-element/lib/style.css';
import './common.less';

import sizeOb from '@/hooks/sizeOb.ts';

const app = createApp(App);

app.directive('ob', sizeOb);

app.use(ElementPlus, {
  locale: zhCn
});
app.use(pinia);
app.use(router);
app.mount('#app');
