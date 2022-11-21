<script setup lang="ts">
import { ref, computed, PropType, watch } from "vue";
import { GlobalThemeJsonType } from "@/settings/chartThemes";
import { GraphicClass } from "@/packages/hook/chart";
import { chartColors, ChartColorsNameType } from "@/settings/chartThemes/index";

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true,
  },
  themeColor: {
    type: Object as PropType<{ color: ChartColorsNameType }>,
    require: true
  }
});
const series = computed(() => {
  return props.optionData.series;
});

const switchGradient = (val: boolean) => {
  series.value.areaStyle.openOpacity = val;
  if (val) {
    series.value.areaStyle.opacity = 1;
  } else {
    series.value.areaStyle.opacity = 0;
  }
}
</script>
<template>
  <div class="common-item">
    <div class="common-sub-title">面积样式</div>
  </div>
  <div class="common-item">
    <n-checkbox v-model:checked="series.areaStyle.openOpacity" :on-update:checked="switchGradient">开启渐变效果</n-checkbox>
  </div>
  <div class="common-item">
    <div class="common-sub-title">透明度</div>
    <n-slider class="common-slider" v-model:value="series.areaStyle.opacity" :step="0.1" :max="1" :min="0" />
    {{ series.areaStyle.opacity }}
  </div>
</template>
<style lang='scss' scoped>

</style>
