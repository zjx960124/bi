<script setup lang="ts">
import { PropType, shallowRef, triggerRef } from 'vue';
import Draggable from 'vuedraggable';
import { PublicRequestType } from '@/packages/index.d';
import { Refresh } from '@vicons/tabler';
import { Delete } from '@vicons/carbon';

const props = defineProps({
  requestConfig: {
    type: Object as PropType<PublicRequestType>,
    required: true,
  },
});

const dragMeasureAdd = (e: DragEvent) => {
  triggerRef(measureList);
};

// tool 这里没有响应式无法自动更改数据到视图
const measureList = shallowRef({ list: props.requestConfig.measure });

const updateShallow = () => {
  props.requestConfig.measure = measureList.value.list;
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
        >{{ measureList.list.length }}/{{ requestConfig.measureLength }}</span
      >
    </div>
    <Draggable
      v-model="measureList.list"
      item-key="id"
      :class="{
        'measure-drag-view': measureList.list.length === 0,
      }"
      :group="{
        name: 'measure',
        put: measurePutFunc,
      }"
      @add="dragMeasureAdd"
    >
      <template #item="{ element, index }">
        <div class="measure-item">
          <div>
            <img src="@/assets/screen/string.png" class="measure-img" alt="" />
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
