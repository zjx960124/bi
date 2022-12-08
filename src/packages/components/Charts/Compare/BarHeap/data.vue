<script setup lang="ts">
import {
  PropType,
  ref,
  shallowRef,
  watch,
  toRaw,
  triggerRef,
  reactive,
  effectScope,
} from 'vue';
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

const dimensionList = shallowRef(props.requestConfig.dimension);
// tool 这里没有响应式无法自动更改数据到视图
const measureList = shallowRef(props.requestConfig.measure);

const updateShallow = () => {
  props.requestConfig.dimension = dimensionList.value;
  props.requestConfig.measure = measureList.value;
};

const deleteDimension = (element: fieldItem, index: number) => {
  if (element.columnName === '中国地图') return false;
  dimensionList.value = dimensionList.value.filter(
    (item, indexs) => indexs !== index
  );
  triggerRef(dimensionList);
};
const deleteMeasure = (index: number) => {
  measureList.value = measureList.value.filter(
    (item, indexs) => indexs !== index
  );
  triggerRef(measureList);
};
</script>
<template>
  <div class="layout-data-view">
    <div class="layout-data-title">
      <span>维度</span>
      <span
        >{{ dimensionList.length }}/{{ requestConfig.dimensionLength }}</span
      >
    </div>
    <Draggable
      v-model="dimensionList"
      item-key="id"
      :class="{
        'dimension-drag-view': dimensionList.length === 0,
      }"
      :group="{
        name: 'dimension',
        put: () => {
          return dimensionList.length < requestConfig.dimensionLength;
        },
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
      <span>度量</span>
      <span>{{ measureList.length }}/{{ requestConfig.measureLength }}</span>
    </div>
    <Draggable
      v-model="measureList"
      :class="{ 'measure-drag-view': measureList.length === 0 }"
      item-key="id"
      :group="{
        name: 'measure',
        put: () => {
          return measureList.length < requestConfig.measureLength;
        },
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
.layout-data-view {
  height: 100%;
  box-sizing: border-box;
  padding: 0 23px;
  font-family: 'PingFang-SC-Regular';
  .layout-data-title {
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    text-align: left;
    color: #293270;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .dimension-item {
    width: 100%;
    height: 21px;
    background: #f3f5ff;
    border: 1px dashed #7c87ff;
    border-radius: 11px;
    font-family: 'PingFang-SC-Regular';
    color: #293270;
    font-size: 12px;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-items: center;

    .dimension-img {
      width: 22px;
      height: 11px;
      margin: 0 6px 0 13px;
    }
    .dimension-icon {
      margin-right: 10px;
      cursor: pointer;
    }
  }

  .dimension-item + .dimension-item {
    margin-top: 8px;
  }
  .dimension-drag-view {
    width: 100%;
    min-height: 21px;
    background: #f3f5ff;
    border: 1px dashed #7c87ff;
    border-radius: 11px;
  }

  .measure-item {
    width: 100%;
    height: 21px;
    background: #e7faf8;
    border: 1px dashed #23d8c2;
    border-radius: 11px;
    font-family: 'PingFang-SC-Regular';
    color: #293270;
    font-size: 12px;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .measure-img {
      width: 17px;
      height: 11px;
      margin: 0 6px 0 13px;
    }
    .measure-icon {
      margin-right: 10px;
      cursor: pointer;
    }
  }

  .measure-item + .measure-item {
    margin-top: 8px;
  }
  .measure-drag-view {
    width: 100%;
    min-height: 21px;
    background: #e7faf8;
    border: 1px dashed #23d8c2;
    border-radius: 11px;
  }
  .update-btn {
    width: 100%;
    height: 43px;
    background: #7c87ff;
    border-radius: 15px;
    margin-top: 30px;
    color: #ffffff;
    font-size: 14px;
    font-family: 'PingFang-SC-Medium';
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
</style>
