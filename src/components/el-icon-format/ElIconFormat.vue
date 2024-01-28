<script setup lang="ts">
import * as ElIcons from '@element-plus/icons-vue';

defineProps({
  name: {
    type: String,
    required: true
  }
});

const getIconData = () => {
  const data: { [key: string]: any } = {};

  Object.entries(ElIcons).forEach(([key, value]) => {
    data[key] = value;
  });

  return data;
};

const iconMap = shallowRef({
  iconData: getIconData()
});
</script>

<template>
  <el-icon>
    <component :is="iconMap.iconData[name]"></component>
  </el-icon>
</template>

<style scoped lang="less"></style>
