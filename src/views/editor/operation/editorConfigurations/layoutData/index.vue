<script setup lang="ts">
import { ref, PropType, computed, toRefs } from 'vue';
import Draggable from 'vuedraggable';
import { PublicRequestType } from '@/packages/index.d';

const props = defineProps({
  requestConfig: {
    type: Object as PropType<PublicRequestType>,
    required: true,
  },
});

const dragEnd = (e: DragEvent) => {
  console.log(props.requestConfig);
  e.preventDefault();
};
</script>
<template>
  <div class="layout-data-view">
    <div class="layout-data-title">维度</div>
    <Draggable
      v-model="props.requestConfig.dimension"
      item-key="id"
      :class="{
        'dimension-drag-view': props.requestConfig.dimension.length === 0,
      }"
      group="dimension"
      @end="dragEnd"
      @clone="dragEnd"
      @drop="dragEnd"
      @dragover="dragEnd"
      @dragenter="dragEnd"
    >
      <template #item="{ element }">
        <div class="dimension-item">
          <img src="@/assets/screen/string.png" class="dimension-img" alt="" />
          {{ element.columnName }}
        </div>
      </template>
    </Draggable>
    <div class="layout-data-title">度量</div>
    <Draggable
      v-model="props.requestConfig.measure"
      :class="{ 'measure-drag-view': props.requestConfig.measure.length === 0 }"
      item-key="id"
      group="measure"
      @end="dragEnd"
      @clone="dragEnd"
    >
      <template #item="{ element }">
        <div class="measure-item">
          <img src="@/assets/screen/num.png" class="measure-img" alt="" />
          {{ element.columnName }}
        </div>
      </template>
    </Draggable>
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
    .dimension-img {
      width: 22px;
      height: 11px;
      margin: 0 6px 0 13px;
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
    align-items: center;
    .measure-img {
      width: 17px;
      height: 11px;
      margin: 0 6px 0 13px;
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
}
</style>
