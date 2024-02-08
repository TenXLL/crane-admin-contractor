<template>
  <div class="user-container">
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
import { UserListVO, UserPageDTO } from '@/pages/setting/user/user.types.ts';
import {
  _pageUserList,
  _removeUser
} from '@/pages/setting/user/user.service.ts';
import { _getSelect } from '@/share/service/public.service.ts';
import UserOperate from '@/pages/setting/user/user-operate/UserOperate.vue';
import UserDetail from '@/pages/setting/user/user-detail/UserDetail.vue';

const loading = ref(false);
const { openDialog } = useDialog();
const queryData = ref<UserPageDTO>({
  pageNum: 1,
  pageSize: 10,
  total: 0
});

const schema: CraneSchema = {
  properties: {
    nickname: {
      type: 'string',
      title: '昵称',
      ui: {
        placeholder: '请输入昵称'
      }
    },
    phone: {
      type: 'string',
      title: '电话',
      ui: {
        placeholder: '请输入电话'
      }
    },
    sex: {
      type: 'string',
      title: '性别',
      ui: {
        widget: 'select',
        placeholder: '请选择性别',
        asyncData: _getSelect('sex_type')
      }
    }
  }
};

const tableData = ref<UserListVO[]>([]);

const columns: CraneColumn[] = [
  {
    prop: 'nickname',
    label: '昵称'
  },
  {
    prop: 'realName',
    label: '真实姓名'
  },
  {
    prop: 'sexDesc',
    label: '性别'
  },
  {
    prop: 'phone',
    label: '电话'
  },
  {
    prop: 'email',
    label: '邮箱'
  },
  {
    prop: 'roleNameList',
    label: '角色'
  },
  {
    prop: 'gmtCreate',
    label: '创建时间',
    width: 200
  },
  {
    prop: 'operate',
    label: '操作',
    fixed: 'right',
    width: 200,
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
              _removeUser(e.data.id).then((res) => {
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
  _pageUserList(queryData.value).then((res) => {
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
    component: UserOperate,
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
    component: UserOperate,
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
    component: UserDetail,
    options: {
      destroyOnClose: true
    },
    params: {
      id
    }
  });
}
</script>

<style scoped lang="less">
.user-container {
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
