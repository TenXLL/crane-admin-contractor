<template>
  <el-dropdown trigger="click">
    <div class="operate-item">
      <div class="user-info">
        <span class="user-name">{{ userInfoData.realName }}</span>
        <img class="user-logo" :src="userInfoData.logoSrc" alt="logo" />
      </div>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="userDetail">用户详情</el-dropdown-item>
        <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { useDialog } from 'crane-element';
import router from '@/router';
import { SelfInfoDTO } from '@/share/types/header.types.ts';
import { _logout } from '@/pages/login/login.service.ts';
import { ResponseCode } from '@/share/types/request.types.ts';
import UserInfoOperate from '@/components/user-info-operate/UserInfoOperate.vue';

const { openDialog } = useDialog();

defineProps({
  userInfoData: {
    type: Object as PropType<SelfInfoDTO>,
    required: true
  }
});

const logout = () => {
  _logout().then((res) => {
    if (res.code === ResponseCode.SUCCESS) {
      ElNotification.success('退出登录成功');
    }
  });
  router.push('/');
};

const userDetail = () => {
  openDialog({
    component: UserInfoOperate,
    options: {
      destroyOnClose: true
    },
    params: {}
  });
};
</script>

<style scoped lang="less">
.operate-item {
  font-size: 18px;
  display: flex;
  height: 100%;
  padding: 0 10px 0;
  cursor: pointer;
  align-items: center;
  transition: background 0.2s;

  &:hover {
    background-color: #f6f6f6;
  }

  .user-info {
    width: 120px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding-right: 10px;
    user-select: none;

    .user-logo {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
      box-shadow:
        rgba(0, 0, 0, 0.05) 0 6px 24px 0,
        rgba(0, 0, 0, 0.08) 0 0 0 1px;
    }

    .user-name {
      margin-right: 8px;
      font-size: 14px;
      font-weight: 600;
      color: #3f4255;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
