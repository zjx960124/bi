<template>
  <v-chart ref="vChartRef" :theme="color" :option="option" :manual-update="isPreview()" :update-options="{
    replaceMerge: replaceMergeArr,
  }" autoresize>
  </v-chart>
</template>

<script setup lang="ts">
import { PropType, computed, watch, ref, nextTick, reactive } from "vue";
import VChart from "vue-echarts";
import { use, LinearGradientObject } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import config, { includes, seriesItem } from "./config";
import { mergeTheme, expendSeries } from "@/packages/hook/chart";
import { isPreview } from "@/utils";
import {
  DatasetComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import cloneDeep from "lodash/cloneDeep";
import { chartColors, ChartColorsNameType } from "@/settings/chartThemes/index";

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
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
]);

const replaceMergeArr = ref<string[]>();

const option = computed(() => {
  let resultOption = expendSeries(cloneDeep(props.chartConfig.option), props.themeColor);
  console.log(resultOption);
  return mergeTheme(resultOption, props.themeSetting, includes);
});

const color = computed(() => {
  return chartColors[props.themeColor.color];
});

// dataset 无法变更条数的补丁
watch(
  () => props.chartConfig.option.dataset,
  (newData, oldData) => {
    if (newData?.dimensions.length !== oldData?.dimensions.length) {
      const seriesArr = [];
      for (let i = 0; i < newData.dimensions.length - 1; i++) {
        seriesArr.push(seriesItem);
      }
      replaceMergeArr.value = ["series"];
      props.chartConfig.option.series = seriesArr;
      nextTick(() => {
        replaceMergeArr.value = [];
      });
    }
  },
  {
    deep: false,
  }
);

// const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore)
const vChartRef = reactive("ddddd");
</script>
