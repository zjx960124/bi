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
import { PropType, toRefs, ref, reactive, watch } from 'vue';
import { CreateComponentType } from '@/packages/index.d';

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

// useChartDataFetch(props.chartConfig, useChartEditStore, updateNumber)
</script>

<style lang="scss" scoped>
@include go('decorates-number') {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
