<template>
  <!-- Echarts 全局设置 -->
  <common-setting :attr="attr" :optionData="optionData" :themeColor="themeColor">
    <template #series>
      <line-common-setting :optionData="optionData"></line-common-setting>
    </template>
  </common-setting>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import { GlobalThemeJsonType } from "@/settings/chartThemes/index";
import {
  CommonSetting,
  LineCommonSetting,
} from "@/components/Pages/ChartItemSetting";

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true,
  },
  attr: {
    type: Object,
    required: true,
  },
  themeColor: {
    type: Object,
    required: true,
  },
});

const seriesList = computed(() => {
  return props.optionData.series;
});
</script>
