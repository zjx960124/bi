<script setup lang="ts">
import { computed, ref, watch, nextTick, onMounted } from "vue";
import { getLocalStorage, getSessionStorageInfo } from "@/utils";
import { number } from "echarts/core";
const props = defineProps({
  previewId: {
    type: String,
    required: true,
  },
});
const projectInfo = getSessionStorageInfo() || getLocalStorage(props.previewId);
const currentPageIndex = ref(0);

console.log(projectInfo);

const layoutList = ref<any>([]);
onMounted(() => {
  const result = getSessionStorageInfo().componentList.map((item) => {
    return item.layout;
  });
  layoutList.value = result;
});

const indexModules = import.meta.globEager(
  "@/packages/components/**/index.vue"
);

for (const key in indexModules) {
  const url = key.split("/");
  window["$vue"].component(
    "V" + url[url.length - 2],
    indexModules[key].default
  );
}

const rangeStyle = computed(() => {
  // 设置背景色和图片背景
  const backgroundType = projectInfo.editCanvasConfig.backgroundType;
  const background = projectInfo.editCanvasConfig.background;
  const backgroundImage = projectInfo.editCanvasConfig.backgroundImage;
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
    width: projectInfo.editCanvasConfig.width + "px",
  };
});
</script>
<template>
  <div class="dashboard-preview-view">
    <grid-layout
      class="layoutbcc"
      ref="gridLayoutDom"
      id="layoutView"
      :layout="layoutList"
      :col-num="12"
      :row-height="40"
      :is-draggable="false"
      :is-resizable="false"
      :vertical-compact="true"
      :use-css-transforms="true"
      :style="{ ...rangeStyle }"
    >
      <div>
        <grid-item
          v-for="(item, index) in layoutList"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :style="{
            backgroundColor: projectInfo.componentList[index].card.customBack
              ? projectInfo.componentList[index].card.customBackColor
              : '',
            borderRadius: projectInfo.componentList[index].card.customBack
              ? projectInfo.componentList[index].card.customBackRadius + 'px'
              : '',
          }"
        >
          <div
            class="grid-title"
            v-if="projectInfo.componentList[index].card.showMainTitle"
            :style="{
              color: projectInfo.componentList[index].card.mainTitleFontColor,
              fontSize: projectInfo.componentList[index].card.mainTitleFontSize,
              fontWeight:
                projectInfo.componentList[index].card.mainTitleFontWeight,
              fontStyle:
                projectInfo.componentList[index].card.mainTitleFontStyle,
            }"
          >
            {{ projectInfo.componentList[index].card.mainTitleContent }}
          </div>
          <component
            :ref="item.i"
            class="edit-content-chart"
            :is="projectInfo.componentList[index].chartConfig.chartKey"
            :chartConfig="projectInfo.componentList[index]"
            :themeSetting="projectInfo.componentList[index].themeSetting"
            :themeColor="projectInfo.componentList[index].themeColor"
          ></component>
          <div
            class="grid-sub-title"
            v-if="projectInfo.componentList[index].card.showFootTitle"
            style="color: #ffffff"
          >
            {{ projectInfo.componentList[index].card.footTitleContent }}
          </div>
        </grid-item>
      </div>
    </grid-layout>
  </div>
</template>
<style lang="scss" scoped>
.dashboard-preview-view {
  width: 100vw;
  height: 100vh;
  .layoutbcc {
    // width: 100%;
    height: 100%;
    margin: 0 auto;
  }
}
</style>
