<template>
  <div class="code_input">
    <el-input
      :model-value="codeData"
      size="large"
      :prefix-icon="CircleCheck"
      placeholder="请输入验证码"
      @input="input"
    />
    <img class="code-img" :src="codeSrc" alt="验证码" @click="init" />
  </div>
</template>

<script setup lang="ts">
import { CircleCheck } from '@element-plus/icons-vue';
import { _getVerify } from '@/pages/login/login.service.ts';

const codeData = ref('');
const codeSrc = ref();

const interval = ref();

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: String
});

watch(
  () => props.modelValue,
  (value) => {
    codeData.value = value as string;
  }
);

onMounted(() => {
  init();

  interval.value = setInterval(
    () => {
      init();
    },
    1000 * 60 * 5
  );
});

onBeforeUnmount(() => {
  clearInterval(interval.value);
});

function init() {
  _getVerify().then((res) => {
    blobToBase64(res).then((base64String) => {
      codeSrc.value = base64String;
    });
  });
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    // 读取Blob并转换为Base64
    reader.readAsDataURL(blob);
  });
}

function input(value: string) {
  emit('update:modelValue', value);
}
</script>

<style scoped lang="less">
.code_input {
  width: 100%;
  display: flex;
  align-items: center;
  height: var(--el-component-size-large);

  .code-img {
    height: var(--el-component-size-large);
    width: 80px;
    cursor: pointer;
    margin-left: 5px;
    box-shadow:
      rgba(0, 0, 0, 0.12) 0 1px 3px,
      rgba(0, 0, 0, 0.24) 0 1px 2px;
  }
}

:deep(.el-input) {
  width: 100%;
}
</style>
