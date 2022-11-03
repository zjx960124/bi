<script setup lang="ts">
import { computed } from "vue";
import { loadAsyncComponent } from "@/utils";
import { chartColors } from "@/settings/chartThemes/index";
import {
  dragHandle,
  dragoverHandle,
  mousedownHandleUnStop,
  useMouseHandle,
} from "@/utils/hooks/useDrag";
import { useComponentStyle, useSizeStyle } from "@/utils/hooks/useStyle";
import { useContextMenu } from "@/views/editor/charts/hooks/useContextMenu.hook";
import { MenuOptionsItemType } from "@/views/editor/charts/hooks/useContextMenu.hook.d";
import { useChartEditStore } from "@/store/chartEditStore/chartEditStore";
import { useLayout } from "@/utils/hooks/useLayout";
import { useRouter } from "vue-router";

const chartEditStore = useChartEditStore();
const { handleContextMenu } = useContextMenu();
const router = useRouter();
const currentRoute = router.currentRoute.value.name;
// 布局处理
useLayout();

// 点击事件
const {
  mouseenterHandle,
  mouseleaveHandle,
  mousedownHandle,
  mouseClickHandle,
} = useMouseHandle();

import { editorCanvas } from "./editorCanvas";
import { EditShapeBox } from "./EditShapeBox";
import { EditRange } from "./EditRange";
import { editorToolbar } from "./editorToolbar";
import { editorConfigurations } from "./editorConfigurations";

// 主题色
const themeSetting = computed(() => {
  const chartThemeSetting =
    chartEditStore.getEditCanvasConfig.chartThemeSetting;
  return chartThemeSetting;
});

// 配置项
const themeColor = computed(() => {
  const chartThemeColor = chartEditStore.getEditCanvasConfig.chartThemeColor;
  return chartColors[chartThemeColor];
});
</script>
<template>
  <div class="editor-operation">
    <editor-toolbar v-if="currentRoute === 'editor'"></editor-toolbar>
    <editor-canvas
      id="go-chart-edit-layout"
      class="editor-canvas"
      :class="{ 'no-padding': currentRoute === 'dashboardEditor' }"
      @mousedown="mousedownHandleUnStop"
      @drop="dragHandle"
      @dragover="dragoverHandle"
      @dragenter="dragoverHandle"
    >
      <template #toolbar> </template>
      <div
        id="go-chart-edit-content"
        class="editor-content"
        @contextmenu="handleContextMenu"
      >
        <edit-range>
          <div
            v-for="(item, index) in chartEditStore.getComponentList"
            :key="item.id"
          >
            <!-- 单组件 -->
            <edit-shape-box
              :data-id="item.id"
              :index="index"
              :style="useComponentStyle(item.attr, index)"
              :item="item"
              @click="mouseClickHandle($event, item)"
              @mousedown="mousedownHandle($event, item)"
              @mouseenter="mouseenterHandle($event, item)"
              @mouseleave="mouseleaveHandle($event, item)"
              @contextmenu="handleContextMenu($event, item, optionsHandle)"
            >
              <component
                class="edit-content-chart"
                :is="item.chartConfig.chartKey"
                :chartConfig="item"
                :themeSetting="themeSetting"
                :themeColor="themeColor"
                :style="{
                  ...useSizeStyle(item.attr),
                }"
              ></component>
            </edit-shape-box>
          </div>
        </edit-range>
      </div>
    </editor-canvas>
    <div class="editor-configurations">
      <editor-configurations></editor-configurations>
    </div>
  </div>
</template>
<style lang='scss' scoped>
.editor-operation {
  display: flex;
  flex: auto;
  height: 100%;
  width: 0;
  position: relative;
  .editor-canvas {
    flex: auto;
    width: calc(100% - 469px);
    height: 100%;
    padding-top: 55px;
    background-color: #ffffff;
    .editor-content {
      background-color: azure;
      margin: 22.5px;
      position: relative;
    }
  }
  .no-padding {
    padding-top: 0;
  }
  .editor-configurations {
    width: 469px;
    flex-shrink: 0;
    height: 100%;
    background-color: antiquewhite;
  }
}
</style>
