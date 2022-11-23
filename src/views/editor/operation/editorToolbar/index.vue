<script setup lang="ts">
import { reactive, ref, toRefs, watch, watchEffect } from 'vue';
import { loadAsyncComponent } from '@/utils';
import { useChartEditStore } from '@/store/chartEditStore/chartEditStore';
import { EditCanvasTypeEnum } from '@/store/chartEditStore/chartEditStore.d';
import { ReorderFour, AddCircle, RemoveCircle } from '@vicons/ionicons5';

// 获取全部分类组件
import { genreMenuOptions, genreMenuOptionsType } from '@/utils/hooks/useAside';

const chartEditStore = useChartEditStore();
const { lockScale, scale } = toRefs(chartEditStore.getEditCanvas);

const chartsItem = loadAsyncComponent(
  () => import('../../charts/components/chartsItem/index.vue')
);

// 拖动
const sliderValue = ref<number>(100);
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
  100: '',
});

// 加减Scale
const handleReduceScale = () => {
  chartEditStore.setScale((sliderValue.value - 10) / 100);
};

const handleIncreaseScale = () => {
  chartEditStore.setScale((sliderValue.value + 10) / 100);
};

// 弹出框
const currentMenuOptions = ref<genreMenuOptionsType>();
const handleClick = (item: genreMenuOptionsType, index: number) => {
  const domRect = document
    .getElementById('editor-toolbar')!
    .getBoundingClientRect();
  x.value = domRect.x;
  y.value = domRect.height + domRect.y;
  currentMenuOptions.value = item as genreMenuOptionsType;
  console.log(currentMenuOptions.value);
  if (index === currenIndex.value) {
    showPopover.value = !showPopover.value;
  } else {
    showPopover.value = true;
  }
  currenIndex.value = index;
};

//滚动到指定位置
const intoView = (key: string) => {
  console.log(key);
  const dom = document.getElementById(key);
  console.log(dom);
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
        <n-icon
          :component="RemoveCircle"
          color="#6D79FF"
          size="20"
          @click="handleReduceScale"
        ></n-icon>
        <n-slider
          class="scale-slider"
          v-model:value="sliderValue"
          :default-value="50"
          :min="1"
          :max="200"
          :step="10"
          :marks="sliderMaks"
          @update:value="sliderHandle"
        ></n-slider>
        <n-icon
          :component="AddCircle"
          color="#6D79FF"
          size="20"
          @click="handleIncreaseScale"
        ></n-icon>
        <span class="slider-value">{{ sliderValue }}%</span>
      </div>
      <div class="component">
        <template v-for="(item, index) in genreMenuOptions" :key="index">
          <n-popover placement="bottom" trigger="click">
            <template #trigger>
              <n-button
                quaternary
                type="primary"
                color="#8386A1"
                @click="handleClick(item, index)"
              >
                {{ item.label }}
                <template #icon>
                  <n-icon :component="ReorderFour" size="16"></n-icon>
                </template>
              </n-button>
            </template>
            <div class="popover-menu-btn-view">
              <template v-for="items in currentMenuOptions!.list" :key="indexs">
                <div class="menu-btn" @click="intoView(items!.key)">
                  <n-button type="text">{{ items!.label }}</n-button>
                </div>
              </template>
            </div>
            <charts-item
              class="popover-charts-view"
              style="overflow: auto"
              :menuOptions="currentMenuOptions!.all"
            ></charts-item>
          </n-popover>
        </template>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.editor-toolbar {
  height: 50px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  background-color: #f3f5ff;
  .editor-toolbar-view {
    background: #ffffff;
    border-radius: 15px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .magnify {
      display: flex;
      align-items: center;
      padding-left: 29px;
      width: 25%;
      cursor: pointer;
      .scale-slider {
        width: 100%;
        margin: 0 15px;
      }
      .slider-value {
        margin-left: 11px;
        font-family: 'PingFang-SC-Regular';
        color: #6b797f;
        font-size: 12px;
      }
    }
    .component {
      margin-right: 113px;
      :deep .popover-menu-btn-view {
        background: #f6f7f9;
        border-radius: 11px;
      }
    }
  }
  .popover-view {
    width: 100%;
    height: 208px;
  }
}
</style>
