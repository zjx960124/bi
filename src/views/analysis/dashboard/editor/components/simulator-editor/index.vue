<script setup lang="ts">
import {
  computed,
  onMounted,
  ref,
  getCurrentInstance,
  nextTick,
  reactive,
} from 'vue';
import { loadAsyncComponent } from '@/utils';
import { chartColors } from '@/settings/chartThemes/index';
import { useMouseHandle } from '@/utils/hooks/useDrag';
import { useAddKeyboard } from '@/utils/hooks/useKeyboard';
import { useComponentStyle, useSizeStyle } from '@/utils/hooks/useStyle';
import { useContextMenu } from '@/views/editor/charts/hooks/useContextMenu.hook';
import { useChartEditStore } from '@/store/chartEditStore/chartEditStore';
import { useTargetData } from '@/utils/hooks/useTargetData';
import { useRouter } from 'vue-router';
import { editorCanvas } from '@/views/editor/operation/editorCanvas/index';
import { editorConfigurations } from '@/views/editor/operation/editorConfigurations';
import mitt from '@/utils/hooks/mitt';

const chartEditStore = useChartEditStore();
const { handleContextMenu } = useContextMenu();
const router = useRouter();
const currentRoute = router.currentRoute.value.name;
const { layoutList } = useTargetData();
const virtualItem = ref<any>([]);

let currentInstance: any = null;
// 注册事件
mitt.on('move', (data: any) => {
  if (virtualItem.value.length === 0) {
    virtualItem.value.push({
      w: 6,
      h: 6,
      x: 0,
      y: 0,
      i: 'drop',
      id: 'drop',
      resizable: true,
      draggable: true,
      static: true,
    });
  } else {
    let parent = currentInstance.ctx.$refs.gridLayoutDom;
    let virtual = currentInstance.ctx.$refs.virtualDom[0];
    virtual.style.display = 'none';
    virtual.dragging = {
      top: data.e.clientY - data.rect.top,
      left: data.e.clientX - data.rect.left,
    };
    let new_pos = virtual.calcXY(
      data.e.clientY - data.rect.top,
      data.e.clientX - data.rect.left
    );
    parent.dragEvent('dragstart', 'drop', new_pos.x, new_pos.y, 6, 6);
  }
});

mitt.on('remove', (e) => {
  console.log('remove');
  virtualItem.value.length && (virtualItem.value = []);
});

// 布局处理
// useLayout();
//监听键盘
onMounted(() => {
  useAddKeyboard();
  currentInstance = getCurrentInstance();
});

// 点击事件
const {
  mouseenterHandle,
  mouseleaveHandle,
  mousedownHandle,
  mouseClickHandle,
} = useMouseHandle();

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
            : background,
        };
  // @ts-ignore
  return {
    ...computedBackground,
  };
});

const activeComponent = (id: string) => {
  chartEditStore.setTargetSelectChart(id);
};

const drop = async (e: DragEvent) => {
  e.preventDefault();
};
</script>

<template>
  <div class="editor-operation">
    <editor-canvas
      class="editor-canvas"
      :class="{ 'no-padding': currentRoute === 'dashboardEditor' }"
      @ondrop="drop"
    >
      <div class="editor-content-view">
        <div class="editor-content" style="height: 800px">
          <grid-layout
            class="layoutbcc"
            ref="gridLayoutDom"
            id="layoutView"
            :layout.sync="layoutList"
            :col-num="12"
            :row-height="40"
            :is-draggable="true"
            :is-resizable="true"
            :vertical-compact="true"
            :use-css-transforms="true"
            @ondrop="drop"
          >
            <grid-item
              v-for="(item, index) in virtualItem"
              ref="virtualDom"
              :x="item!.x"
              :y="item!.y"
              :w="item!.w"
              :h="item!.h"
              :i="item!.i"
            >
            </grid-item>
            <grid-item
              v-for="(item, index) in layoutList"
              :x="item!.x"
              :y="item!.y"
              :w="item!.w"
              :h="item!.h"
              :i="item!.i"
              @click="activeComponent(item!.id)"
            >
              <component
                v-if="item.i !== 'drop'"
                :ref="item.i"
                class="edit-content-chart"
                :is="
                  chartEditStore.getComponentList[index].chartConfig.chartKey
                "
                :chartConfig="chartEditStore.getComponentList[index]"
                :themeSetting="themeSetting"
                :themeColor="chartEditStore.getComponentList[index].themeColor"
              ></component>
            </grid-item>
          </grid-layout>
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
.vue-grid-item:not(.vue-grid-placeholder) {
  background: #f3f5ff;
  border: 1px solid black;
}

.layoutbcc {
  padding-bottom: 150px;
  min-height: 800px;
}
</style>
