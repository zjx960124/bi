<script setup lang="ts">
import { reactive, ref, toRefs, watch, watchEffect } from "vue";
import { loadAsyncComponent } from "@/utils";
import { useChartEditStore } from "@/store/chartEditStore/chartEditStore";
import { EditCanvasTypeEnum } from "@/store/chartEditStore/chartEditStore.d";

// 获取全部分类组件
import { genreMenuOptions } from "@/utils/hooks/useAside";
import cloneDeep from "lodash/cloneDeep";

const chartEditStore = useChartEditStore();
const { lockScale, scale } = toRefs(chartEditStore.getEditCanvas);

const { dropdownItem } = import("./dropdownItem/index.ts");
const chartsItem = loadAsyncComponent(
  () => import("../../charts/components/chartsItem/index.vue")
);

// 拖动
const sliderValue = ref(100);
// 监听 scale 变化
watchEffect(() => {
  const value = (scale.value * 100).toFixed(0);
  sliderValue.value = parseInt(value);
});
// 拖动处理
const sliderHandle = (v: number) => {
  chartEditStore.setScale(v / 100);
};
const sliderMaks = reactive({
  100: "",
});

// 弹出框
const currentMenuOptions = ref([]);
const handleClick = (item, index) => {
  const domRect = document
    .getElementById("editor-toolbar")
    .getBoundingClientRect();
  x.value = domRect.x;
  y.value = domRect.height + domRect.y;
  currentMenuOptions.value = item;
  console.log(currentMenuOptions.value);
  if (index === currenIndex.value) {
    showPopover.value = !showPopover.value;
  } else {
    showPopover.value = true;
  }
  currenIndex.value = index;
};

//滚动到指定位置
const intoView = (key) => {
  const dom = document.getElementById(key + 0);
  if (dom) {
    dom.scrollIntoView();
  }
};

const showPopover = ref(false);
const currenIndex = ref(-1);
const x = ref(0);
const y = ref(0);
</script>
<template>
  <div class="editor-toolbar">
    <div class="editor-toolbar-view" id="editor-toolbar">
      <div class="magnify">
        <n-slider
          class="scale-slider"
          v-model:value="sliderValue"
          :default-value="50"
          :min="10"
          :max="200"
          :step="1"
          :marks="sliderMaks"
          @update:value="sliderHandle"
        ></n-slider>
      </div>
      <div class="component">
        <template v-for="(item, index) in genreMenuOptions" :key="index">
          <n-button
            quaternary
            type="primary"
            color="#8386A1"
            @click="handleClick(item, index)"
          >
            {{ item.label }}
            <template #icon>
              <n-icon>
                <cash-icon />
              </n-icon>
            </template>
          </n-button>
        </template>
      </div>
    </div>
    <n-popover
      :show="showPopover"
      :show-arrow="false"
      width="1142"
      style="
        height: 208px;
        transfrom: translateX(0%), transitionY(0%);
        box-sizing: border-box;
      "
      :x="x"
      :y="y"
      trigger="click"
    >
      <div class="popover-menu-btn-view">
        <template
          v-for="(items, indexs) in currentMenuOptions.list"
          :key="indexs"
        >
          <div class="menu-btn">
            <el-button type="text" @click="intoView(items.key)">{{
              items.label
            }}</el-button>
          </div>
        </template>
      </div>
      <charts-item
        class="popover-charts-view"
        :menuOptions="currentMenuOptions.all"
      ></charts-item>
    </n-popover>
  </div>
</template>
<style lang='scss' scoped>
.editor-toolbar {
  width: calc(100% - 469px);
  height: 67px;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #f3f5ff;
  .editor-toolbar-view {
    background: #ffffff;
    margin-bottom: 17px;
    border-radius: 15px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .magnify {
      display: flex;
      align-items: center;
      .scale-slider {
        width: 260px;
        margin: auto;
      }
    }
    .component {
      margin-right: 113px;
    }
  }
  .popover-view {
    width: 100%;
    height: 208px;
  }
}
</style>
