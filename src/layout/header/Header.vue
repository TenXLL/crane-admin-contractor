<template>
  <header class="header w-full box-border flex">
    <div
      class="h-full box-border flex justify-center items-center"
      :class="{
        'header-logo-collapse': isCollapse,
        'header-logo': !isCollapse
      }"
    >
      <svg-icon icon-class="crane" style="width: 32px; height: 32px" />
      <span v-show="!isCollapse" class="website-name">crane-admin</span>
    </div>
    <div class="header-plan h-full flex items-center ml-2">
      <BreadCrumb></BreadCrumb>
    </div>
    <div class="header-user h-full flex-1 flex justify-end items-center">
      <el-switch
        v-model="useThemeStore().isLightThem"
        size="large"
        inline-prompt
        :active-icon="Sunny"
        :inactive-icon="Moon"
        @change="changeThemItem"
      />
      <UserInfoAvatar
        :user-info-data="{
          logoSrc: useUserStore().userInfo.logoSrc,
          realName: useUserStore().userInfo.realName
        }"
      ></UserInfoAvatar>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Moon, Sunny } from '@element-plus/icons-vue';
import UserInfoAvatar from '@/layout/header/user-info-avatar/UserInfoAvatar.vue';
import useThemeStore from '@/store/modules/theme.store.ts';
import { changeThem, initThem } from '@/hooks/changeColor.ts';
import BreadCrumb from '@/layout/header/breadcrumb/BreadCrumb.vue';
import { _totalBaseInfo } from '@/layout/header/header.service.ts';
import { ResponseCode } from '@/share/types/request.types.ts';
import useUserStore from '@/store/modules/user.store.ts';
import { SelfInfoDTO } from '@/share/types/header.types.ts';

const { changeThemItem } = changeThem();
const userInfoData = ref<SelfInfoDTO>(<SelfInfoDTO>{});

defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
});

onMounted(() => {
  initThem();
  getUserInfo();
});

function getUserInfo() {
  _totalBaseInfo().then((res) => {
    if (res.code === ResponseCode.SUCCESS) {
      userInfoData.value = res.data.selfInfoDTO;
      useUserStore().setUserInfo(res.data.selfInfoDTO);
      useUserStore().setMenu(res.data.menuTree);
    }
  });
}
</script>

<style scoped lang="less">
.header {
  height: 50px;
  background-color: var(--bg-primary-color);
  border-bottom: 1px solid var(--border-color);
  color: var(--font-color);

  .header-logo {
    width: 240px;
    border-right: 1px solid var(--border-color);
    transition: all 0.3s linear;

    .website-name {
      margin-left: 10px;
      font-size: 18px;
      font-weight: 600;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .header-logo-collapse {
    width: 64px;
    transition: all 0.3s linear;
    border-right: 1px solid var(--border-color);
  }
}
</style>
