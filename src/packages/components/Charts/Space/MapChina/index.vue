<template>
  <v-chart
    ref="vChartRef"
    :theme="themeColor"
    :option="option"
    :requestConfig="requestConfig"
    :manual-update="isPreview()"
    autoresize
  >
  </v-chart>
</template>

<script setup lang="ts">
import { PropType, nextTick, watch, computed } from 'vue';
import config, { includes } from './config';
import VChart from 'vue-echarts';
import { use, registerMap } from 'echarts/core';
import { EffectScatterChart, MapChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
// import { useChartDataFetch } from '@/hooks';
import { mergeTheme, handleMapSeries } from '@/packages/hook/chart';
// import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore';
import { isPreview } from '@/utils';
import mapJson from './map.json';
import mapJsonWithoutHainanIsLands from './mapWithoutHainanIsLands.json';
import {
  DatasetComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  GeoComponent,
  TitleComponent,
  VisualMapComponent,
} from 'echarts/components';
import { fieldItem } from '@/packages/index.d';
import { DSService } from '@/api/DS';

const props = defineProps({
  themeSetting: {
    type: Object,
    required: true,
  },
  themeColor: {
    type: Object,
    required: true,
  },
  chartConfig: {
    type: Object as PropType<config>,
    required: true,
  },
});

use([
  MapChart,
  DatasetComponent,
  CanvasRenderer,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  GeoComponent,
  EffectScatterChart,
  TitleComponent,
  VisualMapComponent,
]);

registerMap('china', {
  geoJSON: mapJson as any,
  specialAreas: {},
});

// const option = reactive({
//   value: mergeTheme(
//     handleMapSeries(props.chartConfig.option),
//     props.themeSetting,
//     includes
//   ),
// });

const option = computed(() => {
  let resultOption = handleMapSeries(props.chartConfig.option);
  return mergeTheme(resultOption, props.themeSetting, includes);
});

// const dataSetHandle = (dataset: any) => {
//   props.chartConfig.option.series.forEach((item: any) => {
//     if (item.type === 'effectScatter' && dataset.point)
//       item.data = dataset.point;
//     else if (item.type === 'map' && dataset.point) item.data = dataset.map;
//     option.value = props.chartConfig.option;
//   });
// };

const mapTypeHandle = (show: boolean) => {
  show
    ? registerMap('china', { geoJSON: mapJson as any, specialAreas: {} })
    : registerMap('china', {
        geoJSON: mapJsonWithoutHainanIsLands as any,
        specialAreas: {},
      });
};

watch(
  () => props.chartConfig.option.series[0].itemStyle.showHainanIsLands,
  (newData) => {
    mapTypeHandle(newData);
  },
  {
    deep: true,
    immediate: true,
  }
);

const requestConfig = computed(() => {
  let requestConfig = props.chartConfig.requestConfig;
  requestConfig.measure.forEach((element: fieldItem) => {
    element.combinationMode = 1;
    element.dataReturnMethod = 3;
    requestConfig.dimension[0]['dataSetId'] = element.dataSetId;
    delete element.columnType;
  });
  return [...requestConfig.dimension, ...requestConfig.measure];
});

watch(requestConfig, (newData, oldData) => {
  DSService.getComponentData(newData).then((res: any) => {
    nextTick(() => {
      props.chartConfig.option.series[0].name = res.data.product[0];
      props.chartConfig.option.series[0].data = res.data.data;
    });
  });
});

// watch(
//   () => props.chartConfig.option.dataset,
//   (newData) => {
//     dataSetHandle(newData);
//   },
//   {
//     immediate: true,
//     deep: false,
//   }
// );

// 预览
// useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
//   dataSetHandle(newData);
// });
</script>
