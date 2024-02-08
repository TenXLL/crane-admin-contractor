<template>
  <h2>{{ type === 'add' ? '新增菜单' : '修改菜单' }}</h2>
  <CraneForm
    :schema="schema"
    :form-data="formData"
    label-width="80px"
    sure-text="确认"
    @submit="onSubmit"
    @form-change="formChange"
  />
</template>

<script setup lang="ts">
import { CraneForm } from 'crane-element';
import { CraneSchema } from 'crane-element/lib/components/CraneForm/types';
import { ElNotification } from 'element-plus';
import { ResponseCode } from '@/share/types/request.types.ts';
import {
  _addMenu,
  _detailMenu,
  _getMenuTreeSelect,
  _updateMenu
} from '@/pages/setting/menu/menu.service.ts';
import { _getSelect } from '@/share/service/public.service.ts';

const formData = ref({
  menuType: '1',
  hide: false,
  pid: '',
  orderNumber: 0
});
const menuType = ref('1');
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
  },
  pid: {
    type: String
  }
});

const schema = ref<CraneSchema>({
  properties: {
    pid: {
      type: 'string',
      title: '上级菜单',
      ui: {
        widget: 'tree-select',
        checkStrictly: true,
        asyncData: _getMenuTreeSelect(),
        placeholder: '请选择上级菜单',
        span: 12
      }
    },
    menuType: {
      type: 'string',
      title: '菜单类型',
      default: menuType,
      ui: {
        widget: 'radio',
        asyncData: _getSelect('menu_type'),
        span: 12
      }
    },
    title: {
      type: 'string',
      title: '菜单名称',
      ui: {
        placeholder: '请输入菜单名称',
        span: 12
      }
    },
    path: {
      type: 'string',
      title: '菜单路径',
      ui: {
        placeholder: '请输入菜单路径',
        span: 12
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
    },
    icon: {
      type: 'string',
      title: '图标',
      ui: {
        widget: 'icon-select',
        placeholder: '请选择图标',
        span: 12
      }
    },
    target: {
      type: 'string',
      title: '打开方式',
      ui: {
        widget: 'select',
        asyncData: _getSelect('menu_target'),
        placeholder: '请选择打开方式',
        span: 12
      }
    },
    hide: {
      type: 'boolean',
      title: '是否隐藏',
      enum: [
        {
          label: '是',
          value: true
        },
        {
          label: '否',
          value: false
        }
      ],
      default: false,
      ui: {
        widget: 'select',
        placeholder: '请选择是否隐藏',
        span: 12
      }
    },
    authority: {
      type: 'string',
      title: '权限标识',
      ui: {
        placeholder: '请输入权限标识',
        span: 12
      }
    }
  },
  gutter: 25,
  required: ['title', 'path', 'orderNumber', 'hide', 'menuType']
});

onMounted(() => {
  if (props.pid) {
    formData.value.pid = props.pid;
  }
  if (props.type === 'update') {
    init();
  }
});

const init = () => {
  _detailMenu(props.id as string).then((res) => {
    if (res.code === ResponseCode.SUCCESS) {
      formData.value = res.data;
    }
  });
};

const onSubmit = (data: any) => {
  if (props.type === 'update') {
    _updateMenu({ ...data, id: props.id }).then((res) => {
      if (res.code === ResponseCode.SUCCESS) {
        ElNotification.success('修改成功');
        props.close();
      } else {
        ElNotification.error(res.msg);
      }
    });
  } else {
    _addMenu(data).then((res) => {
      if (res.code === ResponseCode.SUCCESS) {
        ElNotification.success('新增成功');
        props.close();
      } else {
        ElNotification.error(res.msg);
      }
    });
  }
};

function formChange(e: any) {
  menuType.value = e.menuType;
  schema.value.properties.authority.ui!.disabled = e.menuType === '1';

  schema.value.properties.path.ui!.disabled = e.menuType === '2';
  schema.value.properties.icon.ui!.disabled = e.menuType === '2';
  schema.value.properties.target.ui!.disabled = e.menuType === '2';
}
</script>

<style scoped lang="less"></style>
