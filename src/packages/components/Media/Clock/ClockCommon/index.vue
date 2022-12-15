<template>
  <div
    :style="`color:${fontColor};font-size:${fontSize}px;font-style: ${fontStyle};font-weight: ${fontWeight};line-height:${lineHeight};letter-spacing: ${letterSpacing}px; background: ${background}; text-align: ${textAlign}`"
  >
    {{ resultTime }}
  </div>
</template>

<script setup lang="ts">
import { toRefs, computed, ref, watch } from 'vue';
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

const resultTime = ref<String>('');

watch(
  () => format,
  () => {
    resultTime.value = moment().format(format.value);
  }
);
const clock = ref<NodeJS.Timer | null>(null);

(() => {
  clock.value = setInterval(() => {
    resultTime.value = moment().format(format.value);
  }, 1000);
})();
</script>

<style lang="scss" scoped></style>
