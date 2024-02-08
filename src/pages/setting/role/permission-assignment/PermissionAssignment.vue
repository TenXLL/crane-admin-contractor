<template>
  <el-tree
    ref="treeRef"
    :data="data"
    node-key="value"
    :props="defaultProps"
    show-checkbox
  />
  <div class="tools">
    <el-button color="#f2f3f5" @click="close">取消</el-button>
    <el-button color="#3F4255" style="margin-left: 20px" @click="submit">
      确认
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { _getMenuTreeSelect } from '@/pages/setting/menu/menu.service.ts';
import {
  _getPermissionList,
  _permissionAssignment
} from '@/pages/setting/role/role.service.ts';
import { ResponseCode } from '@/share/types/request.types.ts';

interface Tree {
  label: string;
  value: string;
  children?: Tree[];
}

const treeRef = ref();

const defaultProps = {
  children: 'children',
  label: 'label'
};
const data = ref<Tree[]>([]);

const props = defineProps({
  roleId: {
    type: String,
    required: true
  },
  close: {
    type: Function as PropType<() => void>,
    required: true
  }
});

onMounted(() => {
  init();
});

function init() {
  _getMenuTreeSelect().then((res) => {
    data.value = res;
    setChecks();
  });
}

function setChecks() {
  _getPermissionList(props.roleId).then((res) => {
    treeRef.value.setCheckedKeys(res.data);
  });
}
function submit() {
  const checked = treeRef.value.getCheckedKeys();

  _permissionAssignment({
    roleId: props.roleId,
    menuIdList: checked
  }).then((res) => {
    if (res.code === ResponseCode.SUCCESS) {
      ElMessage.success(res.msg);
      props.close();
    } else {
      ElMessage.error(res.msg);
    }
  });
}
</script>

<style scoped lang="less">
.tools {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
</style>
