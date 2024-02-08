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
  _addDict,
  _detailDict,
  _updateDict
} from '@/pages/setting/dict/dict.service.ts';

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
    moduleName: {
      type: 'string',
      title: '模块名',
      ui: {
        placeholder: '请输入模块名',
        span: 12
      }
    },
    type: {
      type: 'string',
      title: '模块标识',
      ui: {
        placeholder: '请输入模块标识',
        span: 12
      }
    },
    value: {
      type: 'string',
      title: '字典值',
      ui: {
        placeholder: '请输入字典值',
        span: 12
      }
    },
    description: {
      type: 'string',
      title: '描述',
      ui: {
        placeholder: '请输入描述',
        span: 12
      }
    }
  },
  gutter: 20,
  required: ['moduleName', 'type', 'value', 'description']
};

onMounted(() => {
  if (props.type === 'update') {
    init();
  }
});

const init = () => {
  _detailDict(props.id as string).then((res) => {
    if (res.code === ResponseCode.SUCCESS) {
      formData.value = res.data;
    }
  });
};

const onSubmit = (data: any) => {
  if (props.type === 'update') {
    _updateDict({ ...data, id: props.id }).then((res) => {
      if (res.code === ResponseCode.SUCCESS) {
        ElNotification.success('修改成功');
        props.close();
      } else {
        ElNotification.error(res.msg);
      }
    });
  } else {
    _addDict(data).then((res) => {
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
