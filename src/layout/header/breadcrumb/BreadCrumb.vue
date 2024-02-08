<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue';
import { Router } from '@/share/types/router.types.ts';
import useRouterStore from '@/store/modules/router.store.ts';

const breadcrumbList = ref<Router[]>([]);

watch(
  () => useRouterStore().breadcrumbList,
  (val) => {
    breadcrumbList.value = val;
  }
);

onMounted(() => {
  breadcrumbList.value = useRouterStore().breadcrumbList;
});
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
      <div class="flex items-center gap-1">
        <ElIconFormat v-if="item.icon" :name="item.icon" />
        {{ item.title }}
      </div>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped lang="less"></style>
