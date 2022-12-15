<template>
  <div>
    <n-progress
      ref="vChartRef"
      :type="type"
      :height="height"
      :processing="animationFlag"
      :percentage="resultData"
      :indicator-placement="indicatorPlacement"
      :color="color"
      :rail-color="railColor"
      :offset-degree="offsetDegree"
      :border-radius="fillBorderRadius + 'px'"
      :fill-border-radius="fillBorderRadius + 'px'"
    >
      <n-text
        :style="{
          color: indicatorTextColor,
          fontSize: `${indicatorTextSize}px`,
          indicatorFontStyle,
          indicatorFontWeight,
        }"
      >
        {{ resultData }} {{ unit }}
      </n-text>
    </n-progress>
    <div>目标值{{ targetData }}</div>
  </div>
</template>

<script setup lang="ts">
import {
  PropType,
  toRefs,
  watch,
  shallowReactive,
  computed,
  nextTick,
  ref,
} from 'vue';
import config, { option as configOption } from './config';
import { toNumber } from '@/utils';
import { fieldItem } from '@/packages/index.d';
import { DSService } from '@/api/DS';
import { useTargetPreviewRequest } from '@/utils/hooks/usePreviewScale';

const props = defineProps({
  chartConfig: {
    type: Object as PropType<config>,
    required: true,
  },
});

const {
  type,
  height,
  unit,
  color,
  animationFlag,
  railColor,
  indicatorTextColor,
  indicatorPlacement,
  indicatorTextSize,
  indicatorFontStyle,
  indicatorFontWeight,
  offsetDegree,
  dataset,
  fillBorderRadius,
} = toRefs(props.chartConfig.option);

const option = shallowReactive({
  dataset: configOption.dataset,
});

const targetData = ref(0);
const resultData = ref(0);

// 手动更新
watch(
  () => props.chartConfig.option.dataset,
  (newData: any) => {
    option.dataset = toNumber(newData, 2);
  },
  {
    deep: false,
  }
);

const requestConfig = computed(() => {
  let requestConfig = props.chartConfig.requestConfig;
  requestConfig.dimension.forEach((element: fieldItem) => {
    element.combinationMode = 1;
    element.dataReturnMethod = 1;
    delete element.columnType;
  });
  requestConfig.measure.forEach((element: fieldItem) => {
    element.combinationMode = 1;
    element.dataReturnMethod = 1;
    delete element.columnType;
  });
  if (requestConfig.dataType === 1) {
    return [...requestConfig.dimension, ...requestConfig.measure];
  }
  if (requestConfig.dataType === 2) {
    return requestConfig.dimension;
  }
});

watch(requestConfig, (newData, oldData) => {
  console.log(newData);
  if (
    requestConfig.value?.length === 2 ||
    (requestConfig.value?.length === 1 &&
      props.chartConfig.requestConfig.dataType === 2)
  ) {
    DSService.getComponentData(newData).then((res: any) => {
      nextTick(() => {
        if (props.chartConfig.requestConfig.dataType === 1) {
          option.dataset = res.data[0]['1'];
          targetData.value = res.data[0]['2'] || 0;
          resultData.value =
            Math.round((option.dataset / targetData.value) * 10000) / 100;
        }
        if (props.chartConfig.requestConfig.dataType === 2) {
          option.dataset = res.data[0]['1'];
          targetData.value = props.chartConfig.requestConfig.data as number;
          resultData.value =
            Math.round((option.dataset / targetData.value) * 10000) / 100;
        }
      });
    });
  }
});

watch(
  () => props.chartConfig.requestConfig.data,
  (newData, oldData) => {
    if (
      props.chartConfig.requestConfig.dimension.length === 1 &&
      props.chartConfig.requestConfig.dataType === 2
    ) {
      targetData.value = props.chartConfig.requestConfig.data as number;
      resultData.value =
        Math.round((option.dataset / targetData.value) * 10000) / 100;
    }
  }
);

const { vChartRef } = useTargetPreviewRequest(
  props.chartConfig,
  resultData,
  targetData
);
</script>
