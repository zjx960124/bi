<template>
  <TableCommonSetting
    :option-data="optionData"
    :attr="attr"
    :layout="layout"
    :card="card"
  ></TableCommonSetting>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { GlobalThemeJsonType } from "@/settings/chartThemes/index";
import { TableCommonSetting } from "@/components/Pages/ChartItemSetting";

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true,
  },
  attr: {
    type: Object,
    required: true,
  },
  layout: {
    type: Object,
    required: true,
  },
  card: {
    type: Object,
    required: true,
  },
});
</script>
