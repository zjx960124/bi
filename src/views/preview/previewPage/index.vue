<script setup lang="ts">
import { computed } from "vue";
import { usePageStyle } from "@/utils/hooks/useStyle";
import { PreviewRender } from "../previewRender";
import { useScale } from "@/utils/hooks/useScale";
const props = defineProps({
  componentInfo: {
    type: Object,
    required: true,
  },
});

const previewRefStyle = computed(() => {
  return {
    ...usePageStyle(props.componentInfo.component.editCanvasConfig),
  };
});

const { entityRef, previewRef } = useScale(props.componentInfo.component);
</script>
<template>
  <div class="preview-view">
    <div ref="previewRef" class="scale-view" id="scaleView">
      <!-- 渲染层 -->
      <div :style="previewRefStyle">
        <preview-render
          :componentList="componentInfo.component"
        ></preview-render>
      </div>
    </div>
  </div>
</template>
<style lang='scss' scoped>
.preview-view {
  width: 100vw;
  height: 100vh;
  display: flex;
  z-index: 0;
  overflow: hidden;
  position: relative;
  align-items: center;
  justify-content: center;

  .scale-view {
    transform-origin: center center;
  }
}
</style>
