<template>
  <aside
    class="relative h-full box-border"
    :class="{ 'crane-aside-collapse': isCollapse, 'crane-aside': !isCollapse }"
  >
    <div
      class="icon-container top-50% absolute rounded-full flex items-center justify-center w-6 h-6 z-100"
      :class="{ 'rotate-180': isCollapse }"
      @click="changeCollapse"
    >
      <el-icon>
        <ArrowLeft />
      </el-icon>
    </div>
    <div
      class="menu-container w-full h-full box-border overflow-x-hidden overflow-y-auto"
    >
      <Menu :is-collapse="isCollapse"></Menu>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ArrowLeft } from '@element-plus/icons-vue';
import Menu from './menu/Menu.vue';

const isCollapse = ref(false);

const emits = defineEmits(['collapseChange']);

const changeCollapse = () => {
  isCollapse.value = !isCollapse.value;
  emits('collapseChange', isCollapse.value);
};
</script>

<style scoped lang="less">
.crane-aside {
  width: 240px;
  background-color: var(--bg-primary-color);
  border-right: 1px solid var(--border-color);
  transition: all 0.3s linear;
}
.crane-aside-collapse {
  width: 64px;
  background-color: var(--bg-primary-color);
  border-right: 1px solid var(--border-color);
  transition: all 0.3s linear;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.icon-container {
  background-color: var(--bg-primary-color);
  cursor: pointer;
  box-shadow: var(--box-shadow);
  transition: all 0.3s linear;
  right: -0.75rem;
  color: var(--font-color);
}
</style>
