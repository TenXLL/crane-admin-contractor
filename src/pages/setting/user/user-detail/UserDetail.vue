<template>
  <div class="common-detail">
    <el-descriptions title="详情">
      <el-descriptions-item label="昵称：">
        {{ detail.nickname }}
      </el-descriptions-item>
      <el-descriptions-item label="用户名：">
        {{ detail.username }}
      </el-descriptions-item>
      <el-descriptions-item label="手机号：">
        {{ detail.phone }}
      </el-descriptions-item>
      <el-descriptions-item label="邮箱：">
        {{ detail.email }}
      </el-descriptions-item>
      <el-descriptions-item label="性别：">
        {{ detail.sexDesc }}
      </el-descriptions-item>
      <el-descriptions-item label="真实姓名：">
        {{ detail.realName }}
      </el-descriptions-item>
      <el-descriptions-item label="身份证：">
        {{ detail.idCard }}
      </el-descriptions-item>
      <el-descriptions-item label="地址：">
        {{ detail.address }}
      </el-descriptions-item>
      <el-descriptions-item label="个性签名：">
        {{ detail.personalSignature }}
      </el-descriptions-item>
      <el-descriptions-item label="创建时间：">
        {{ detail.gmtCreate }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
import { UserListVO } from '@/pages/setting/user/user.types.ts';
import { _getUserById } from '@/pages/setting/user/user.service.ts';

const detail = ref<UserListVO>(<UserListVO>{});

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  close: {
    type: Function,
    required: true
  }
});

onMounted(() => {
  init();
});
const init = () => {
  _getUserById(props.id).then((res) => {
    detail.value = res.data;
  });
};
</script>

<style scoped lang="less">
.common-detail {
  width: 100%;
}
</style>
