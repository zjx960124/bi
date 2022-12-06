<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { loadAsyncComponent } from '@/utils';
import { chartColors } from '@/settings/chartThemes/index';
import {
  dragHandle,
  dragoverHandle,
  mousedownHandleUnStop,
  useMouseHandle
} from '@/utils/hooks/useDrag';
import { useAddKeyboard } from '@/utils/hooks/useKeyboard';
import { useComponentStyle, useSizeStyle } from '@/utils/hooks/useStyle';
import { useContextMenu } from '@/views/editor/charts/hooks/useContextMenu.hook';
import { useChartEditStore } from '@/store/chartEditStore/chartEditStore';
import { useLayout } from '@/utils/hooks/useLayout';
import { useRouter } from 'vue-router';

const chartEditStore = useChartEditStore();
const { handleContextMenu } = useContextMenu();
const router = useRouter();
const currentRoute = router.currentRoute.value.name;

// 布局处理
useLayout();
//监听键盘
onMounted(() => {
  useAddKeyboard();
});

// 点击事件
const {
  mouseenterHandle,
  mouseleaveHandle,
  mousedownHandle,
  mouseClickHandle
} = useMouseHandle();

import { editorCanvas } from '@/views/editor/operation/editorCanvas/index';
import { EditShapeBox } from '@/views/editor/operation/EditShapeBox';
import { EditRange } from '@/views/editor/operation/EditRange';
import { editorConfigurations } from '@/views/editor/operation/editorConfigurations';

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

// 通用配置
const rangeStyle = computed(() => {
  // 设置背景色和图片背景
  const backgroundType = chartEditStore.getEditCanvasConfig.backgroundType;
  const background = chartEditStore.getEditCanvasConfig.background;
  const backgroundImage = chartEditStore.getEditCanvasConfig.backgroundImage;
  const backgroundColor =
    backgroundType === 'background' ? background : backgroundImage;

  const computedBackground =
    backgroundType === 'background'
      ? { background: backgroundColor }
      : {
          background: backgroundImage
            ? `url(${backgroundImage}) no-repeat center center / cover !important`
            : background
        };
  // @ts-ignore
  return {
    ...computedBackground
  };
});
</script>

<template>
  <div class="editor-operation">
    <editor-canvas
      id="go-chart-edit-layout"
      class="editor-canvas"
      :class="{ 'no-padding': currentRoute === 'dashboardEditor' }"
      @drop="dragHandle"
      @dragover="dragoverHandle"
      @dragenter="dragoverHandle"
    >
      <div class="editor-content-view">
        <div
          id="go-chart-edit-content"
          class="editor-content"
          @contextmenu="handleContextMenu"
          @mousedown="mousedownHandleUnStop"
        >
          <div>
            <edit-range>
              <!-- 滤镜预览 -->
              <div
                class="range-content"
                :style="{ ...rangeStyle}"
              >
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
                    @contextmenu="handleContextMenu($event, item)"
                  >
                    <component
                      class="edit-content-chart"
                      :is="item.chartConfig.chartKey"
                      :chartConfig="item"
                      :themeSetting="themeSetting"
                      :themeColor="item.themeColor"
                      :style="{
                      ...useSizeStyle(item.attr),
                    }"
                    ></component>
                  </edit-shape-box>
                </div>
              </div>
            </edit-range>
          </div>
        </div>
      </div>
    </editor-canvas>
    <div class="editor-configurations">
      <editor-configurations></editor-configurations>
    </div>
  </div>
</template>
<style lang="scss" scoped>
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
    padding-top: 75px;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    .editor-content-view {
      padding: 22.5px;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      overflow: auto;
      // background-image: linear-gradient(#ffffff 14px, transparent 0),
      //   linear-gradient(90deg, transparent 14px, #373739 0);
      // background-size: 15px 15px, 15px 15px;
      background-color: #ffffff;
      .editor-content {
        position: relative;
        box-sizing: border-box;
        .range-content {
          width: inherit;
          height: inherit;
        }
      }
    }
  }
  .no-padding {
    padding-top: 0;
  }
  .editor-configurations {
    width: fit-content;
    flex-shrink: 0;
    height: 100%;
    box-sizing: border-box;
    padding: 0 22px;
  }
}
</style>
