<script setup lang="ts">
import { ref, PropType, onMounted, computed } from 'vue';
import { PublicRequestType, DSResponseType } from '@/packages/index.d';
import { HttpResponse } from '@/types';
import { DSService } from '@/api/DS';
import Draggable from 'vuedraggable';

const props = defineProps({
  DSList: {
    type: Array<Object>,
    required: true
  },
  requestConfig: {
    type: Object as PropType<PublicRequestType>,
    required: true
  }
})


const dimensionList = ref<Array<DSResponseType>>([]);
const measureList = ref<Array<DSResponseType>>([]);

onMounted(() => {
  props.requestConfig.DSID && getDSColumn();
})

const onMove = (e: DragEvent, to: DragEvent) => {
  console.log(e, to);
}

const DSID = computed(() => {
  return props.requestConfig.DSID || '';
})

const getDSColumn = (val?: number) => {
  val && (props.requestConfig.DSID = val);
  DSService.getDSColumn({ dataSetColumnId: val || props.requestConfig.DSID }).then((res: HttpResponse) => {
    dimensionList.value = res.data.filter((item: any) => item.setDataType === 1);
    measureList.value = res.data.filter((item: any) => item.setDataType === 0);
  });
}
</script>
<template>
  <div class="dimension">
    <n-select
      v-model:value="DSID"
      value-field="id"
      label-field="name"
      class="ds-select"
      :options="DSList"
      :on-update:value="getDSColumn"
    ></n-select>
    <div class="content-title">维度</div>
    <div class="dimension-content">
      <Draggable
        item-key="id"
        :sort="false"
        v-model="dimensionList"
        :group="{ name: 'dimension', pull: 'clone' }"
        :move="onMove"
        class="draggable-view"
      >
        <template #item="{ element }">
          <div class="item">
            {{ element.columnName }}
          </div>
        </template>
      </Draggable>
    </div>
  </div>
  <div class="measure">
    <div class="content-title">度量</div>
    <div class="measure-content">
      <Draggable
        item-key="id"
        :sort="false"
        v-model="measureList"
        :group="{ name: 'measure', pull: 'clone' }"
        :move="onMove"
        class="draggable-view"
      >
        <template #item="{ element }">
          <div class="item">
            {{ element.columnName }}
          </div>
        </template>
      </Draggable>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.dimension {
  width: 100%;
  height: 0;
  flex: 403;
  margin: 17px 0;
  background: #ffffff;
  border-radius: 15px;
  box-sizing: border-box;
  padding: 16px 7px 16px 10px;
  display: flex;
  flex-direction: column;
  .dimension-content {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding-left: 6px;
    .item {
      text-align: left;
      width: 100%;
      margin-top: 18px;
      font-size: 12px;
      color: #6b797f;
      cursor: pointer;
    }
  }
}
.measure {
  width: 100%;
  height: 0;
  flex: 513;
  background: #ffffff;
  border-radius: 15px;
  padding: 0 7px 16px 10px;
  display: flex;
  flex-direction: column;
  .measure-content {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding-left: 6px;
    .item {
      text-align: left;
      width: 100%;
      margin-top: 18px;
      color: #6b797f;
      font-size: 12px;
      cursor: pointer;
    }
  }
}
.content-title {
  color: #293270;
  font-family: 'PingFang-SC-Bold';
  font-size: 14px;
  margin-top: 18px;
  text-align: left;
  padding-left: 6px;
}
.draggable-view {
  width: 100%;
}
</style>
