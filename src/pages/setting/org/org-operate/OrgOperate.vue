<template>
  <h2>{{ sign === 'add' ? '新增机构' : '修改机构' }}</h2>
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
import { _detailMenu, _updateMenu } from '@/pages/setting/menu/menu.service.ts';
import {
  _addOrg,
  _detailOrg,
  _treeSelect,
  _updateOrg
} from '@/pages/setting/org/org.service.ts';

const formData = ref();
const props = defineProps({
  sign: {
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

const schema = ref<CraneSchema>({
  properties: {
    pid: {
      type: 'string',
      title: '上级机构',
      ui: {
        widget: 'tree-select',
        checkStrictly: true,
        asyncData: _treeSelect(),
        placeholder: '请选择上级机构',
        disabled: props.sign === 'update',
        span: 12
      }
    },
    name: {
      type: 'string',
      title: '机构名称',
      ui: {
        placeholder: '请输入机构名称',
        span: 12
      }
    },
    path: {
      type: 'string',
      title: '机构标识',
      ui: {
        placeholder: '请输入机构标识(必需以#开头)',
        span: 12,
        disabled: props.sign === 'update'
      }
    },
    orderNumber: {
      type: 'number',
      title: '排序',
      default: 0,
      ui: {
        placeholder: '请输入排序',
        span: 12
      }
    }
  },
  gutter: 25,
  required: ['name', 'path', 'orderNumber']
});

onMounted(() => {
  if (props.sign === 'update') {
    init();
  }
});

const init = () => {
  _detailOrg(props.id as string).then((res) => {
    if (res.code === ResponseCode.SUCCESS) {
      formData.value = res.data;
    }
  });
};

const onSubmit = (data: any) => {
  if (props.sign === 'update') {
    _updateOrg({ ...data, id: props.id }).then((res) => {
      if (res.code === ResponseCode.SUCCESS) {
        ElNotification.success('修改成功');
        props.close();
      } else {
        ElNotification.error(res.msg);
      }
    });
  } else {
    _addOrg(data).then((res) => {
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
