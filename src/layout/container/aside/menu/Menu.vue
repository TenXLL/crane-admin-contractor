<script setup lang="ts">
import { MenuTree } from '@/share/types/header.types.ts';
import router from '@/router';
import useUserStore from '@/store/modules/user.store.ts';
import useRouterStore from '@/store/modules/router.store.ts';

const treeData = ref<MenuTree[]>([]);

defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
});

watch(
  () => useUserStore().menu,
  (newValue) => {
    treeData.value = newValue;
  }
);

onMounted(() => {
  initMenu();
});

const handleOpen = (path: string) => {
  router.push(path);
};

const initMenu = () => {
  treeData.value = useUserStore().menu;
};
</script>

<template>
  <el-menu
    active-text-color="#ffd04b"
    class="el-menu-vertical-demo"
    :collapse-transition="false"
    :default-active="
      useRouterStore().routerList?.find((i) => {
        return i.active;
      })?.path
    "
    :collapse="isCollapse"
    @select="handleOpen"
  >
    <template v-for="menuItem in treeData" :key="menuItem.id">
      <template v-if="menuItem.children && menuItem.children.length > 0">
        <el-sub-menu :index="menuItem.path.toString()">
          <template #title>
            <ElIconFormat :name="menuItem.icon" />
            <span>{{ menuItem.title }}</span>
          </template>
          <template v-for="childItem in menuItem.children" :key="childItem.id">
            <template
              v-if="childItem.children && childItem.children.length > 0"
            >
              <el-sub-menu :index="childItem.path.toString()">
                <template #title>
                  <ElIconFormat :name="childItem.icon" />
                  <span>{{ childItem.title }}</span>
                </template>
                <template
                  v-for="subChildItem in childItem.children"
                  :key="subChildItem.id"
                >
                  <el-menu-item :index="subChildItem.path.toString()">
                    <ElIconFormat :name="childItem.icon" />
                    <span>{{ subChildItem.title }}</span>
                  </el-menu-item>
                </template>
              </el-sub-menu>
            </template>
            <template v-else>
              <el-menu-item :index="childItem.path.toString()">
                <ElIconFormat :name="childItem.icon" />
                <span>{{ childItem.title }}</span>
              </el-menu-item>
            </template>
          </template>
        </el-sub-menu>
      </template>
      <template v-else>
        <el-menu-item :index="menuItem.path.toString()">
          <ElIconFormat :name="menuItem.icon" />
          <span>{{ menuItem.title }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<style scoped lang="less"></style>
