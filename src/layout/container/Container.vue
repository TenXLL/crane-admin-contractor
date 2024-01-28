<template>
  <div class="crane-container w-full box-border flex">
    <Aside @collapse-change="(e) => emits('collapseChange', e)"></Aside>
    <Section></Section>
  </div>
</template>

<script setup lang="ts">
import Section from '@/layout/container/section/Section.vue';
import Aside from '@/layout/container/aside/Aside.vue';

const emits = defineEmits(['collapseChange']);
</script>

<style scoped lang="less">
.crane-container {
  height: calc(100vh - 50px);
}
</style>
