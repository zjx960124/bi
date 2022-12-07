<template>
  <n-statistic tabular-nums class="go-decorates-number">
    <template #prefix>
      <span
        v-show="showSlot"
        :style="`color:${slotColor};font-size:${slotSize}px;margin-right:${prefixMargin}px;font-style:${slotFontStyle};
      font-weight:${slotFontWeight};`"
      >
        {{ prefixText }}
      </span>
    </template>
    <span
      :style="`color:${numberColor};
      font-size:${numberSize}px;
      font-style:${numberFontStyle};
      font-weight:${numberFontWeight};
      letter-spacing:${letterSpacing}px`"
    >
      <n-number-animation
        :from="option.from"
        :to="option.dataset"
        :duration="dur * 1000"
        :show-separator="showSeparator"
        :precision="precision"
      ></n-number-animation>
    </span>
    <template #suffix>
      <span
        v-show="showSlot"
        :style="`color:${slotColor};font-size:${slotSize}px;margin-left:${suffixMargin}px;font-style:${slotFontStyle};
      font-weight:${slotFontWeight};`"
      >
        {{ suffixText }}
      </span>
    </template>
  </n-statistic>
</template>

<script setup lang="ts">
import {
  PropType,
  toRefs,
  ref,
  reactive,
  watch,
  computed,
  nextTick,
} from 'vue';
import { CreateComponentType } from '@/packages/index.d';
import { fieldItem } from '@/packages/index.d';
import { DSService } from '@/api/DS';

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true,
  },
});
const option = reactive({
  from: 0,
  dataset: 0,
});
const { w, h } = toRefs(props.chartConfig.attr);
let {
  dur,
  showSeparator,
  precision,
  numberSize,
  numberColor,
  numberFontStyle,
  numberFontWeight,
  letterSpacing,
  showSlot,
  prefixText,
  suffixText,
  prefixMargin,
  suffixMargin,
  slotSize,
  slotColor,
  slotFontStyle,
  slotFontWeight,
} = toRefs(props.chartConfig.option);

const updateNumber = (newData: number) => {
  // 原来的目标值作为新的数字动画的起始值
  option.from = option.dataset;
  option.dataset = newData;
};

watch(
  () => props.chartConfig.option.from,
  () => {
    option.from = props.chartConfig.option.from;
  },
  { immediate: true }
);

watch(
  () => props.chartConfig.option.dataset,
  () => {
    option.dataset = props.chartConfig.option.dataset;
  },
  {
    immediate: true,
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
  DSService.getComponentData(newData).then((res: any) => {
    nextTick(() => {
      props.chartConfig.option.dataset = {
        source: res.data[0],
      };
    });
  });
});

// useChartDataFetch(props.chartConfig, useChartEditStore, updateNumber)
</script>

<style lang="scss" scoped>
@include go('decorates-number') {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
