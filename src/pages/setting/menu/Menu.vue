<template>
  <div class="common-container">
    <crane-form
      :schema="schema"
      inline
      @submit="submit"
      @reset="reset"
    ></crane-form>
    <VerticalLine></VerticalLine>
    <div class="tools">
      <div class="tools-left">
        <el-button color="#3F4255" :icon="Plus" @click="add">新增</el-button>
      </div>
    </div>
    <CraneTable
      has-index
      is-tree
      row-key="id"
      :table-data="tableData"
      :columns="columns"
      :pages="queryData"
      :loading="loading"
    ></CraneTable>
  </div>
</template>

<script setup lang="ts">
import { CraneForm, CraneTable, useDialog } from 'crane-element';
import { CraneSchema } from 'crane-element/lib/components/CraneForm/types';
import { CraneColumn } from 'crane-element/lib/components/CraneTable/types';
import {
  ElButton,
  ElDivider,
  ElIcon,
  ElMessage,
  ElPopconfirm
} from 'element-plus';
import { Delete, Plus } from '@element-plus/icons-vue';

import {
  _getMenuTree,
  _removeMenu
} from '@/pages/setting/menu/menu.service.ts';
import { QueryMenuDTO } from '@/pages/setting/menu/menu.types.ts';
import { MenuTree } from '@/share/types/header.types.ts';
import MenuOperate from '@/pages/setting/menu/menu-operate/MenuOperate.vue';
import { ResponseCode } from '@/share/types/request.types.ts';

const loading = ref(false);
const { openDialog } = useDialog();
const queryData = ref<QueryMenuDTO>(<QueryMenuDTO>{});

const schema: CraneSchema = {
  properties: {
    title: {
      type: 'string',
      title: '菜单名称',
      ui: {
        placeholder: '请输入菜单名称'
      }
    },
    path: {
      type: 'string',
      title: '菜单路径',
      ui: {
        placeholder: '请输入菜单路径'
      }
    }
  }
};

const tableData = ref<MenuTree[]>([]);

const columns: CraneColumn[] = [
  {
    prop: 'title',
    label: '菜单名称'
  },
  {
    prop: 'path',
    label: '菜单路径'
  },
  {
    prop: 'orderNumber',
    label: '排序'
  },
  {
    prop: 'gmtCreate',
    label: '创建时间'
  },
  {
    prop: 'operate',
    label: '操作',
    fixed: 'right',
    width: 300,
    render: (e: any) => {
      return h('div', [
        h(
          ElButton,
          { type: 'primary', link: true, onclick: () => update(e.data.id) },
          { default: () => '编辑' }
        ),
        h(ElDivider, { direction: 'vertical' }),
        h(
          ElButton,
          { type: 'warning', link: true, onclick: () => add() },
          { default: () => '当前路径新增' }
        ),
        h(ElDivider, { direction: 'vertical' }),
        h(
          ElPopconfirm,
          {
            title: '确认删除吗?',
            icon: () => h(ElIcon, null, { default: () => h(Delete) }),
            iconColor: '#ED6660',
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            onConfirm: () => {
              _removeMenu(e.data.id).then((res) => {
                if (res.code === ResponseCode.SUCCESS) {
                  ElMessage.success(res.msg);
                  init();
                } else {
                  ElMessage.error(res.msg);
                }
              });
            }
          },
          {
            reference: () =>
              h(
                ElButton,
                { link: true, type: 'danger' },
                { default: () => '删除' }
              )
          }
        )
      ]);
    }
  }
];

onMounted(() => {
  init();
});

const init = () => {
  loading.value = true;
  _getMenuTree(queryData.value).then((res) => {
    if (res.code === ResponseCode.SUCCESS) {
      tableData.value = res.data ? res.data : [];
      loading.value = false;
    } else {
      ElMessage.error(res.msg);
      loading.value = false;
    }
  });
};

const submit = (data: any) => {
  queryData.value = {
    ...queryData.value,
    ...data
  };

  init();
};

const reset = (data: any) => {
  queryData.value = {
    ...queryData.value,
    ...data
  };

  init();
};

function add() {
  openDialog({
    component: MenuOperate,
    options: {
      destroyOnClose: true
    },
    params: {
      type: 'add'
    }
  }).then(() => {
    init();
  });
}

function update(id: string) {
  openDialog({
    component: MenuOperate,
    options: {
      destroyOnClose: true
    },
    params: {
      type: 'update',
      id
    }
  }).then(() => {
    init();
  });
}
</script>

<style scoped lang="less">
.common-container {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.04);
  transition: all 0.5s ease;
  background-color: var(--bg-primary-color);
  box-sizing: border-box;
  padding: 30px 20px;

  &:hover {
    box-shadow: 0 5px 25px 0 rgba(0, 0, 0, 0.05);
  }
}

.tools {
  width: 100%;
  height: 42px;
  display: flex;

  .tools-left {
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>
