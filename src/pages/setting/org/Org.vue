<template>
  <div class="org flex">
    <div class="tree-node">
      <el-tree
        v-if="data.length > 0"
        ref="treeRef"
        node-key="id"
        :data="data"
        :props="defaultProps"
        highlight-current
        default-expand-all
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
        @node-contextmenu="rightClick"
      />
      <el-button v-else color="#3F4255" :icon="Plus" @click="openAdd">
        新增机构
      </el-button>
      <div v-show="showRightMenu" class="rightMenu">
        <ul>
          <li @click="operate('add')">新建机构</li>
          <li @click="operate('update')">修改机构</li>
          <li @click="remove">删除机构</li>
        </ul>
      </div>
    </div>
    <HorizontalLine></HorizontalLine>
    <div class="list flex box-border flex-1 m3">
      <OrgList :org-id="selectOrgId"></OrgList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessageBox, ElTree } from 'element-plus';
import { useDialog } from 'crane-element';
import { Plus } from '@element-plus/icons-vue';
import { _removeOrg, _treeList } from '@/pages/setting/org/org.service.ts';
import { OrgTreeVO } from '@/pages/setting/org/org.types.ts';
import OrgList from '@/pages/setting/org/org-list/OrgList.vue';
import OrgOperate from '@/pages/setting/org/org-operate/OrgOperate.vue';
import { ResponseCode } from '@/share/types/request.types.ts';

const { openDialog } = useDialog();
const selectOrgId = ref<string>('');
const data = ref<OrgTreeVO[]>([]);
const rightSelectId = ref<string>('');
const showRightMenu = ref(false);
const treeRef = ref<InstanceType<typeof ElTree>>();

const defaultProps = {
  children: 'children',
  label: 'name'
};

onMounted(() => {
  init();
});

onUnmounted(() => {
  document.removeEventListener('click', unShow);
});

const init = () => {
  _treeList().then((res) => {
    data.value = res.data;
    nextTick(() => {
      if (res.data.length === 0) {
        return;
      }
      treeRef.value?.setCurrentKey(res.data[0].id);
      selectOrgId.value = res.data[0].id;
    });
  });
};

const handleNodeClick = (data: OrgTreeVO) => {
  selectOrgId.value = data.id;
};
const rightClick = (event: any, data: any, _node: any, _json: any) => {
  if (data) {
    rightSelectId.value = data.id;
  }
  showRightMenu.value = false;
  const menu = document.querySelector('.rightMenu') as HTMLElement;
  menu.style.left = `${event.clientX}px`;
  menu.style.top = `${event.clientY}px`;
  showRightMenu.value = true;
  document.addEventListener('click', unShow);
};
const unShow = () => {
  showRightMenu.value = false;
};

function operate(sign: string) {
  openDialog({
    component: OrgOperate,
    options: {
      destroyOnClose: true
    },
    params: {
      sign,
      id: rightSelectId.value
    }
  }).then(() => {
    init();
  });
}

function remove() {
  ElMessageBox.confirm('该操作将会删除该机构，是否继续？', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      _removeOrg(rightSelectId.value).then((res) => {
        if (res.code === ResponseCode.SUCCESS) {
          ElMessage.success('删除成功');
          init();
          unShow();
        } else {
          ElMessage.error(res.msg);
        }
      });
    })
    .catch(() => {
      unShow();
    });
}

function openAdd() {
  operate('add');
}
</script>

<style scoped lang="less">
.org {
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

  .tree-node {
    width: 240px;
    height: 100%;
    box-sizing: border-box;
    padding: 0 10px;
  }
}

.rightMenu {
  position: fixed;
  z-index: 99999999;
  cursor: pointer;
  box-shadow: var(--box-shadow);
  border-radius: 10px;
  color: var(--font-color);
  font-size: 14px;
}

.rightMenu ul {
  list-style: none;
  margin: 0;
  padding: 0;
  border-radius: 6px;
}

.rightMenu ul li {
  padding: 6px 10px;
  background: var(--bg-primary-color);
  border-bottom: 1px solid var(--border-color);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.rightMenu ul li:last-child {
  border: none;
}

.rightMenu ul li:hover {
  transition: all 0.3s;
  background: var(--hover-color);
}
</style>
