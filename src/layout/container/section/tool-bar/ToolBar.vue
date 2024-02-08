<template>
  <div class="tool-bar w-full absolute top-0 flex items-center">
    <div
      class="left flex items-center justify-center h-full box-border cursor-pointer"
    >
      <el-icon><ArrowLeft /></el-icon>
    </div>
    <div class="bar flex-1 flex items-center gap-1 box-border">
      <div
        v-for="(item, index) in routerList"
        :key="index"
        class="bar-item flex items-center justify-center gap-1 h-full box-border cursor-pointer"
        :class="{ active: item.active }"
        @click="router.push(item.path)"
      >
        <span>{{ item.title }}</span>
        <el-icon
          v-if="routerList.length > 1"
          class="text-xl"
          @click="close($event, item.path)"
        >
          <Close />
        </el-icon>
      </div>
    </div>
    <div
      class="right flex items-center justify-center h-full box-border cursor-pointer"
    >
      <el-icon><ArrowRight /></el-icon>
    </div>
    <div
      ref="refresh"
      class="right flex items-center justify-center h-full box-border cursor-pointer"
    >
      <el-icon><RefreshRight /></el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowLeft,
  ArrowRight,
  Close,
  RefreshRight
} from '@element-plus/icons-vue';
import { ElIcon } from 'element-plus';
import { Router } from '@/share/types/router.types.ts';
import useRouterStore from '@/store/modules/router.store.ts';
import router from '@/router';

const routerList = ref<Router[]>([]);
const refresh = ref<InstanceType<typeof HTMLElement>>();

watch(
  () => useRouterStore().routerList,
  (val) => {
    routerList.value = val;
  }
);

onMounted(() => {
  routerList.value = useRouterStore().routerList;
  refresh.value?.addEventListener('click', refreshPage);
});

onUnmounted(() => {
  refresh.value?.removeEventListener('click', refreshPage);
});

function close(e: Event, path: string) {
  e.stopPropagation();
  useRouterStore().close(path);
}

function refreshPage() {
  // 设置子节点icon动画转圈
  (refresh.value?.childNodes[0] as HTMLElement).classList.add('animate-spin');
  setTimeout(() => {
    (refresh.value?.childNodes[0] as HTMLElement).classList.remove(
      'animate-spin'
    );
  }, 1000);

  window.location.reload();
}
</script>

<style scoped lang="less">
.tool-bar {
  height: 40px;
  white-space: nowrap;
  background-color: var(--bg-secondary-color);
  box-sizing: border-box;
  border-bottom: 1px solid var(--border-color);

  .left {
    width: 40px;
    background-color: var(--bg-primary-color);
    border: 1px solid var(--border-color);
  }

  .bar {
    user-select: none;

    .bar-item {
      padding: 6px 10px;
      margin: 0 5px;
      border: 1px solid var(--border-color);
      border-radius: 5px;

      .text-xl {
        font-size: 0;
        transition: width 0.3s ease-in-out;
      }

      &:hover .text-xl {
        font-size: 15px;
        transition: width 0.3s ease-in-out;
      }
    }

    .active {
      border: 1px solid #519a73;
    }
  }

  .right {
    width: 40px;
    background-color: var(--bg-primary-color);
    border: 1px solid var(--border-color);
  }
}
</style>
