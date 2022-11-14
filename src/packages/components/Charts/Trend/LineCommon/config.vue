<template>
  <!-- Echarts 全局设置 -->
  <common-setting :optionData="optionData"></common-setting>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import { GlobalThemeJsonType } from "@/settings/chartThemes/index";
import { CommonSetting } from "@/components/Pages/ChartItemSetting";

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true,
  },
});

const seriesList = computed(() => {
  return props.optionData.series;
});
</script>
