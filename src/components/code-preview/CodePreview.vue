<template>
  <div class="preview-code">
    <highlightjs :code="previewCode" />
  </div>
</template>

<script lang="js">
import vkbeautify from 'vkbeautify';
import 'highlight.js/lib/common';
import hljsVuePlugin from '@highlightjs/vue-plugin';
import 'highlight.js/styles/stackoverflow-light.css';

export default {
  components: {
    highlightjs: hljsVuePlugin.component
  },
  props: {
    code: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'xml'
    }
  },
  computed: {
    previewCode() {
      if (this.type === 'xml') {
        return vkbeautify.xml(this.code);
      }
      return vkbeautify.json(this.code);
    }
  }
};
</script>

<style scoped lang="less">
.preview-code {
  width: 100%;
}
</style>
