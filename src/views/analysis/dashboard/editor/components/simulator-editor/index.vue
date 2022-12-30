<script setup lang="ts">
import {
  computed,
  onMounted,
  ref,
  getCurrentInstance,
  nextTick,
  reactive,
} from "vue";
import { loadAsyncComponent } from "@/utils";
import { chartColors } from "@/settings/chartThemes/index";
import { useMouseHandle } from "@/utils/hooks/useDrag";
import { useAddKeyboard } from "@/utils/hooks/useKeyboard";
import { useComponentStyle, useSizeStyle } from "@/utils/hooks/useStyle";
import { useContextMenu } from "@/views/editor/charts/hooks/useContextMenu.hook";
import { useChartEditStore } from "@/store/chartEditStore/chartEditStore";
import { useTargetData } from "@/utils/hooks/useTargetData";
import { useRouter } from "vue-router";
import { editorCanvas } from "@/views/editor/operation/editorCanvas/index";
import { editorConfigurations } from "@/views/analysis/dashboard/editor/components/configurations";
import mitt from "@/utils/hooks/mitt";
import {
  CreateComponentType,
  CreateComponentGroupType,
  PickCreateComponentType,
} from "@/packages/index.d";
import { borderRadius } from "@/settings/designSetting";

const chartEditStore = useChartEditStore();
const { handleContextMenu } = useContextMenu();
const router = useRouter();
const currentRoute = router.currentRoute.value.name;
const { layoutList } = useTargetData();

// let currentInstance: any = null;

const { proxy } = getCurrentInstance();

// 布局处理
// useLayout();
//监听键盘
onMounted(() => {
  useAddKeyboard();
  // currentInstance = getCurrentInstance();
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
    backgroundType === "background" ? background : (backgroundImage as string);

  const computedBackground =
    backgroundType === "background"
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

const activeComponent = (e: Event, id: string) => {
  e.preventDefault();
  e.stopPropagation();
  chartEditStore.setTargetSelectChart(id);
};

const selectId = computed(() => {
  return chartEditStore.getTargetChart.selectId;
});

const drop = async (e: DragEvent) => {
  e.preventDefault();
};

const allList = computed(() => {
  return [...layoutList.value, ...virtualItem.value];
});

const layoutHandleClick = (
  e: MouseEvent,
  item?: CreateComponentType | CreateComponentGroupType
) => {
  e.preventDefault();
  e.stopPropagation();
  if (item) {
    chartEditStore.setTargetSelectChart(item.id);
    return;
  }
  chartEditStore.setTargetSelectChart(undefined);
};

const virtualItem = ref<any>([]);
const new_pos = ref({
  x: 0,
  y: 0,
});
// 注册事件
mitt.on("move", (data: any) => {
  if (virtualItem.value.length === 0) {
    virtualItem.value.push({
      w: 6,
      h: 6,
      x: 0,
      y: 0,
      i: "drop",
      id: "drop",
      resizable: true,
      draggable: true,
      static: false,
    });
  } else {
    let parent = proxy.$refs.gridLayoutDom;
    let virtual = proxy.$refs.virtualDom[0];
    virtual.style.display = "none";
    virtual.dragging = {
      top: data.e.clientY - data.rect.top,
      left: data.e.clientX - data.rect.left,
    };
    new_pos.value = virtual.calcXY(
      data.e.clientY - data.rect.top,
      data.e.clientX - data.rect.left
    );

    parent.dragEvent(
      "dragstart",
      "drop",
      new_pos.value.x,
      new_pos.value.y,
      6,
      6
    );
  }
});

mitt.on("remove", (e: any) => {
  console.log(e);

  proxy.$refs.gridLayoutDom.dragEvent(
    "dragend",
    "drop",
    new_pos.value.x,
    new_pos.value.y,
    6,
    6
  );

  const resultY = Math.floor(e.offsetY / 40);
  console.log(resultY);

  virtualItem.value.length && (virtualItem.value = []);

  mitt.emit("transfer", new_pos);

  setTimeout(() => {
    proxy.$refs.gridLayoutDom.dragEvent(
      "dragend",
      (chartEditStore.getComponentList.length - 1).toString(),
      new_pos.value.x,
      new_pos.value.y,
      6,
      6
    );
  }, 200);
});

mitt.on("delete", (e) => {
  virtualItem.value.length && (virtualItem.value = []);
});

const moveEvent = (i, newX, newY) => {
  console.log(i, newX, newY);
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
        <div class="editor-content">
          <div class="layout-area-view">
            <grid-layout
              class="layoutbcc"
              ref="gridLayoutDom"
              id="layoutView"
              :layout.sync="allList"
              :col-num="12"
              :row-height="40"
              :is-draggable="true"
              :is-resizable="true"
              :vertical-compact="true"
              :use-css-transforms="true"
              @ondrop="drop"
              @click="layoutHandleClick"
              :style="{ ...rangeStyle }"
            >
              <div>
                <grid-item
                  v-for="(item, index) in virtualItem"
                  ref="virtualDom"
                  :x="item!.x"
                  :y="item!.y"
                  :w="item!.w"
                  :h="item!.h"
                  :i="item!.i"
                  @move="moveEvent"
                >
                </grid-item>
                <grid-item
                  v-for="(item, index) in layoutList"
                  :x="item!.x"
                  :y="item!.y"
                  :w="item!.w"
                  :h="item!.h"
                  :i="item!.i"
                  @click="activeComponent($event, item!.id)"
                  :class="{ active: selectId[0] === item!.id }"
                  @move="moveEvent"
                  :style="{
                    backgroundColor: chartEditStore.getComponentList[index].card
                      .customBack
                      ? chartEditStore.getComponentList[index].card
                          .customBackColor
                      : '',
                    borderRadius: chartEditStore.getComponentList[index].card
                      .customBack
                      ? chartEditStore.getComponentList[index].card
                          .customBackRadius + 'px'
                      : '',
                  }"
                >
                  <div
                    class="grid-title"
                    v-if="
                      chartEditStore.getComponentList[index].card.showMainTitle
                    "
                    :style="{
                      color:
                        chartEditStore.getComponentList[index].card
                          .mainTitleFontColor,
                      fontSize:
                        chartEditStore.getComponentList[index].card
                          .mainTitleFontSize,
                      fontWeight:
                        chartEditStore.getComponentList[index].card
                          .mainTitleFontWeight,
                      fontStyle:
                        chartEditStore.getComponentList[index].card
                          .mainTitleFontStyle,
                    }"
                  >
                    {{
                      chartEditStore.getComponentList[index].card
                        .mainTitleContent
                    }}
                  </div>
                  <component
                    :ref="item.i"
                    class="edit-content-chart"
                    :is="
                      chartEditStore.getComponentList[index].chartConfig
                        .chartKey
                    "
                    :chartConfig="chartEditStore.getComponentList[index]"
                    :themeSetting="themeSetting"
                    :themeColor="
                      chartEditStore.getComponentList[index].themeColor
                    "
                  ></component>
                  <div
                    class="grid-sub-title"
                    v-if="
                      chartEditStore.getComponentList[index].card.showFootTitle
                    "
                    style="color: #ffffff"
                  >
                    {{
                      chartEditStore.getComponentList[index].card
                        .footTitleContent
                    }}
                  </div>
                </grid-item>
              </div>
            </grid-layout>
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
        height: 100%;

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

    // ::v-deep .editor-configuration-view {
    //   .common-configuration {
    //     width: 435px;
    //     height: 100%;
    //   }
    // }
  }
}

.vue-grid-item:not(.vue-grid-placeholder) {
  background: rgba(0, 0, 0, 0);
  border: 2px dashed #96a0fe;
  display: flex;
  flex-direction: column;
}

.vue-grid-item.active {
  border: 2px dashed #ff6746;
}

.vue-grid-item {
  display: flex;
  flex-direction: column;
  .grid-title {
    flex-shrink: 0;
    text-align: left;
  }
  .grid-sub-title {
    flex-shrink: 0;
    text-align: left;
  }
  ::v-deep .echarts,
  .edit-content-chart {
    height: 0;
    flex: 1;
  }
}

.layout-area-view {
  padding-bottom: 300px;
  box-sizing: border-box;
  height: 100%;

  ::v-deep .layoutbcc {
    min-height: 100%;
    background-color: antiquewhite;
  }
}
</style>
