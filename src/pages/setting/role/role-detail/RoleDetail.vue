<template>
  <div class="common-detail">
    <el-descriptions title="详情">
      <el-descriptions-item label="角色名称：">
        {{ detail.roleName }}
      </el-descriptions-item>
      <el-descriptions-item label="角色标识：">
        {{ detail.roleSign }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
import { RoleListVO } from '@/pages/setting/role/role.types.ts';
import { _getRoleById } from '@/pages/setting/role/role.service.ts';

const detail = ref<RoleListVO>(<RoleListVO>{});

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
  _getRoleById(props.id).then((res) => {
    detail.value = res.data;
  });
};
</script>

<style scoped lang="less">
.common-detail {
  width: 100%;
}
</style>
