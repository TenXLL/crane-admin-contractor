<template>
  <div
    class="data-board w-full flex box-border justify-between items-center gap-3"
  >
    <div class="board-item flex h-full">
      <div class="pic-container box-border">
        <svg-icon icon-class="total-count" size="60" />
      </div>
      <div class="data-count">
        <span class="title">线上总内容</span>
        <span class="content">111</span>
      </div>
    </div>
    <div class="board-item flex h-full">
      <div class="pic-container box-border">
        <svg-icon icon-class="in-setting" size="60" />
      </div>
      <div class="data-count">
        <span class="title">投放中内容</span>
        <span class="content">222</span>
      </div>
    </div>
    <div class="board-item flex h-full">
      <div class="pic-container box-border">
        <svg-icon icon-class="comment" size="60" />
      </div>
      <div class="data-count">
        <span class="title">日新增评论</span>
        <span class="content">333</span>
      </div>
    </div>
    <div class="board-item flex h-full">
      <div class="pic-container box-border">
        <svg-icon icon-class="up" size="60" />
      </div>
      <div class="data-count">
        <span class="title">较昨日新增</span>
        <span class="content">444</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.data-board {
  height: 100px;
  border: 1px solid var(--border-color);
  padding: 0 10px;

  .board-item {
    width: 25%;
    display: flex;
    align-items: center;
    gap: 5px;

    .pic-container {
      width: 60px;
      height: 60px;
      padding: 1px;
      border-radius: 50%;
      border: 1px solid var(--border-color);
      background-color: var(--bg-secondary-color);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .data-count {
      flex: 1;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: center;
      margin-left: 10px;

      .title {
        font-size: 14px;
        font-weight: 500;
        color: var(--font-color-2);
      }

      .content {
        font-size: 18px;
        color: var(--font-color);
        font-weight: 600;
        margin-top: 15px;
      }
    }
  }
}
</style>
