<script lang="ts">
export default {
  name: 'ComponentsPanel',
};
</script>
<template>
  <div class="components-panel">
    <div
      v-for="item in list"
      :key="item.key"
      class="item"
      draggable
      @dragstart="dragStartHandle($event, item)"
      @dragend="dragendHandle"
      @dblclick="dblclickHandle(item)"
    >
      <el-image class="item-img" :src="item.image" fit="contain"> </el-image>
      <div class="item-name">{{ item.title }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, watch, PropType, onMounted } from 'vue';
import omit from 'lodash/omit';
import { DragKeyEnum } from '@/types';
import { createComponent, createDashboardComponent } from '@/packages';
import { ConfigType, CreateComponentType } from '@/packages/index.d';
import { EditCanvasTypeEnum } from '@/store/chartEditStore/chartEditStore.d';
import { useChartEditStore } from '@/store/chartEditStore/chartEditStore';
import { componentInstall } from '@/utils';
import {
  fetchConfigComponent,
  fetchChartComponent,
  fetchDataComponent,
} from '@/packages/index';

const chartEditStore = useChartEditStore();

const props = defineProps({
  data: {
    type: Array as PropType<ConfigType[]>,
    required: true,
  },
});

const state = reactive({
  list: [] as ConfigType[],
});

const { list } = toRefs(state);

watch(
  () => props.data,
  (value) => {
    state.list = value;
  },
  {
    immediate: true,
    deep: true,
  }
);

onMounted(() => {
  document.body.ondrop = function (event) {
    event.preventDefault();
    event.stopPropagation();
  };
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
    // 动态注册图表组件
    componentInstall(item.chartKey, fetchChartComponent(item));
    componentInstall(item.conKey, fetchConfigComponent(item));
    componentInstall(item.dataKey, fetchDataComponent(item));
    // 创建新图表组件
    let newComponent: CreateComponentType = await createDashboardComponent(
      item
    );
    console.log(newComponent);

    // 添加
    chartEditStore.addComponentList(newComponent, false, true);
    // 选中
    chartEditStore.setTargetSelectChart(newComponent.id);
  } catch (error) {
    window['$message'].warning(`图表正在研发中, 敬请期待...`);
  }
};
</script>

<style lang="scss" scoped>
.components-panel {
  margin: 0 10px;
  width: 180px;
  padding: 20px 15px;
  background: #ffffff;
  border-radius: 15px;
  overflow: hidden;
  .item {
    float: left;
    margin-bottom: 24px;
    width: 100%;
    padding: 0;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    .item-img {
      width: 100%;
      height: 88px;
      background-color: #e0e3e5;
      border-radius: 2px;
    }

    .item-name {
      margin-top: 15px;
      font-size: 12px;
      font-weight: 400;
      color: #6b797f;
      line-height: 1;
    }
  }
}
</style>
