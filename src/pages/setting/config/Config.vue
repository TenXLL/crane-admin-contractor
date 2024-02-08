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

import { ResponseCode } from '@/share/types/request.types.ts';

import {
  _getConfigList,
  _removeConfig
} from '@/pages/setting/config/config.service.ts';
import {
  ConfigListDTO,
  ConfigPageDTO
} from '@/pages/setting/config/config.types.ts';
import ConfigOperate from '@/pages/setting/config/config-operate/ConfigOperate.vue';

const loading = ref(false);
const { openDialog } = useDialog();
const queryData = ref<ConfigPageDTO>(<ConfigPageDTO>{
  pageNum: 1,
  pageSize: 10
});

const schema: CraneSchema = {
  properties: {
    description: {
      type: 'string',
      title: '描述',
      ui: {
        placeholder: '请输入描述'
      }
    },
    configName: {
      type: 'string',
      title: '配置项名',
      ui: {
        placeholder: '请输入配置项名'
      }
    }
  }
};

const tableData = ref<ConfigListDTO[]>([]);

const columns: CraneColumn[] = [
  {
    prop: 'configName',
    label: '配置项名type'
  },
  {
    prop: 'description',
    label: '描述'
  },
  {
    prop: 'configValue',
    label: '配置项值',
    width: 600
  },
  {
    prop: 'operate',
    label: '操作',
    fixed: 'right',
    width: 160,
    render: (e: any) => {
      return h('div', [
        h(
          ElButton,
          { type: 'primary', link: true, onclick: () => update(e.data.id) },
          { default: () => '编辑' }
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
              _removeConfig(e.data.id).then((res) => {
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
  _getConfigList(queryData.value).then((res) => {
    if (res.code === ResponseCode.SUCCESS) {
      tableData.value = res.data.records ? res.data.records : [];
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
    component: ConfigOperate,
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
    component: ConfigOperate,
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
