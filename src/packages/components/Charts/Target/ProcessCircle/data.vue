<script setup lang="ts">
import { PropType, shallowRef, triggerRef } from 'vue';
import Draggable from 'vuedraggable';
import { PublicRequestType } from '@/packages/index.d';
import { Refresh } from '@vicons/tabler';
import { Delete } from '@vicons/carbon';
import { fieldItem } from '@/packages/index.d';

const props = defineProps({
  requestConfig: {
    type: Object as PropType<PublicRequestType>,
    required: true,
  },
});
const dragDimensonAdd = (e: DragEvent) => {
  triggerRef(dimensionList);
};

const dragMeasureAdd = (e: DragEvent) => {
  triggerRef(measureList);
};

const dimensionList = shallowRef({ list: props.requestConfig.dimension });
// tool 这里没有响应式无法自动更改数据到视图
const measureList = shallowRef({ list: props.requestConfig.measure });

const updateShallow = () => {
  props.requestConfig.dimension = dimensionList.value.list;
  props.requestConfig.measure = measureList.value.list;
};

const deleteDimension = (element: fieldItem, index: number) => {
  if (element.columnName === '中国地图') return false;
  dimensionList.value.list = dimensionList.value.list.filter(
    (item, indexs) => indexs !== index
  );
  triggerRef(dimensionList);
};
const deleteMeasure = (index: number) => {
  measureList.value.list = measureList.value.list.filter(
    (item, indexs) => indexs !== index
  );
  triggerRef(measureList);
};

const measurePutFunc = (e: any, data: any) => {
  return (
    measureList.value.list.length < props.requestConfig.measureLength &&
    e.options.group.name === data.options.group.name
  );
};
</script>
<template>
  <div class="layout-data-view">
    <div class="layout-data-title">
      <span>进度值/度量</span>
      <span
        >{{ dimensionList.list.length }}/{{
          requestConfig.dimensionLength
        }}</span
      >
    </div>
    <Draggable
      v-model="dimensionList.list"
      item-key="id"
      :class="{
        'measure-drag-view': dimensionList.list.length === 0,
      }"
      :group="{
        name: 'measure',
        put: measurePutFunc,
      }"
      @add="dragDimensonAdd"
    >
      <template #item="{ element, index }">
        <div class="dimension-item">
          <div>
            <img
              src="@/assets/screen/string.png"
              class="dimension-img"
              alt=""
            />
            {{ element.columnName }}
          </div>
          <n-icon
            :component="Delete"
            size="14"
            class="dimension-icon"
            @click="deleteDimension(element, index)"
          ></n-icon>
        </div>
      </template>
    </Draggable>
    <div class="layout-data-title">
      <span>目标值/度量</span>
      <span
        >{{ measureList.list.length }}/{{ requestConfig.measureLength }}</span
      >
    </div>
    <div class="layout-data-other">
      <n-radio-group
        class="common-radio-group"
        style="margin-bottom: 10px"
        v-model:value="requestConfig.dataType"
        name="radiogroup"
      >
        <n-space>
          <n-radio key="1" :value="1"> 动态字段 </n-radio>
          <n-radio key="2" :value="2"> 手动输入 </n-radio>
        </n-space>
      </n-radio-group>
    </div>
    <div v-show="requestConfig.dataType === 2">
      <el-input-number
        v-model="requestConfig.data"
        class="common-number-input"
        controls-position="right"
        :min="1"
        size="small"
      />
    </div>
    <Draggable
      v-show="requestConfig.dataType === 1"
      v-model="measureList.list"
      :class="{ 'measure-drag-view': measureList.list.length === 0 }"
      item-key="id"
      :group="{
        name: 'measure',
        put: measurePutFunc,
      }"
      @add="dragMeasureAdd"
    >
      <template #item="{ element, index }">
        <div class="measure-item">
          <div>
            <img src="@/assets/screen/num.png" class="measure-img" alt="" />
            {{ element.columnName }}
          </div>
          <n-icon
            :component="Delete"
            size="14"
            class="measure-icon"
            @click="deleteMeasure(index)"
          ></n-icon>
        </div>
      </template>
    </Draggable>
    <div class="update-btn" @click="updateShallow">
      <n-icon :component="Refresh" size="22" style="margin-right: 8px"></n-icon>
      更新
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/style/styles/pages/data.scss';
</style>
