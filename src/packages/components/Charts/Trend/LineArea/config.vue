<template>
  <!-- Echarts 全局设置 -->
  <common-setting :attr="attr" :optionData="optionData" :themeColor="themeColor">
    <template #series>
      <line-common-setting :optionData="optionData"></line-common-setting>
      <line-area-setting :optionData="optionData" :themeColor="props.themeColor"></line-area-setting>
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
import {
  LineAreaSetting
} from "@/components/Pages/components";
import { ChartColorsNameType } from "@/settings/chartThemes/index";

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
    type: Object as PropType<{ color: ChartColorsNameType }>,
    required: true,
  },
});

</script>
