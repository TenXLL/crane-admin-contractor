<template>
  <div class="home w-full flex box-border">
    <div class="main flex-1 box-border flex flex-col">
      <DataBoard></DataBoard>
      <WebsiteCharts></WebsiteCharts>
    </div>
    <div class="sidebar"></div>
  </div>
</template>

<script setup lang="ts">
import DataBoard from '@/pages/home/data-board/DataBoard.vue';
import WebsiteCharts from '@/pages/home/website-introduction/WebsiteCharts.vue';
</script>

<style scoped lang="less">
.home {
  width: 100%;
  gap: 20px;

  .main {
    width: calc(100% - 480px);
  }

  .sidebar {
    width: 460px;
  }
}
</style>
