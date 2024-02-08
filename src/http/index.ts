//  src/utils/request.ts
import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
import { ResponseCode } from '@/share/types/request.types.ts';
import useUserStore from '@/store/modules/user.store.ts';
import router from '@/router';
import { _logout } from '@/pages/login/login.service.ts';

let { token } = useUserStore();

watch(
  () => useUserStore().token,
  () => {
    token = useUserStore().token;
  }
);

// 创建 axios 实例
const service = axios.create({
  timeout: 500000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
    Credentials: 'include'
  },
  withCredentials: true
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (token) {
      config.headers['crane-token'] = token;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code } = response.data;
    // 登录成功
    if (code === ResponseCode.SUCCESS) {
      return response.data;
    }
    if (
      code === ResponseCode.TOKEN_TIME_OUT ||
      code === ResponseCode.TOKEN_FREEZE
    ) {
      router.push('/').then(() => {});
      return;
    }
    return response.data;
  },
  (error: any) => {
    ElMessage.error(error.message || '系统出错');
    router.push('/').then(() => {});
    return Promise.reject(error.message);
  }
);

// 导出 axios 实例
export default service;
