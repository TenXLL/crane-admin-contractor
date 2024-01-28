<template>
  <div class="layout w-full h-full box-border">
    <Header :is-collapse="isCollapse"></Header>
    <Container
      @collapse-change="
        (e) => {
          isCollapse = e;
        }
      "
    ></Container>
  </div>
</template>

<script setup lang="ts">
import Header from '@/layout/header/Header.vue';
import Container from '@/layout/container/Container.vue';

const isCollapse = ref(false);
</script>

<style scoped lang="less">
.layout {
  background-color: var(--container-bg-color);
  color: var(--font-color);
}
</style>
