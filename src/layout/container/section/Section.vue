<script setup lang="ts">
import ToolBar from '@/layout/container/section/tool-bar/ToolBar.vue';
</script>

<template>
  <section class="section h-full box-border relative">
    <ToolBar></ToolBar>
    <div class="main-container box-border">
      <router-view class="router"></router-view>
    </div>
  </section>
</template>

<style scoped lang="less">
.section {
  flex: 1;
  box-sizing: border-box;
  overflow: hidden;

  .main-container {
    width: 100%;
    height: calc(100% - 40px);
    position: absolute;
    top: 40px;
    padding: 10px;
    overflow-x: hidden;
    overflow-y: auto;

    .router {
      animation: bounceInRight; /* referring directly to the animation's @keyframe declaration */
      animation-duration: 0.8s; /* don't forget to set a duration! */
    }
  }
}
</style>
