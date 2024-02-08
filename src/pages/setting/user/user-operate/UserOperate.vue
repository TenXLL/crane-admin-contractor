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
import { _getSelect } from '@/share/service/public.service.ts';
import {
  _addUser,
  _getRoleSelects,
  _getUserById,
  _updateUser
} from '@/pages/setting/user/user.service.ts';

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
    username: {
      type: 'string',
      title: '用户名',
      ui: {
        placeholder: '请输入用户名',
        span: 12
      }
    },
    phone: {
      type: 'string',
      title: '手机号',
      format: 'mobile',
      ui: {
        placeholder: '请输入手机号',
        span: 12
      }
    },
    nickname: {
      type: 'string',
      title: '昵称',
      ui: {
        placeholder: '请输入昵称',
        span: 12
      }
    },
    sex: {
      type: 'string',
      title: '性别',
      ui: {
        widget: 'select',
        placeholder: '请选择性别',
        asyncData: _getSelect('sex_type'),
        span: 12
      }
    },
    roleIdList: {
      type: 'string',
      title: '角色',
      ui: {
        widget: 'select',
        asyncData: _getRoleSelects(),
        span: 12,
        placeholder: '请选择角色',
        multiple: true
      }
    },
    realName: {
      type: 'string',
      title: '真实姓名',
      ui: {
        placeholder: '请输入真实姓名',
        span: 12
      }
    },
    email: {
      type: 'string',
      title: '邮箱',
      format: 'email',
      ui: {
        placeholder: '请输入邮箱',
        span: 12
      }
    },
    idCard: {
      type: 'string',
      title: '身份证号',
      ui: {
        placeholder: '请输入身份证号',
        span: 12
      }
    },
    birthday: {
      type: 'string',
      title: '生日',
      ui: {
        widget: 'date',
        valueFormat: 'YYYY-MM-DD',
        placeholder: '请选择生日',
        span: 12
      }
    },
    personalSignature: {
      type: 'string',
      title: '个性签名',
      ui: {
        placeholder: '请输入个性签名',
        widget: 'textarea'
      }
    }
  },
  gutter: 20,
  required: ['username', 'phone', 'email', 'nickname', 'sex', 'roleIdList']
};

onMounted(() => {
  if (props.type === 'update') {
    init();
  }
});

const init = () => {
  _getUserById(props.id as string).then((res) => {
    if (res.code === ResponseCode.SUCCESS) {
      formData.value = res.data;
    }
  });
};

const onSubmit = (data: any) => {
  if (props.type === 'update') {
    _updateUser({ ...data, id: props.id }).then((res) => {
      if (res.code === ResponseCode.SUCCESS) {
        ElNotification.success('修改成功');
        props.close();
      } else {
        ElNotification.error(res.msg);
      }
    });
  } else {
    _addUser(data).then((res) => {
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
