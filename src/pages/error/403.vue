<script setup lang="ts"></script>

<template>
  <div class="four-zero-four">
    <svg-icon icon-class="403"></svg-icon>
  </div>
</template>

<style scoped lang="less">
.four-zero-four {
  width: 100%;
  min-height: 100%;
  display: flex;
  border-radius: 5px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.02);
  transition: all 0.5s ease;
  box-sizing: border-box;
  background-color: var(--bg-primary-color);
  justify-content: center;
  align-items: center;
  font-size: 650px;

  &:hover {
    box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.05);
  }
}
</style>
