<template>
  <div class="user-info flex flex-col">
    <div class="user-info-show flex items-center">
      <img
        class="w-20 h-20 rounded-full"
        :src="userInfo.logoSrc ? userInfo.logoSrc : '@/assets/logo.jpg'"
        alt=""
      />
      <div class="flex flex-col justify-around ml-5">
        <span class="text-lg">{{ userInfo.nickname }}</span>
        <span class="mt-1">个性签名： {{ userInfo.personalSignature }}</span>
      </div>
    </div>
    <VerticalLine style="margin: 20px 0" />
    <CraneForm
      :schema="schema"
      :form-data="userInfo"
      label-width="80px"
      sure-text="确认"
      @submit="onSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { CraneForm } from 'crane-element';
import { CraneSchema } from 'crane-element/lib/components/CraneForm/types';
import { ElNotification } from 'element-plus';
import {
  _selfInfo,
  _updateSelf
} from '@/components/user-info-operate/user-info.service.ts';
import { UserListVO } from '@/pages/setting/user/user.types.ts';
import { _getSelect } from '@/share/service/public.service.ts';

import { ResponseCode } from '@/share/types/request.types.ts';

const userInfo = ref<UserListVO>(<UserListVO>{});

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
    password: {
      type: 'string',
      title: '密码',
      ui: {
        widget: 'password',
        placeholder: '请输入密码'
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
  gutter: 20
};

const props = defineProps({
  close: {
    type: Function,
    required: true
  }
});

onMounted(() => {
  init();
});

const init = () => {
  _selfInfo().then((res) => {
    userInfo.value = res.data;
  });
};

const onSubmit = (data: any) => {
  _updateSelf(data).then((res) => {
    if (res.code === ResponseCode.SUCCESS) {
      ElNotification.success('修改成功');
      props.close();
    } else {
      ElNotification.error(res.msg);
    }
  });
};
</script>

<style scoped lang="less">
.user-info {
  width: 100%;
}
</style>
