<template>
  <v-chart
    ref="vChartRef"
    :theme="color"
    :option="option"
    :manual-update="isPreview()"
    :requestConfig="requestConfig"
    :update-options="{
      replaceMerge: replaceMergeArr,
      notMerge: true,
    }"
    autoresize
  ></v-chart>
</template>

<script setup lang="ts">
import { ref, nextTick, computed, watch, PropType } from 'vue';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import config, { includes } from './config';
import { mergeTheme, handlePieSeries } from '@/packages/hook/chart';
import { isPreview } from '@/utils';
import cloneDeep from 'lodash/cloneDeep';
import {
  DatasetComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import { chartColors, ChartColorsNameType } from '@/settings/chartThemes/index';
import { fieldItem } from '@/packages/index.d';
import { DSService } from '@/api/DS';
import { usePreviewRequest } from '@/utils/hooks/usePreviewScale';

const props = defineProps({
  themeSetting: {
    type: Object,
    required: true,
  },
  themeColor: {
    type: Object as PropType<{ color: ChartColorsNameType }>,
    required: true,
  },
  chartConfig: {
    type: Object as PropType<config>,
    required: true,
  },
});

use([
  DatasetComponent,
  CanvasRenderer,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
]);

const replaceMergeArr = ref<string[]>();

const option = computed(() => {
  replaceMergeArr.value = ['series'];
  let resultOption = handlePieSeries(cloneDeep(props.chartConfig.option));
  nextTick(() => {
    replaceMergeArr.value = [];
  });
  return mergeTheme(resultOption, props.themeSetting, includes);
});

const color = computed(() => {
  return chartColors[props.themeColor.color];
});

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
  return [...requestConfig.dimension, ...requestConfig.measure];
});

watch(requestConfig, (newData) => {
  DSService.getComponentData(newData).then((res: any) => {
    nextTick(() => {
      props.chartConfig.option.dataset = {
        source: res.data[0],
      };
    });
  });
});

const { vChartRef } = usePreviewRequest(props.chartConfig);
</script>
