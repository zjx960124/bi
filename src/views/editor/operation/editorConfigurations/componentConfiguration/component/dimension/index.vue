<script setup lang="ts">
import { ref, PropType, onMounted, computed } from 'vue';
import { PublicRequestType, DSResponseType } from '@/packages/index.d';
import { HttpResponse } from '@/types';
import { DSService } from '@/api/DS';

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

console.log(props);

const dimensionList = ref<Array<DSResponseType>>([]);
const measureList = ref<Array<DSResponseType>>([]);

onMounted(() => {
  getDSColumn();
})

const DSID = computed(() => {
  return props.requestConfig.DSID;
})

const getDSColumn = (val?: number) => {
  val && (props.requestConfig.DSID = val);
  DSService.getDSColumn({ dataSetColumnId: val || props.requestConfig.DSID }).then((res: HttpResponse) => {
    dimensionList.value = res.data.filter((item: any) => item.setDataType === 1);
    measureList.value = res.data.filter((item: any) => item.setDataType === 2);
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
    <div class="dimension-content">
      <template v-for="(item, index) in dimensionList" :key="index">
        <div class="item">
          {{ item.columnName }}
        </div>
      </template>
    </div>
  </div>
  <div class="measure">
    <div class="measure-content">
      <template v-for="(item, index) in measureList" :key="index">
        <div class="item">
          {{ item.columnName }}
        </div>
      </template>
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
    }
  }
}
.measure {
  width: 100%;
  height: 0;
  flex: 513;
  background: #ffffff;
  border-radius: 15px;
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
    }
  }
}
</style>
