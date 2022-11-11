<template>
  <common-setting :optionData="optionData"></common-setting>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import {
  GlobalSetting,
  CommonSetting,
  CollapseItem,
  SettingItemBox,
  SettingItem,
} from "@/components/Pages/ChartItemSetting";
import { GlobalThemeJsonType } from "@/settings/chartThemes/index";

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
