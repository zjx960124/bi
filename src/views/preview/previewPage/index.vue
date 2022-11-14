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
    <div ref="previewRef" :style="previewRefStyle" class="scale-view">
      <!-- 渲染层 -->
      <preview-render :componentList="componentInfo.component"></preview-render>
    </div>
  </div>
</template>
<style lang='scss' scoped>
.preview-view {
  width: 100vw;
  height: 100vh;
  position: relative;

  .scale-view {
    transform-origin: center top;
  }
}
</style>
