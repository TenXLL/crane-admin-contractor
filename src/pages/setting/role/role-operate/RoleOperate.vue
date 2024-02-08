<template>
  <h2>{{ type === 'add' ? '新增角色' : '修改角色' }}</h2>
  <CraneForm
    :schema="schema"
    :form-data="formData"
    label-width="80px"
    sure-text="确认"
    @submit="onSubmit"
  />
</template>

<script setup lang="ts">
import { CraneForm } from 'crane-element';
import { CraneSchema } from 'crane-element/lib/components/CraneForm/types';

import { ElNotification } from 'element-plus';
import { ResponseCode } from '@/share/types/request.types.ts';
import {
  _addRole,
  _getRoleById,
  _updateRole
} from '@/pages/setting/role/role.service.ts';

const formData = ref();

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  close: {
    type: Function,
    required: true
  },
  id: {
    type: String
  }
});

const schema: CraneSchema = {
  properties: {
    roleName: {
      type: 'string',
      title: '角色名称',
      ui: {
        placeholder: '请输入角色名称',
        span: 12
      }
    },
    roleSign: {
      type: 'string',
      title: '角色标识',
      ui: {
        placeholder: '请输入角色标识',
        span: 12
      }
    }
  },
  gutter: 20,
  required: ['roleName', 'roleSign']
};

onMounted(() => {
  if (props.type === 'update') {
    init();
  }
});

const init = () => {
  _getRoleById(props.id as string).then((res) => {
    if (res.code === ResponseCode.SUCCESS) {
      formData.value = res.data;
    }
  });
};

const onSubmit = (data: any) => {
  if (props.type === 'update') {
    _updateRole({ ...data, id: props.id }).then((res) => {
      if (res.code === ResponseCode.SUCCESS) {
        ElNotification.success('修改成功');
        props.close();
      } else {
        ElNotification.error(res.msg);
      }
    });
  } else {
    _addRole(data).then((res) => {
      if (res.code === ResponseCode.SUCCESS) {
        ElNotification.success('新增成功');
        props.close();
      } else {
        ElNotification.error(res.msg);
      }
    });
  }
};
</script>

<style scoped lang="less"></style>
