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
  _pageRoleList,
  _removeRole
} from '@/pages/setting/role/role.service.ts';
import { RolePageDTO } from '@/pages/setting/role/role.types.ts';
import RoleOperate from '@/pages/setting/role/role-operate/RoleOperate.vue';
import RoleDetail from '@/pages/setting/role/role-detail/RoleDetail.vue';
import PermissionAssignment from '@/pages/setting/role/permission-assignment/PermissionAssignment.vue';

const loading = ref(false);
const { openDialog } = useDialog();
const queryData = ref<RolePageDTO>({
  pageNum: 1,
  pageSize: 10,
  total: 0
});

const schema: CraneSchema = {
  properties: {
    roleName: {
      type: 'string',
      title: '角色名称',
      ui: {
        placeholder: '请输入角色名称'
      }
    },
    roleSign: {
      type: 'string',
      title: '角色标识',
      ui: {
        placeholder: '请输入角色标识'
      }
    }
  }
};

const tableData = ref<RolePageDTO[]>([]);

const columns: CraneColumn[] = [
  {
    prop: 'roleName',
    label: '角色名称'
  },
  {
    prop: 'roleSign',
    label: '角色标识'
  },
  {
    prop: 'gmtCreate',
    label: '创建时间',
    width: 180
  },
  {
    prop: 'operate',
    label: '操作',
    fixed: 'right',
    width: 280,
    render: (e: any) => {
      return h('div', [
        h(
          ElButton,
          { type: 'primary', link: true, onclick: () => detail(e.data.id) },
          {
            default: () => '详情'
          }
        ),
        h(ElDivider, { direction: 'vertical' }),
        h(
          ElButton,
          {
            type: 'success',
            link: true,
            onclick: () => permissionAssignment(e.data.id)
          },
          {
            default: () => '权限分配'
          }
        ),
        h(ElDivider, { direction: 'vertical' }),
        h(
          ElButton,
          { type: 'warning', link: true, onclick: () => update(e.data.id) },
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
              _removeRole(e.data.id).then((res) => {
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
  _pageRoleList(queryData.value).then((res) => {
    if (res.code === ResponseCode.SUCCESS) {
      tableData.value = res.data.records;
      queryData.value.total = res.data.total;
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
    component: RoleOperate,
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
    component: RoleOperate,
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

function detail(id: string) {
  openDialog({
    component: RoleDetail,
    options: {
      destroyOnClose: true
    },
    params: {
      id
    }
  });
}

function permissionAssignment(id: string) {
  openDialog({
    component: PermissionAssignment,
    options: {
      width: '30%',
      destroyOnClose: true
    },
    params: {
      roleId: id
    }
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
