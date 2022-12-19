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
      @drag="drag($event, item)"
      @dragstart="dragStartHandle($event, item)"
      @dragend="dragendHandle($event, item)"
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
import { useTargetData } from '@/utils/hooks/useTargetData';
import mitt from '@/utils/hooks/mitt';

const chartEditStore = useChartEditStore();
const { layoutList } = useTargetData();

const currentItem = ref<ConfigType>();
const pos = ref({ x: 0, y: 0 });
mitt.on('transfer', async (e: any) => {
  console.log(e);

  pos.value = e.value;
  console.log(pos.value.x);

  componentInstall(
    currentItem!.value!.chartKey,
    fetchChartComponent(currentItem.value as ConfigType)
  );
  componentInstall(
    currentItem!.value!.conKey,
    fetchConfigComponent(currentItem!.value as ConfigType)
  );
  componentInstall(
    currentItem!.value!.dataKey,
    fetchDataComponent(currentItem!.value as ConfigType)
  );
  let newComponent: CreateComponentType = await createDashboardComponent(
    currentItem!.value as ConfigType
  );
  newComponent.layout!.x = pos.value.x;
  newComponent.layout!.y = pos.value.y;
  console.log(newComponent);

  chartEditStore.addComponentList(newComponent, false, true);
  chartEditStore.setTargetSelectChart(newComponent.id);
});

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

const drag = (e: DragEvent, item: ConfigType) => {
  const rect = document.querySelector('#layoutView')!.getBoundingClientRect();
  if (
    e.clientX > rect.left &&
    e.clientX < rect.right &&
    e.clientY > rect.top &&
    e.clientY < rect.bottom
  ) {
    // 进入指定区域
    mitt.emit('move', {
      e,
      rect,
      index: chartEditStore.getComponentList.length,
    });
    return;
  }
  if (e.clientX !== 0 && e.clientY !== 0) {
    mitt.emit('delete', e);
  }
};

const dragStartHandle = (e: DragEvent, item: ConfigType) => {
  // componentInstall(item.chartKey, fetchChartComponent(item));
  // componentInstall(item.conKey, fetchConfigComponent(item));
  // componentInstall(item.dataKey, fetchDataComponent(item));
  // e!.dataTransfer!.setData(
  //   DragKeyEnum.DRAG_KEY,
  //   JSON.stringify(omit(item, ['image']))
  // );
  // chartEditStore.setEditCanvas(EditCanvasTypeEnum.IS_CREATE, true);
};
const dragendHandle = async (e: DragEvent, item: ConfigType) => {
  console.log('拖拽结束');
  const rect = document.querySelector('#layoutView')!.getBoundingClientRect();
  if (
    e.clientX > rect.left &&
    e.clientX < rect.right &&
    e.clientY > rect.top &&
    e.clientY < rect.bottom
  ) {
    // 成功放入指定区域
    console.log('成功放入指定区域');
    currentItem.value = item;
    mitt.emit('remove');
  }
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
