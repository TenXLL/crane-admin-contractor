<template>
  <h2>{{ type === 'add' ? '新增用户' : '修改用户' }}</h2>
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
  _getUserSelect,
  _setUser2Org,
  _treeSelect,
  _updateOrg
} from '@/pages/setting/org/org.service.ts';

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

const schema = ref<CraneSchema>({
  properties: {
    orgId: {
      type: 'string',
      title: '机构',
      ui: {
        widget: 'tree-select',
        checkStrictly: true,
        asyncData: _treeSelect(),
        placeholder: '请选择机构',
        span: 12
      }
    },
    userId: {
      type: 'string',
      title: '用户',
      ui: {
        widget: 'select',
        asyncData: _getUserSelect(),
        placeholder: '请选择用户',
        filterable: true,
        span: 12
      }
    }
  },
  gutter: 25,
  required: ['orgId', 'userId']
});

onMounted(() => {
  if (props.type === 'update') {
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
  if (props.type === 'update') {
    _updateOrg({ ...data, id: props.id }).then((res) => {
      if (res.code === ResponseCode.SUCCESS) {
        ElNotification.success('修改成功');
        props.close();
      } else {
        ElNotification.error(res.msg);
      }
    });
  } else {
    _setUser2Org(data).then((res) => {
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
