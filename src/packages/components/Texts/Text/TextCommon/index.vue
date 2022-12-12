<template>
  <div
    :style="`color:${fontColor};font-size:${fontSize}px;font-style: ${fontStyle};font-weight: ${fontWeight};line-height:${lineHeight};letter-spacing: ${letterSpacing}px; background: ${background}; text-align: ${textAlign}`"
  >
    {{ main }}
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
const props = defineProps({
  chartConfig: {
    type: Object,
    required: true,
  },
});

let {
  main,
  fontSize,
  fontColor,
  fontStyle,
  background,
  fontWeight,
  lineHeight,
  letterSpacing,
  textAlign,
} = toRefs(props.chartConfig.option);
</script>

<style lang="scss" scoped></style>
