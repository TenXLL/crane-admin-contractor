<template>
  <div class="bpmn-container">
    <div class="tools">
      <el-dropdown>
        <el-button type="primary" plain>保存</el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="save('bpmn')">
              保存为bpmn
            </el-dropdown-item>
            <el-dropdown-item>保存为xml</el-dropdown-item>
            <el-dropdown-item>保存为svg</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button type="primary" plain @click="preview">上传</el-button>
      <el-button type="primary" plain @click="preview">预览</el-button>
    </div>
    <div class="designer-container">
      <div id="container" class="containerBox"></div>
      <div id="js-properties-panel" class="panel"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { markRaw, onMounted, Raw, ref } from 'vue';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  CamundaPlatformPropertiesProviderModule
} from 'bpmn-js-properties-panel';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import './properties-panel.css';
import Modeler from 'bpmn-js/lib/Modeler';
import { useDialog } from 'crane-element';
import { customTranslate } from '@/pages/setting/bpmn/zh.ts';
// @ts-ignore
import CodePreview from '@/components/code-preview/CodePreview.vue';
// @ts-ignore
import customModule from './custom';

const { openDialog } = useDialog();

const containerEl = ref<HTMLElement>();
const bpmnModeler = ref<Raw<Modeler>>();
onMounted(async () => {
  init();
});

/**
 * 初始化流程图
 */
let init = () => {
  containerEl.value = document.getElementById('container') as HTMLElement;
  // 加markRaw去除双向绑定作用域
  bpmnModeler.value = markRaw(
    new BpmnModeler({
      container: containerEl.value,
      // 添加控制板
      propertiesPanel: {
        parent: '#js-properties-panel'
      },
      additionalModules: [
        // 右边的属性栏
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
        CamundaPlatformPropertiesProviderModule,
        // 自定义的节点
        {
          translate: ['value', customTranslate]
        }
      ],
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      }
    })
  );
  bpmnModeler.value?.createDiagram();
};

function save(type: string) {
  bpmnModeler.value?.saveXML({ format: true }).then((res) => {
    console.log(res);
  });
}

function preview() {
  bpmnModeler.value?.saveXML({ format: true }).then((res) => {
    openDialog({
      component: CodePreview,
      options: {
        destroyOnClose: true,
        title: '预览'
      },
      params: {
        code: res.xml
      }
    });
  });
}

function createTask(event: any) {
  // 在这里添加创建任务的逻辑
  console.log('创建任务');
}

function createUserTask(event: any) {
  // 在这里添加创建用户任务的逻辑
  console.log('创建用户任务');
}
</script>

<style lang="less" scoped>
.bpmn-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .tools {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 20px;
  }
}

.processDrawBody {
  height: 100%;
  text-align: left;
}
.containerBox {
  width: 100%;
  flex: 1;
  overflow: hidden;
  display: flex;
}
.containerBox #container {
  height: 100%;
  border: 1px solid rgb(121, 121, 121);
}
.bpp-properties-panel [type='text'] {
  box-sizing: border-box;
}
.panel {
  width: 400px;
  position: absolute;
  top: 1px;
  right: 1px;
  height: 100%;
  overflow: auto;
}
/* 右下角logo */
.bjs-powered-by {
  display: none;
}
.designer-container {
  height: calc(100% - 40px);
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;

  color: #333333 !important;
}

:deep(.djs-container) {
  background-image: var(--canvas-bg);
  background-size: 20px 20px;
}

:deep(.el-dropdown) {
  height: fit-content;
}

.bpmn-icon-user-task {
  color: #f56c6c;
  width: 30px;
  height: 30px;
  background-color: #eaeaea;
}

/* app.css */
.bpmn-icon-task.red {
  color: #cc0000 !important;
}
</style>
