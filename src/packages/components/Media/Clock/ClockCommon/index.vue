<template>
  <div
    :style="`color:${fontColor};font-size:${fontSize}px;font-style: ${fontStyle};font-weight: ${fontWeight};line-height:${lineHeight};letter-spacing: ${letterSpacing}px; background: ${background}; text-align: ${textAlign}`"
  >
    {{ resultTime }}
  </div>
</template>

<script setup lang="ts">
import { toRefs, computed } from 'vue';
import moment from 'moment';
const props = defineProps({
  chartConfig: {
    type: Object,
    required: true,
  },
});

let {
  main,
  time,
  format,
  fontSize,
  fontColor,
  fontStyle,
  background,
  fontWeight,
  lineHeight,
  letterSpacing,
  textAlign,
} = toRefs(props.chartConfig.option);

const resultTime = computed(() => {
  return moment().format(format.value);
});
</script>

<style lang="scss" scoped></style>
