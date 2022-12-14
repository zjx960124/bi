<script setup lang="ts">
import { ref, PropType } from 'vue';
import omit from 'lodash/omit';
import { DragKeyEnum } from '@/types';
import { createComponent } from '@/packages';
import { ConfigType, CreateComponentType } from '@/packages/index.d';
import { EditCanvasTypeEnum } from '@/store/chartEditStore/chartEditStore.d';
import { useChartEditStore } from '@/store/chartEditStore/chartEditStore';
import {
  componentInstall,
  loadingStart,
  loadingFinish,
  loadingError,
} from '@/utils';
import {
  fetchConfigComponent,
  fetchChartComponent,
  fetchDataComponent,
} from '@/packages/index';
const chartEditStore = useChartEditStore();
const props = defineProps({
  menuOptions: {
    type: Array as PropType<ConfigType[]>,
    default: () => [],
  },
});
const dragStartHandle = (e: DragEvent, item: ConfigType) => {
  componentInstall(item.chartKey, fetchChartComponent(item));
  componentInstall(item.conKey, fetchConfigComponent(item));
  componentInstall(item.dataKey, fetchDataComponent(item));
  e!.dataTransfer!.setData(
    DragKeyEnum.DRAG_KEY,
    JSON.stringify(omit(item, ['image']))
  );
  chartEditStore.setEditCanvas(EditCanvasTypeEnum.IS_CREATE, true);
};
const dragendHandle = () => {
  chartEditStore.setEditCanvas(EditCanvasTypeEnum.IS_CREATE, false);
};
const dblclickHandle = async (item: ConfigType) => {
  try {
    console.log(item);
    // loadingStart();
    // 动态注册图表组件
    componentInstall(item.chartKey, fetchChartComponent(item));
    componentInstall(item.conKey, fetchConfigComponent(item));
    componentInstall(item.dataKey, fetchDataComponent(item));
    // 创建新图表组件
    let newComponent: CreateComponentType = await createComponent(item);
    // 添加
    chartEditStore.addComponentList(newComponent, false, true);
    // 选中
    chartEditStore.setTargetSelectChart(newComponent.id);
    // loadingFinish();
  } catch (error) {
    // loadingError();
    // window["$message"].warning(`图表正在研发中, 敬请期待...`);
  }
};
</script>
<template>
  <div class="editor-charts-item">
    <div
      class="charts-item"
      v-for="(item, index) in menuOptions"
      :key="index"
      :id="item.category"
      draggable
      @dragstart="dragStartHandle($event, item)"
      @dragend="dragendHandle"
      @dblclick="dblclickHandle(item)"
    >
      <div class="item-img">
        <img v-imgLazy="item.image" alt="" />
      </div>
      <div class="item-label">{{ item.title }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.editor-charts-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 40px;
  width: calc(100% - 80px);
  box-sizing: border-box;
  flex: 1;
  .charts-item {
    width: 120px;
    cursor: pointer;
    height: 100px;
    .item-img {
      width: 120px;
      height: 75px;
      & > img {
        width: 100%;
        height: 100%;
      }
    }
    .item-label {
      text-align: center;
      font-size: 12px;
      user-select: none;
    }
  }
  .charts-item + .charts-item {
    margin-left: 20px;
  }
}
</style>
